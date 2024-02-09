<script setup lang="ts">
import { onMounted } from "vue";
import MetadataView from '@/components/core/MetadataView.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import { elude, getColor, getConditionColor} from "../../libs/core/"
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoViewer from '@/components/core/MonacoViewer.vue';
import { useInstall, getProperties, InstallDefinition } from '../../libs/vynil/Install.js'
import { colorInstall, iconInstall } from '../../libs/vynil/custom.js'
const { onlyReadProperties, viewer, viewerUpdate, toEdit, actionDelete, setNamespacedItemFromRoute } = useInstall();setNamespacedItemFromRoute();
const props = withDefaults(defineProps<{model: object, deletor?:any, useActions?:boolean}>(), {
  deletor: ()=>null,
  useActions: false
});
onMounted(() => {
  viewerUpdate(onlyReadProperties(props.model));
})
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" :class="`bg-${ colorInstall } text-grey-2`" active-color="white" align="justify">
      <q-avatar :icon="iconInstall" />
      <q-tab label="Install" name="meta" />
      <q-tab label="Configuration" name="simple" />
      <q-tab label="spec" name="spec" v-if="model['spec']!=null" />
      <q-tab label="full Yaml" name="yaml" />
      <q-btn-group push class="float-right text-capitalize shadow-3 q-mr-sm" v-if="useActions">
        <q-btn icon="edit" @click="toEdit(model.metadata.namespace, model.metadata.name)">
          <q-tooltip>Edit</q-tooltip>
        </q-btn>
        <q-btn icon="delete" @click="actionDelete(deletor, model)">
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="meta" :class="`bg-${ colorInstall }-1`">
      <div class="q-gutter-md">
        <div v-if="model.metadata.namespace != undefined && model.metadata.namespace!=''">
          <q-field label="Namespace" stack-label borderless>
            <template v-slot:prepend><q-icon name="dashboard" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline"><router-link :to="{ name: 'vynilInstallTable', params: { namespace: model.metadata.namespace } }">{{ model.metadata.namespace }}</router-link></div>
            </template>
          </q-field>
        </div>
        <q-field label="Name" stack-label borderless>
          <template v-slot:prepend><q-icon name="smart_button" /></template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" v-if="showLink">
              <router-link :to="{ name: 'vynilInstallView', params: { namespace: model.metadata.namespace, name: model.metadata.name } }">{{ model.metadata.name }}</router-link>
            </div>
            <div class="self-center full-width no-outline" v-if="!showLink">{{ model.metadata.name }}</div>
          </template>
        </q-field>      <q-field label="Status" stack-label borderless>
        <template v-slot:prepend><q-icon name="done" /></template>
        <template v-slot:control>
          <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="warning" v-if="['planning','installing'].includes(model.status.status)"></q-chip>
          <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="positive" v-if="model.status.status=='installed'"></q-chip>
          <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="negative" v-if="model.status.status=='errors'"></q-chip>
          <q-chip class="float-right text-white text-capitalize" :label="model.status.status" color="info" v-if="!['installed','planning','installing','errors'].includes(model.status.status)"></q-chip>
        </template>
      </q-field>
      <q-field label="Errors" stack-label borderless v-if="model.status.errors.length>0">
        <template v-slot:prepend><q-icon name="error" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <div v-for="err in model.status.errors" v-bind:key="err"></div>
        </div></template>
      </q-field>
        <div v-if="model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0">
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
        </div><div v-if="model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0">
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
        </div>      </div>
      </q-tab-panel>
      <q-tab-panel name="simple" :class="`bg-${ colorInstall }-1`">
        <OpenApiEdit
        :in="model['spec']['options']"
          :properties="new Map(Object.entries(model.consumePackage.options))"
          :read-only="true"
          :show-default="false"
        />
      </q-tab-panel>
      <q-tab-panel name="spec" v-if="model['spec']!=null">
        <MonacoViewer :text="viewer.props.spec" :key="viewer.props.spec" />
      </q-tab-panel>
      <q-tab-panel name="yaml" :class="`bg-${ colorInstall }-1`">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
