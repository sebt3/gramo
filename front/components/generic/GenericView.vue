<script setup lang="ts">
defineEmits(['on-delete']);
const props = withDefaults(defineProps<{model: object, group:string, short:string, useActions?:boolean, showLink?:boolean, showLabels?:boolean, origin?:string}>(), {
  useActions: false,
  showLink: false,
  showLabels: true,
});
const { loader } = await import("../../libs/core/importer")
const { defineAsyncComponent, onMounted, elude, getColor, timeAgo, useItem, getProperties, colorItem, itemDefinition, iconItem, extraColumns } = await loader(props.group,props.short)
const { useRouter } = await import('vue-router')
const router = useRouter();
const { setNamespacedItemFromRoute, setItemFromRoute } = await import('../../libs/core/navigation.js')
const { $q, can, onlyReadProperties, toParentView, viewer, viewerUpdate, toEdit, writeProperties, namespaced } = useItem(router);
if (namespaced) setNamespacedItemFromRoute();
else setItemFromRoute();
onMounted(() => { viewerUpdate(onlyReadProperties(props.model)) })
const OpenApiEdit      = defineAsyncComponent(() => import( '@/components/openapi/OpenApiEdit.vue'));
const EventList        = defineAsyncComponent(() => import( '@/components/core/EventList.vue'));
const MonacoViewer     = defineAsyncComponent(() => import( '@/components/core/MonacoViewer.vue'));
const OpenApiNamedIcon = defineAsyncComponent(() => import( '@/components/openapi/OpenApiNamedIcon.vue'));
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" :class="`bg-${ colorItem } text-grey-2`" active-color="white" align="justify">
      <q-avatar :icon="iconItem" />
      <q-tab :label="props.short" name="meta" />
      <q-tab :label="$t('core.events')" name="events" v-if="Array.isArray(model['getcoreEvent'])" />
      <q-tab :label="$t('view.tabs.simple')" name="simple" />
      <q-tab v-for="prop in writeProperties.filter(prop=>model[prop]!=null && itemDefinition.properties != undefined && itemDefinition.properties[prop] != undefined && (itemDefinition.properties[prop]['type']==undefined || itemDefinition.properties[prop]['type']=='object'))" v-bind:key="prop" :name="prop" :label="prop" />
      <q-tab :label="$t('view.tabs.yaml')" name="yaml" />
      <q-btn-group push class="float-right text-capitalize shadow-3 q-mr-sm" v-if="useActions">
        <q-btn icon="edit"
          @click="toEdit(model.metadata.namespace, model.metadata.name)"
          v-if="namespaced && (model.parentReference==null || (model['metadata']['annotations'] != undefined && model['metadata']['annotations']['gramo.solidite.fr/no-parent'] == 'true' )) && can('patch',model.metadata.namespace)">
          <q-tooltip>{{ $t('core.editTooltip', {short: props.short, name: model.metadata.name}) }}</q-tooltip>
        </q-btn>
        <q-btn icon="edit"
          @click="toEdit(model.metadata.name)"
          v-if="!namespaced && (model.parentReference==null || (model['metadata']['annotations'] != undefined && model['metadata']['annotations']['gramo.solidite.fr/no-parent'] == 'true' )) && can('patch')">
          <q-tooltip>{{ $t('core.editTooltip', {short: props.short, name: model.metadata.name}) }}</q-tooltip>
        </q-btn>
        <q-btn icon="delete"
          @click="$emit('on-delete', model.metadata)"
          v-if="model.parentReference==null && ((namespaced&&can('delete',model.metadata.namespace))||(!namespaced&&can('delete')))">
          <q-tooltip>{{ $t('core.deleteTooltip', {short: props.short, name: model.metadata.name}) }}</q-tooltip>
        </q-btn>
        <q-btn icon="arrow_upward"
          @click="toParentView(model.parentReference.group, model.parentReference.short, model.parentReference.name, model.parentReference.namespace)"
          v-if="model.parentReference!=null">
          <q-tooltip>{{ $t('core.viewParentTooltip', {short: model.parentReference.short, name: model.parentReference.name}) }}</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="meta" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`">
      <div class="q-gutter-md">
      <div class="row">
        <div class="col-md-4" v-if="model.metadata.namespace != undefined && model.metadata.namespace!=''">
          <q-field :label="$t('meta.namespace')" stack-label borderless>
            <template v-slot:prepend><q-icon name="dashboard" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline"><router-link :to="{ name: `${props.group}${props.short}Table`, params: { namespace: model.metadata.namespace } }">{{ model.metadata.namespace }}</router-link></div>
            </template>
          </q-field>
        </div>
        <div class="col-md-4">
          <q-field :label="$t('meta.name')" stack-label borderless>
            <template v-slot:prepend><q-icon name="smart_button" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" v-if="showLink">
                <router-link :to="{ name: origin?`${props.group}${props.short}ViewFrom${origin}`:`${props.group}${props.short}View`, params: { namespace: model.metadata.namespace, name: model.metadata.name } }">{{ model.metadata.name }}</router-link>
              </div>
              <div class="self-center full-width no-outline" v-if="!showLink">{{ model.metadata.name }}</div>
            </template>
          </q-field>
        </div>
        <div class="col-md-4" v-if="model.metadata.creationTimestamp">
          <q-field :label="$t('meta.age')" stack-label borderless>
            <template v-slot:prepend><q-icon name="smart_button" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline">{{ timeAgo(model.metadata.creationTimestamp) }}</div>
            </template>
          </q-field>
        </div>
      </div>
      <q-field label="Problems" stack-label borderless v-if="Array.isArray(model.getcoreProblem) && model.getcoreProblem.length>0">
        <template v-slot:prepend><q-icon name="error" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <q-chip v-for="problem in model.getcoreProblem" v-bind:key="problem" class="glossy" color="negative" text-color="white" icon="error">{{ elude(problem.description, 100) }}<q-tooltip>{{ problem.description }}</q-tooltip></q-chip>
        </div></template>
      </q-field>
      <div class="row" v-if="extraColumns.filter(c=>![null,undefined,''].includes(c.field(model))).length>0">
        <div :class="`col-md-${extraColumns.filter(c=>![null,undefined,''].includes(c.field(model))).length<4?12/extraColumns.filter(c=>![null,undefined,''].includes(c.field(model))).length:3}`" v-for="extra in extraColumns.filter(c=>![null,undefined,''].includes(c.field(model)))" :key="extra.label">
          <q-field stack-label borderless :label="extra.label">
            <template v-slot:prepend><OpenApiNamedIcon :name="extra.name" /></template>
            <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
              <div class="self-center full-width no-outline">{{ extra.field(model) }}</div>
            </div></template>
          </q-field>
        </div>
      </div>
      <div class="row" v-if="showLabels && (model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0) || (model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0)">
        <div :class="`col-md-${model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0?6:12}`" v-if="showLabels && model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0">
          <q-field label="Annotations" stack-label borderless>
            <template v-slot:prepend><q-icon name="short_text" /></template>
            <template v-slot:control><div class="self-center full-width no-outline">
              <span v-for="note in Object.entries(model.metadata.annotations).map(([name,value])=>{return {name,value}})" v-bind:key="note.name">
                <q-badge align="middle" :label="note.name"  :color="getColor(note.name)" class="q-mb-sm q-mr-sm">
                  <q-badge align="middle" :label="elude(note.value as unknown as string)" :color="getColor(note.name)" class="bg-grey-1" outline />
                </q-badge>
              </span>
            </div></template>
          </q-field>
        </div><div :class="`col-md-${model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0?6:12}`" v-if="showLabels && model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0">
          <q-field label="Labels" stack-label borderless>
            <template v-slot:prepend><q-icon name="label" /></template>
            <template v-slot:control><div class="self-center full-width no-outline">
              <span v-for="label in Object.entries(model.metadata.labels).map(([name,value])=>{return {name,value}})" v-bind:key="label.name">
                <q-badge align="middle" :label="label.name"  :color="getColor(label.name)" class="q-mb-sm q-mr-sm">
                  <q-badge align="middle" :label="label.value" :color="getColor(label.name)" class="bg-grey-1" outline />
                </q-badge>
              </span>
            </div></template>
          </q-field>
        </div>
      </div>      </div>
      </q-tab-panel>
      <q-tab-panel name="simple" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`">
        <OpenApiEdit v-for="prop in writeProperties.filter(p => writeProperties.length==1 && model[p]!=null && (props.group!='vynil' || props.short!='Install'))" v-bind:key="prop"
          :in="model[prop]"
          :properties="getProperties(itemDefinition.properties[prop])"
          :read-only="true"
          :showdefault="false"
        />
        <OpenApiEdit v-if="writeProperties.length>1"
          :in="model"
          :properties="getProperties(itemDefinition,([k])=>writeProperties.includes(k))"
          :read-only="true"
          :showdefault="false"
        />
        <OpenApiEdit v-if="props.group=='vynil' && props.short=='Install'"
          :in="model['spec']['options']"
          :properties="getProperties({properties: model.consumevynilPackage.options})"
          :read-only="true"
          :showdefault="false"
        />
      </q-tab-panel>
      <q-tab-panel name="events" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`" v-if="Array.isArray(model['getcoreEvent'])">
        <EventList :model="model['getcoreEvent']"
         />
      </q-tab-panel>
      <q-tab-panel v-for="prop in writeProperties.filter(prop=>model[prop]!=null && itemDefinition.properties != undefined && itemDefinition.properties[prop] != undefined && (itemDefinition.properties[prop]['type']==undefined || itemDefinition.properties[prop]['type']=='object'))" v-bind:key="prop" :name="prop" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`">
        <MonacoViewer :text="viewer.props[prop]" :key="viewer.props[prop]" />
      </q-tab-panel>
      <q-tab-panel name="yaml" :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'1'}`">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
