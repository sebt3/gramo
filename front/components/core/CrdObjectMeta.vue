<script setup lang="ts">
defineEmits(['on-delete']);
withDefaults(defineProps<{model: object, parent: object, useActions?:boolean, showLink?:boolean, showLabels?:boolean, showStatus?: boolean, origin?:string}>(), {
  useActions: false,
  showLabels: false,
  showStatus: true,
  showLink: true,
});
const { elude, getColor, timeAgo, usecrdObject } = await import('../../libs/core/crdObject.js')
const { colorCustomResourceDefinition } = await import('../../libs/k8s/custom.js')
const { $q } = usecrdObject();
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section :class="`bg-${ colorCustomResourceDefinition } text-white`">
      <div class="text-subtitle1 q-mt-none q-mb-none q-pt-none q-pb-none">
        {{$t('k8s.Object')}}
        <q-btn-group push class="float-right text-capitalize shadow-3" v-if="useActions">
          <q-btn icon="edit"
          @click="toEdit(model.metadata.namespace, model.metadata.name)">
            <q-tooltip>{{ $t('core.editTooltip', {short: 'CrdObject', name: model.metadata.name}) }}</q-tooltip>
          </q-btn>
          <q-btn icon="delete" @click="$emit('on-delete', model.metadata)">
            <q-tooltip>{{ $t('core.deleteTooltip', {short: 'CrdObject', name: model.metadata.name}) }}</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-card-section :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'2'}`">
      <div class="q-gutter-md">
      <div class="row">
        <div class="col-md-4" v-if="model.metadata.namespace != undefined && model.metadata.namespace!=''">
          <q-field :label="$t('meta.namespace')" stack-label borderless>
            <template v-slot:prepend><q-icon name="dashboard" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline">{{ model.metadata.namespace }}</div>
            </template>
          </q-field>
        </div>
        <div class="col-md-4">
          <q-field :label="$t('meta.name')" stack-label borderless>
            <template v-slot:prepend><q-icon name="smart_button" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" v-if="showLink">
                <router-link :to="{ name: parent.spec.scope=='Namespaced'?'CrdObjectNamespacedView':'CrdObjectClusterView',  params: parent.spec.scope=='Namespaced'?{ name: parent.metadata.name, namespace: model.metadata.namespace, object: model.metadata.name }:{ name: parent.metadata.name, object: model.metadata.name }}">{{ model.metadata.name }}</router-link>
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
      <div v-if="showStatus">
      <q-field label="Problems" stack-label borderless v-if="Array.isArray(model.getcoreProblem) && model.getcoreProblem.length>0">
        <template v-slot:prepend><q-icon name="error" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <q-chip v-for="problem in model.getcoreProblem" v-bind:key="problem" class="glossy" color="negative" text-color="white" icon="error">{{ elude(problem.description, 100) }}<q-tooltip>{{ problem.description }}</q-tooltip></q-chip>
        </div></template>
      </q-field>
      </div>
      <div v-if="showLabels">
      <div class="row" v-if="(model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0) || (model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0)">
        <div :class="`col-md-${model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0?6:12}`" v-if="model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0">
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
        </div><div :class="`col-md-${model.metadata.annotations != undefined && Object.entries(model.metadata.annotations).length>0?6:12}`" v-if="model.metadata.labels != undefined && Object.entries(model.metadata.labels).length>0">
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
      </div>        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
