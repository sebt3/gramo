<script setup lang="ts">
defineEmits(['on-delete']);
const props = withDefaults(defineProps<{model: object, parent:object, useActions?:boolean, showLink?:boolean, origin?:string}>(), {
  useActions: false,
  showLink: false,
});
import { getTargetVersion, elude, getColor, timeAgo, getProperties, defineAsyncComponent, onMounted, usecrdObject } from '../../libs/core/crdObject.js'
import { colorCustomResourceDefinition } from '../../libs/k8s/custom.js'
const { $q, viewer, viewerUpdate, isNamespaced, router, onlyReadProperties } = usecrdObject();
import { knowledge } from '../../libs/knowledge.js'
const namespaced = isNamespaced();
const targetVersion = getTargetVersion(props.parent['spec']['versions'])
const schema = props.parent['spec']['versions'].filter(v=>v.name==targetVersion)[0].schema.openAPIV3Schema
const found = knowledge.filter(o=>o.apiGroup==props.parent['spec']['group']&&o.apiKind==props.parent['spec']['names']['kind'])
onMounted(() => {viewerUpdate(onlyReadProperties(props.model))})
const OpenApiEdit  = defineAsyncComponent(() => import( '@/components/core/OpenApiEdit.vue'));
const MonacoViewer = defineAsyncComponent(() => import( '@/components/core/MonacoViewer.vue'));
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-tabs v-model="viewer.tab" :class="`bg-${ colorCustomResourceDefinition } text-grey-2`" active-color="white" align="justify">
      <q-tab :label="$t('k8s.Object')" name="meta" />
      <q-tab :label="$t('view.tabs.simple')" name="simple" />
      <q-tab label="spec" name="spec" v-if="model['spec']!=null" />
      <q-tab :label="$t('view.tabs.yaml')" name="yaml" />
      <q-btn-group push class="float-right text-capitalize shadow-3 q-mr-sm" v-if="useActions">
        <q-btn icon="visibility"
          @click="router.push({ name: `${found[0].group}${found[0].short}View`, params: namespaced?{name: model.metadata.name, namespace: model.metadata.namespace}:{name: model.metadata.name}})"
          v-if="found.length>0">
          <q-tooltip>{{ $t('view.as', {short: found[0].short, group: found[0].group, name: model.metadata.name}) }}</q-tooltip>
        </q-btn>
        <q-btn icon="edit"
          @click="router.push({ name: parent.spec.scope=='Namespaced'?'CrdObjectNamespacedEdit':'CrdObjectClusterEdit', params: namespaced?{name: parent.metadata.name, object: model.metadata.name, namespace: model.metadata.namespace}:{name: parent.metadata.name, object: model.metadata.name}})">
          <q-tooltip>{{ $t('core.editTooltip', {short: parent['spec']['names']['kind'], name: model.metadata.name}) }}</q-tooltip>
        </q-btn>
        <q-btn icon="delete"
          @click="$emit('on-delete', model.metadata)">
          <q-tooltip>{{ $t('core.deleteTooltip', {short: parent['spec']['names']['kind'], name: model.metadata.name}) }}</q-tooltip>
        </q-btn>
      </q-btn-group>
    </q-tabs>
    <q-tab-panels v-model="viewer.tab" animated>
      <q-tab-panel name="meta" :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
      <div class="q-gutter-md">
      <div class="row">
        <div class="col-md-4" v-if="model.metadata.namespace != undefined && model.metadata.namespace!=''">
          <q-field :label="$t('meta.namespace')" stack-label borderless>
            <template v-slot:prepend><q-icon name="dashboard" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline"><router-link :to="{ name: 'k8sPodTable', params: { namespace: model.metadata.namespace } }">{{ model.metadata.namespace }}</router-link></div>
            </template>
          </q-field>
        </div>
        <div class="col-md-4">
          <q-field :label="$t('meta.name')" stack-label borderless>
            <template v-slot:prepend><q-icon name="smart_button" /></template>
            <template v-slot:control>
              <div class="self-center full-width no-outline" v-if="showLink">
                <router-link :to="{ name: origin?`k8sPodViewFrom${origin}`:'k8sPodView', params: { namespace: model.metadata.namespace, name: model.metadata.name } }">{{ model.metadata.name }}</router-link>
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
      </div>      <q-field label="Problems" stack-label borderless v-if="Array.isArray(model.getcoreProblem) && model.getcoreProblem.length>0">
        <template v-slot:prepend><q-icon name="error" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <q-chip v-for="problem in model.getcoreProblem" v-bind:key="problem" class="glossy" color="negative" text-color="white" icon="error">{{ elude(problem.description, 100) }}<q-tooltip>{{ problem.description }}</q-tooltip></q-chip>
        </div></template>
      </q-field>
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
      </div>      </div>
      </q-tab-panel>
      <q-tab-panel name="simple" :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
        <OpenApiEdit
          :in="model['spec']"
          :properties="getProperties(schema.properties.spec)"
          :read-only="true"
          :showdefault="false"
        />
      </q-tab-panel>
      <q-tab-panel name="spec" v-if="model['spec']!=null" :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
        <MonacoViewer :text="viewer.props.spec" :key="viewer.props.spec" />
      </q-tab-panel>
      <q-tab-panel name="yaml" :class="`bg-${ colorCustomResourceDefinition }-${$q.dark.isActive?'10':'1'}`">
        <MonacoViewer :text="viewer.full" :key="viewer.full" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
