<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
const props = defineProps<{
  model: object
}>();
const stepWidth = 100
const stepHeight = 20
const stepVMargin = 5
const taskIsSkipped = name => Array.isArray(props.model.status.skippedTasks) && props.model.status.skippedTasks.filter(s=>s.name==name).length>0
const getTask = name => Array.isArray(props.model.childtektonTaskRun) && Array.isArray(props.model.status.childReferences) && props.model.status.childReferences.filter(c=>c.pipelineTaskName==name).length>0 && props.model.childtektonTaskRun.filter(tr=>tr.metadata.name==props.model.status.childReferences.filter(c=>c.pipelineTaskName==name)[0].name).length>0
        ?props.model.childtektonTaskRun.filter(tr=>tr.metadata.name==props.model.status.childReferences.filter(c=>c.pipelineTaskName==name)[0].name)[0]
        :null;
const getClass = name => taskIsSkipped(name)?"isSkipped":getTask(name)==null||getTask(name).status==undefined||!Array.isArray(getTask(name).status.conditions)||getTask(name).status.conditions.length<1?"isPending":getTask(name).status.conditions[0].status=="True"?"isSuccess":"isFailed"
const stages = computed(() => {
  if (props.model.status == undefined || props.model.status.pipelineSpec == undefined || !Array.isArray(props.model.status.pipelineSpec.tasks)) return []
  if (props.model.status.pipelineSpec.tasks.filter(t=>Array.isArray(t.runAfter)).length<1) return [props.model.status.pipelineSpec.tasks]
  const reducer = (acc,name)=>acc && stages.flat().map(s=>s.name).includes(name)
  const stages = [props.model.status.pipelineSpec.tasks.filter(t=>!Array.isArray(t.runAfter))]
  var to_assign = props.model.status.pipelineSpec.tasks.filter(t=>Array.isArray(t.runAfter))
  if (stages[0].length<1) {
    console.error('No starting point')
    return []
  }
  for (var cont = true;cont;) {
    const founds = to_assign.filter(t=>t.runAfter.reduce(reducer,true))
    if(founds.length>0) {
      to_assign = to_assign.filter(t=>!t.runAfter.reduce(reducer,true))
      stages.push(founds)
      cont = to_assign.length>0
    } else {
      cont=false;
      console.error('no more step to stages, is this a DAG?')
    }
  }
  if (Array.isArray(props.model.status.pipelineSpec.finally) && props.model.status.pipelineSpec.finally.length>0) {
    stages.push(props.model.status.pipelineSpec.finally)
  }
  return stages
})
const virtLinks = computed(() => {
  const stgs = stages.value;
  const getX = name => stgs.reduce((acc,cur,i)=>cur.map(x=>x.name).includes(name)?i:acc,0)
  const getY = name => stgs.reduce((acc,cur)=>cur.map(x=>x.name).includes(name)?cur.map(x=>x.name).indexOf(name):acc,0)
  const links = stgs.flat().filter(stg=>Array.isArray(stg.runAfter)&&stg.runAfter.length>0).map(dest=>dest.runAfter.map(src=>{return {
    src: src,
    dst: dest.name,
    six: getX(src),
    siy: getY(src),
    dix: getX(dest.name),
    diy: getY(dest.name),
  }})).flat().filter(l=>!taskIsSkipped(l.src)&&!taskIsSkipped(l.dst))
  const columns = Object.entries(Object.groupBy(links,({six})=>six)).map(([_,lnks],col)=>{
    const groups= Object.entries(Object.groupBy(lnks,({src})=>src)).filter(([_,a])=>a.length>1).concat(Object.entries(Object.groupBy(lnks,({dst})=>dst)).filter(([_,a])=>a.length>1)).map(([_,a])=>a)
    groups.push(...lnks.filter(l=>!groups.flat().map(i=>`${i.src}-${i.dst}`).includes(`${l.src}-${l.dst}`)).map(l=>[l]))
    return groups.map((g,i)=>g.map(l=>{return {...l,col:col, mi:i,mx:groups.length}}))
  }).flat().flat()
  return columns
})
const width = computed(() => stages.value.length*(stepWidth+stepHMargin.value))
const height = computed(() => (stages.value.reduce((acc,cur)=>acc>cur.length?acc:cur.length,1)+1)*(stepHeight+stepVMargin)+stepVMargin)
const stepHMargin = computed(() => 10 + 30 * virtLinks.value.reduce((acc,cur)=>acc>cur.mx?acc:cur.mx,0))
const getProjectedX = x => x*(stepWidth+stepHMargin.value)+5
const getProjectedY = (y, max) => (y+1)*(height.value/(max+1))
const getPath = link => `
M${link.startX} ${link.startY}
L${link.midX-10} ${link.startY}
Q${link.midX} ${link.startY} ${link.midX} ${link.startY+10*(link.midY<link.startY?-1:link.midY==link.startY?0:1)}
L${link.midX} ${link.destY+10*(link.midY<link.startY?1:link.midY==link.startY?0:-1)}
Q${link.midX} ${link.destY} ${link.destX-10} ${link.destY}
L${link.destX-5} ${link.destY}
L${link.destX-5} ${link.destY-3}
L${link.destX-1} ${link.destY}
L${link.destX-5} ${link.destY+3}
L${link.destX-5} ${link.destY}`
const links = computed(() => {
  const stgs = stages.value;
  const hMargin = stepHMargin.value;
  return virtLinks.value.map(link=>{return{...link,
    c1: 5,
    c2: 5,
    destX: getProjectedX(link.dix),
    startX: getProjectedX(link.six)+stepWidth,
    destY: getProjectedY(link.diy,stgs[link.col+1].length)+stepHeight/2,
    startY: getProjectedY(link.siy,stgs[link.col].length)+stepHeight/2,
    midX: getProjectedX(link.six)+stepWidth+(hMargin/2)+((hMargin/4)/link.mx*link.mi*(link.mi%2==0?1:-1)),
    midY: (getProjectedY(link.diy,stgs[link.col+1].length)+getProjectedY(link.siy,stgs[link.col].length)+stepHeight)/2,
  }}).map(link=>{return{...link,d:getPath(link)}})
})
const dialogs = ref(Object.fromEntries(Array.isArray(props.model.childtektonTaskRun)?props.model.childtektonTaskRun.map(tr=>[tr.metadata.name,false]):[]))
const GenericView = defineAsyncComponent(() => import( '@/components/generic/GenericView.vue'));
const showDialog = task => {
  console.log(task,getTask(task.name))
  if(getTask(task.name)!=null){dialogs.value[getTask(task.name).metadata.name]=true}
}
console.log(props.model, stages.value,links.value)
</script>
<template><div>
  <q-dialog v-for="task in Array.isArray(model.childtektonTaskRun)?model.childtektonTaskRun:[]" :key="task.metadata.name" v-model="dialogs[task.metadata.name]">
    <GenericView :model="task" group="tekton" short="TaskRun" :showLabels="false" style="width: 700px; max-width: 80vw;" />
  </q-dialog>
  <svg ref="svgRoot" :viewBox="[0,0,width,height]" :width="width" :height="height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 10px sans-serif;">
    <g class="links" v-for="link in links" :key="`${link.src}-${link.dst}`">
      <path :d="link.d" stroke="black" stroke-width="1" fill="none" />
    </g>
    <g class="rects" v-for="(steps, x) in stages" :key="`rects-${x}`">
        <rect v-for="(task, y) in steps" :key="`rect-${task.name}`"
          :width="stepWidth" :height="stepHeight" rx="5" ry="5"
          :x="getProjectedX(x)" :y="getProjectedY(y, steps.length)"
          v-on:click="showDialog(task)"
          :class="getClass(task.name)" />
    </g>
    <g class="labels" text-anchor="middle"  v-for="(steps, x) in stages" :key="`labels-${x}`">
        <text v-for="(task, y) in steps" :key="`text-${task.name}`"
          :x="getProjectedX(x)+stepWidth/2" :y="getProjectedY(y, steps.length)+stepHeight-8"
          :class="getClass(task.name)"
          v-on:click="showDialog(task)"
        >{{ task['name'] }}</text>
    </g>
  </svg>
</div></template>
<style scoped lang="sass">
@use "quasar/src/css/variables" as q
rect.isFailed
    cursor: pointer
rect.isSuccess
    cursor: pointer
text.isFailed
    fill: q.$red
    cursor: pointer
text.isSuccess
    fill:  q.$light-green
    cursor: pointer
text.isSkipped
    fill: q.$grey
text.isPending
    fill: q.$blue
</style>