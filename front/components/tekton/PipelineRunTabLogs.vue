<script setup lang="ts">
import { ref,defineAsyncComponent } from 'vue';
const props = defineProps<{
  model: object
}>();
const logViewTab = ref((
  props.model.childtektonTaskRun != undefined && props.model.childtektonTaskRun.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).length>0)?props.model.childtektonTaskRun.filter(tr=>Array.isArray(tr.childk8sPod)&&tr.childk8sPod.length>0).sort((a,b)=>a.metadata.creationTimestamp<b.metadata.creationTimestamp?-1:1)[0].metadata.name
  :'none')
const logViewSplitterModel= ref(20)
const getDef = (cont,tr) => {
  if (tr.status ==undefined || !Array.isArray(tr.status.steps) || tr.status.taskSpec == undefined || !Array.isArray(tr.status.taskSpec.steps) ) return null
  const step = tr.status.steps.filter(s=>s.container==cont.name)
  if (step.length<1) return null
  const def = tr.status.taskSpec.steps.filter(s=>s.name==step[0].name)
  if (def.length<1|| def[0].script==undefined) return null
  return def[0]
}
const getSource = (cont,tr) => {
  const def = getDef(cont,tr)
  return (def!=null&&def!=undefined&&def.script!=undefined)?def.script:""
}
const getLang = script => {
  const line = script.split('\n')[0]
  if (line.startsWith('#!/') && line.match(/python/)!=null) return "python"
  if (line.startsWith('#!/') && line.match(/sh/)!=null) return "shell"
  return "text"
}
const MonacoViewer     = defineAsyncComponent(() => import( '@/components/core/MonacoViewer.vue'));
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
            <q-expansion-item icon="code" :label="cont.name">
              <MonacoViewer :text="getSource(cont,tr)" :lang="getLang(getSource(cont,tr))" />
            </q-expansion-item>
            <pre v-if="cont.getcoreLog!=undefined && Array.isArray(cont.getcoreLog.lines)">{{ cont.getcoreLog.lines.join('\n') }}</pre>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
