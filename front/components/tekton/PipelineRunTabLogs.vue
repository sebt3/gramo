<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  model: object
}>();
const logViewTab = ref((
  props.model.childtektonTaskRun != undefined && props.model.childtektonTaskRun.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).length>0)?props.model.childtektonTaskRun.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).sort((a,b)=>a.metadata.creationTimestamp<b.metadata.creationTimestamp?-1:1)[0].metadata.name
  :'none')
const logViewSplitterModel= ref(20)
</script>
<template>
  <q-splitter v-model="logViewSplitterModel" >
    <template v-slot:before>
      <q-tabs inline-label v-model="logViewTab" vertical class="text-teal" switch-indicator active-color="primary">
        <q-tab v-for="prop in props.model.childtektonTaskRun.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).sort((a,b)=>a.metadata.creationTimestamp<b.metadata.creationTimestamp?-1:1)" v-bind:key="prop.metadata.name" :name="prop.metadata.name" :label="prop.metadata.name.replace(props.model.metadata.name+'-','')" :icon="prop.status.conditions[0].status=='True'?'check':'error'" />
      </q-tabs>
    </template>
    <template v-slot:after>
      <q-tab-panels v-model="logViewTab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel  v-for="tr in props.model.childtektonTaskRun.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).sort((a,b)=>a.metadata.creationTimestamp<b.metadata.creationTimestamp?-1:1)" v-bind:key="tr.metadata.name" :name="tr.metadata.name"  class="bg-black text-white">
          <div v-for="cont in tr.childk8sPod.map(po=>po.childcoreContainer.filter(c=>!c.init)).flat()" v-bind:key="cont.name">
            <h5>{{ cont.name }}</h5>
            <pre v-if="cont.getcoreLog!=undefined && Array.isArray(cont.getcoreLog.lines)">
{{ cont.getcoreLog.lines.join('\n') }}
            </pre>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
