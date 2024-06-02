<script setup lang="ts">
defineEmits(['refresh','on-delete']);
const props = withDefaults(defineProps<{model: object[], group:string, short:string, parent?:object, useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showAdvices?:boolean, origin?:string}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showAdvices: false
});
const { loader } = await import("../../libs/core/importer")
const { colorItem, iconItem, elude, defineAsyncComponent, ref, useItem, itemColumns, itemAllColumns } = await loader(props.group,props.short)
const { isNamespaced } = await import('../../libs/core/navigation.js')
const { useRouter } = await import('vue-router')
const router = useRouter();
const { $q, can, actionNew, toEdit, toParentView, navigation, namespaced } = useItem(router);
const pagination = ref({rowsPerPage: 0});
const filter = ref('');
const TableHeader = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <TableHeader v-if="namespaced" :title="props.short" :icon="iconItem" :class="`bg-${ colorItem }`" :usecreate="useAction&&can('create',navigation.currentNamespace.value)" :userefresh="useRefresh" :itemtype="`${props.group} ${props.short}`" v-model:model-filter="filter" @refresh="$emit('refresh')" @create="actionNew(navigation.currentNamespace.value)" />
    <TableHeader v-else :title="props.short" :icon="iconItem" :class="`bg-${ colorItem }`" :usecreate="useAction&&can('create')" :userefresh="useRefresh" :itemtype="`${props.group} ${props.short}`" v-model:model-filter="filter" @refresh="$emit('refresh')" @create="actionNew()" />
    <q-card-section class="q-pa-none">
    <q-table :rows="model" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`" :columns="(namespaced&&(showNamespace||!isNamespaced())?itemAllColumns:itemColumns).filter(c=>c.name!='Action'||useAction)" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom>
        <template v-slot:body-cell-Namespace="props" v-if="namespaced && (showNamespace||!isNamespaced())">
          <q-td :props="props">
            <router-link :to="{ name: `${group}${short}Table`, params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Problems="props">
          <q-td :props="props">
            <div v-if="props.row.getcoreProblem!=null" class="column">
              <div class="col" v-for="problem in props.row.getcoreProblem" :key="problem.description">
                <q-chip v-bind:key="problem" class="glossy" color="negative" text-color="white" icon="error">{{ elude(problem.description, 40) }}<q-tooltip>{{ problem.description }}</q-tooltip></q-chip>
              </div>
            </div>
            <div v-else-if="showAdvices && props.row.getcoreAdvice!=null" class="column">
              <div class="col" v-for="advice in props.row.getcoreAdvice" :key="advice.description">
                <q-chip v-bind:key="advice" color="warning" text-color="white" icon="error">{{ elude(advice.description, 40) }}<q-tooltip>{{ advice.description }}</q-tooltip></q-chip>
              </div>
            </div>
            <q-chip v-else class="glossy" color="positive" text-color="white" icon="done" />
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: origin?`${group}${short}ViewFrom${origin}`:`${group}${short}View`, params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}" v-if="namespaced">{{ props.row.metadata.name }}</router-link>
            <router-link :to="{ name: origin?`${group}${short}ViewFrom${origin}`:`${group}${short}View`,  params: { name: props.row.metadata.name }}" v-else>{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props" v-if="useAction">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense
              @click="toEdit(props.row.metadata.namespace, props.row.metadata.name)"
              v-if="namespaced && (props.row.parentReference==null  || (props.row['metadata']['annotations'] != undefined && props.row['metadata']['annotations']['gramo.solidite.fr/no-parent'] == 'true' )) && can('patch',props.row.metadata.namespace)">
              <q-tooltip>{{ $t('core.editTooltip', {short: short, name: props.row.metadata.name}) }}</q-tooltip>
            </q-btn>
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense
              @click="toEdit(props.row.metadata.namespace)"
              v-if="!namespaced && (props.row.parentReference==null  || (props.row['metadata']['annotations'] != undefined && props.row['metadata']['annotations']['gramo.solidite.fr/no-parent'] == 'true' )) && can('patch')">
              <q-tooltip>{{ $t('core.editTooltip', {short: short, name: props.row.metadata.name}) }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense
              @click="$emit('on-delete', props.row.metadata)"
              v-if="props.row.parentReference==null && ((namespaced&&can('delete',props.row.metadata.namespace))||(!namespaced&&can('delete')))">
              <q-tooltip>{{ $t('core.deleteTooltip', {short: short, name: props.row.metadata.name}) }}</q-tooltip>
            </q-btn>
            <q-btn icon="arrow_upward" size="sm" class="q-ml-sm" flat dense
              @click="toParentView(props.row.parentReference.group, props.row.parentReference.short, props.row.parentReference.name, props.row.parentReference.namespace)"
              v-if="props.row.parentReference!=null">
              <q-tooltip>{{ $t('core.viewParentTooltip', {short: props.row.parentReference.short, name: props.row.parentReference.name}) }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
