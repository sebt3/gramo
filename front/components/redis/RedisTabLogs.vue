<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  model: object
}>();
const logViewTab = ref((
  props.model.childk8sStatefulSet != undefined && props.model.childk8sStatefulSet.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).length>0)?props.model.childk8sStatefulSet.filter(rs=>Array.isArray(rs.childk8sPod)&&rs.childk8sPod.filter(po=>Array.isArray(po.childcoreContainer)&&po.childcoreContainer.length>0).length>0).map(rs=>rs.childk8sPod.map(po=>po.childcoreContainer.map(cont=>{return {rs:rs.metadata,po:po.metadata, ...cont}}))).flat().flat().sort((a,b)=>a.po.creationTimestamp<b.po.creationTimestamp?-1:1).map(cont=>`${cont.po.name}-${cont.name}`)[0]
  :'none')
const logViewSplitterModel= ref(20)
console.log(props.model)
</script>
<template>
  <q-splitter v-model="logViewSplitterModel" >
    <template v-slot:before>
      <q-tabs inline-label v-model="logViewTab" vertical class="text-teal" switch-indicator active-color="primary">
        <q-tab v-for="cont in props.model.childk8sStatefulSet.filter(rs=>Array.isArray(rs.childk8sPod)&&rs.childk8sPod.filter(po=>Array.isArray(po.childcoreContainer)&&po.childcoreContainer.length>0).length>0).map(rs=>rs.childk8sPod.map(po=>po.childcoreContainer.map(cont=>{return {rs:rs.metadata,po:po.metadata, ...cont}}))).flat().flat().sort((a,b)=>a.po.creationTimestamp<b.po.creationTimestamp?-1:1)" v-bind:key="`${cont.po.name}-${cont.name}`" :name="`${cont.po.name}-${cont.name}`" :label="`${cont.name}#${cont.po.name.replace(props.model.metadata.name+'-','')}`"  />
      </q-tabs>
    </template>
    <template v-slot:after>
      <q-tab-panels v-model="logViewTab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel  v-for="cont in props.model.childk8sStatefulSet.filter(rs=>Array.isArray(rs.childk8sPod)&&rs.childk8sPod.filter(po=>Array.isArray(po.childcoreContainer)&&po.childcoreContainer.length>0).length>0).map(rs=>rs.childk8sPod.map(po=>po.childcoreContainer.map(cont=>{return {rs:rs.metadata,po:po.metadata, ...cont}}))).flat().flat()" v-bind:key="`${cont.po.name}-${cont.name}`" :name="`${cont.po.name}-${cont.name}`" class="bg-black text-white">
          <pre v-if="cont.getcoreLog != undefined && Array.isArray(cont.getcoreLog.lines)">
{{ cont.getcoreLog.lines.join('\n') }}
          </pre>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
