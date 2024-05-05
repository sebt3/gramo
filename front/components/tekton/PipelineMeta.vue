<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  model: object
}>();
const stepWidth = 100
const stepHeight = 20
const stepVMargin = 5
const stages = computed(() => {
  if (props.model.spec == undefined || !Array.isArray(props.model.spec.tasks)) return []
  if (props.model.spec.tasks.filter(t=>Array.isArray(t.runAfter)).length<1) return [props.model.spec.tasks]
  const reducer = (acc,name)=>acc && stages.flat().map(s=>s.name).includes(name)
  const stages = [props.model.spec.tasks.filter(t=>!Array.isArray(t.runAfter))]
  var to_assign = props.model.spec.tasks.filter(t=>Array.isArray(t.runAfter))
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
  if (Array.isArray(props.model.spec.finally) && props.model.spec.finally.length>0) {
    stages.push(props.model.spec.finally)
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
  }})).flat()
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
Q${link.midX} ${link.startY} ${link.midX} ${(link.midY<link.startY?Math.max:Math.min)(link.startY+(link.midY<link.startY?-10:link.midY==link.startY?0:10),link.midY)}
L${link.midX} ${(link.midY<link.destY?Math.max:Math.min)(link.destY+(link.midY<link.destY?-10:link.midY==link.destY?0:10),link.midY)}
Q${link.midX} ${link.destY} ${link.destX-10} ${link.destY}
L${link.destX-5} ${link.destY}
L${link.destX-5} ${link.destY-3}
L${link.destX-1} ${link.destY}
L${link.destX-5} ${link.destY+3}
L${link.destX-5} ${link.destY}`
const getCondition = name => {
  if (props.model.spec == undefined || !Array.isArray(props.model.spec.tasks)) return null;
  const myTasks = (props.model.spec.tasks.concat(Array.isArray(props.model.spec.finally)?props.model.spec.finally:[])).filter(t=>t.name==name)
  if (myTasks.length>0 && Array.isArray(myTasks[0].when))
    return myTasks[0].when
  return null
}
const haveCondition = task => getCondition(task)!=null
const links = computed(() => {
  const stgs = stages.value;
  const hMargin = stepHMargin.value;
  return virtLinks.value.map(link=>{return{...link,
    c1: 5,
    c2: 5,
    destX: getProjectedX(link.dix)-(haveCondition(link.dst)?4:0),
    startX: getProjectedX(link.six)+stepWidth,
    destY: getProjectedY(link.diy,stgs[link.col+1].length)+stepHeight/2,
    startY: getProjectedY(link.siy,stgs[link.col].length)+stepHeight/2,
    midX: getProjectedX(link.six)+stepWidth+(hMargin/2)+((hMargin/4)/link.mx*link.mi*(link.mi%2==0?1:-1)),
    midY: (getProjectedY(link.diy,stgs[link.col+1].length)+getProjectedY(link.siy,stgs[link.col].length)+stepHeight)/2,
  }}).map(link=>{return{...link,d:getPath(link)}})
})
</script>
<template><div>
  <svg ref="svgRoot" :viewBox="[0,0,width,height]" :width="width" :height="height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 10px sans-serif;">
    <g class="links" v-for="link in links" :key="`${link.src}-${link.dst}`">
      <path :d="link.d" stroke="black" stroke-width="1" fill="none" />
    </g>
    <g class="tasks" v-for="(steps, x) in stages" :key="`rects-${x}`">
        <rect v-for="(task, y) in steps" :key="`rect-${task.name}`"
          :width="stepWidth" :height="stepHeight" rx="5" ry="5"
          :x="getProjectedX(x)" :y="getProjectedY(y, steps.length)"
          class="isSkipped" />
    </g>
    <g class="labels" text-anchor="middle" v-for="(steps, x) in stages" :key="`labels-${x}`">
        <text v-for="(task, y) in steps" :key="`text-${task.name}`"
          :x="getProjectedX(x)+stepWidth/2" :y="getProjectedY(y, steps.length)+stepHeight-8"
          class="isSkipped"
        >{{ task['name'] }}</text>
    </g>
    <g class="conditions" v-for="(steps, x) in stages" :key="`conds-${x}`">
        <g v-for="(task, y) in steps" :key="`cond-${task.name}`" :transform="`translate(${getProjectedX(x)-3} ${getProjectedY(y, steps.length)+stepHeight/2-3})`">
          <rect v-if="haveCondition(task.name)" :transform="`rotate(45 3 3)`" width="6" height="6" class="isSkipped" />
        </g>
    </g>
  </svg>
</div></template>
<style scoped lang="sass">
@use "quasar/src/css/variables" as q
text.isSkipped
    fill: q.$grey
</style>