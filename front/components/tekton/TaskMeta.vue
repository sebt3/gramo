<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  model: object
}>();
const stepWidth = 100
const stepHeight = 20
const stepHMargin = 10
const stepWMargin = 30
const width = computed(() => props.model['spec'] != undefined && Array.isArray(props.model['spec']['steps'])?props.model['spec']['steps'].length*(stepWidth+stepWMargin)+stepWMargin:0)
const height = computed(() => props.model['spec'] != undefined && Array.isArray(props.model['spec']['steps'])?stepHeight+stepHMargin:0)
const getProjectedX = x => x*(stepWidth+stepWMargin)+stepWMargin/2
const getArrowPath = x => `
M${getProjectedX(x)+stepWidth} ${(stepHeight+stepHMargin)/2}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2-3}
L${getProjectedX(x+1)-1} ${(stepHeight+stepHMargin)/2}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2+3}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2}`
</script>
<template>
  <svg ref="svgRoot" :viewBox="[0,0,width,height]" :width="width" :height="height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 10px sans-serif;">
    <g class="links" v-if="props.model['spec'] != undefined && Array.isArray(props.model['spec']['steps'])">
      <path  v-for="(steps, x) in props.model['spec']['steps'].filter((_,i)=>i!=0)" :key="`paths-${x}`"
        :d="getArrowPath(x)"
        stroke="black" stroke-width="1" fill="none" />
    </g>
    <g class="rects" v-if="props.model['spec'] != undefined && Array.isArray(props.model['spec']['steps'])">
        <rect v-for="(steps, x) in props.model['spec']['steps']" :key="`rects-${x}`"
          :width="stepWidth" :height="stepHeight" rx="5" ry="5"
          :x="getProjectedX(x)" :y="stepHMargin/2"
          class="isPending" />
    </g>
    <g class="labels" text-anchor="middle"  v-if="props.model['spec'] != undefined && Array.isArray(props.model['spec']['steps'])">
        <text v-for="(steps, x) in props.model['spec']['steps']" :key="`text-${x}`"
          :x="getProjectedX(x)+stepWidth/2" :y="stepHMargin/2+stepHeight-8"
          class="isPending"
        >{{ steps['name'] }}</text>
    </g>
  </svg>
</template>
<style scoped lang="sass">
@use "quasar/src/css/variables" as q
text.isPending
    fill: q.$blue
</style>