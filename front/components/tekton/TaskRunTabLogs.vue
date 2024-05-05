<script setup lang="ts">
import { ref,defineAsyncComponent } from 'vue';
const props = defineProps<{
  model: object
}>();
const getTaskDef = cont => {
  if (props.model.status == undefined || !Array.isArray(props.model.status.steps)) return null
  const step = props.model.status.steps.filter(s=>s.container==cont.name)
  if (step.length<1) return null
  if (props.model.status.taskSpec == undefined || !Array.isArray(props.model.status.taskSpec.steps)) return step[0]
  const def = props.model.status.taskSpec.steps.filter(s=>s.name==step[0].name)
  if (def.length<1|| def[0].script==undefined) return step[0]
  return {...step[0],...def[0]}
}
const getLang = script => {
  const line = script.split('\n')[0]
  if (line.startsWith('#!/') && line.match(/python/)!=null) return "python"
  if (line.startsWith('#!/') && line.match(/sh/)!=null) return "shell"
  return "text"
}
const MonacoViewer     = defineAsyncComponent(() => import( '@/components/core/MonacoViewer.vue'));
</script>
<template><div>
  <div v-for="cont in props.model.childk8sPod.filter(x=>x!=undefined).map(pod=>pod.childcoreContainer.filter(c=>!c.init)).flat().map(cont=>{return {...cont,...getTaskDef(cont)}})" v-bind:key="cont.name">
    <q-expansion-item icon="code" :label="cont.name" caption="script" v-if="cont.script!=undefined">
      <MonacoViewer :text="cont.script" :lang="getLang(cont.script)" />
    </q-expansion-item>
    <q-expansion-item icon="output" default-opened :label="cont.name">
      <pre class="bg-black text-white" v-if="cont.getcoreLog != undefined && Array.isArray(cont.getcoreLog.lines)">{{ cont.getcoreLog.lines.join('\n') }}</pre>
    </q-expansion-item>
  </div>
</div></template>
