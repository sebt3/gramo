<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  model: object
}>();
console.log(props.model)
const stepWidth = 100
const stepHeight = 20
const stepHMargin = 10
const stepWMargin = 30
const width = computed(() => props.model['status'] != undefined && Array.isArray(props.model['status']['steps'])?props.model['status']['steps'].length*(stepWidth+stepWMargin)+stepWMargin:0)
const height = computed(() => props.model['status'] != undefined && Array.isArray(props.model['status']['steps'])?stepHeight+stepHMargin:0)
const getProjectedX = x => x*(stepWidth+stepWMargin)+stepWMargin/2
const getClass = name => props.model['status'] != undefined && Array.isArray(props.model['status']['steps']) && props.model['status']['steps'].filter(s=>s.name==name && s.terminated != undefined && s.terminated.exitCode != undefined).length>0?(props.model['status']['steps'].filter(s=>s.name==name && s.terminated != undefined && s.terminated.exitCode != undefined)[0].terminated.exitCode==0?"isSuccess":"isFailed"):"isPending"
const getArrowPath = x => `
M${getProjectedX(x)+stepWidth} ${(stepHeight+stepHMargin)/2}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2-3}
L${getProjectedX(x+1)-1} ${(stepHeight+stepHMargin)/2}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2+3}
L${getProjectedX(x+1)-5} ${(stepHeight+stepHMargin)/2}`
</script>
<template>
  <div class="row">
    <div class="col-md-3" v-if="props.model.spec != undefined && Array.isArray(props.model.spec.params)">
      <q-field v-for="param in props.model.spec.params" :key="param.name"
        :label="param.name" stack-label borderless>
        <template v-slot:prepend><q-icon name="input" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ param.value }}</div>
        </template>
      </q-field>
    </div>
    <div class="col-md-6">
      <svg ref="svgRoot" :viewBox="[0,0,width,height]" :width="width" :height="height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 10px sans-serif;">
        <g class="links" v-if="props.model['status'] != undefined && props.model['status']['taskSpec'] != undefined && Array.isArray(props.model['status']['taskSpec']['steps'])">
          <path  v-for="(steps, x) in props.model['status']['taskSpec']['steps'].filter((_,i)=>i!=0)" :key="`paths-${x}`"
            :d="getArrowPath(x)"
            stroke="black" stroke-width="1" fill="none" />
        </g>
        <g class="rects" v-if="props.model['status'] != undefined && props.model['status']['taskSpec'] != undefined && props.model['status'] != undefined && Array.isArray(props.model['status']['taskSpec']['steps'])">
            <rect v-for="(steps, x) in props.model['status']['taskSpec']['steps']" :key="`rects-${x}`"
              :width="stepWidth" :height="stepHeight" rx="5" ry="5"
              :x="getProjectedX(x)" :y="stepHMargin/2"
              :class="getClass(steps['name'])" />
        </g>
        <g class="labels" text-anchor="middle" v-if="props.model['status'] != undefined && props.model['status']['taskSpec'] != undefined && Array.isArray(props.model['status']['taskSpec']['steps'])">
            <text v-for="(steps, x) in props.model['status']['taskSpec']['steps']" :key="`text-${x}`"
              :x="getProjectedX(x)+stepWidth/2" :y="stepHMargin/2+stepHeight-8"
              :class="getClass(steps['name'])"
            >{{ steps['name'] }}</text>
        </g>
      </svg>
    </div>
    <div class="col-md-3" v-if="props.model.status != undefined && Array.isArray(props.model.status.results)">
      <q-field v-for="param in props.model.status.results" :key="param.name"
        :label="param.name" stack-label borderless>
        <template v-slot:prepend><q-icon name="output" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ param.value }}</div>
        </template>
      </q-field>
    </div>
  </div>
</template>
<style scoped lang="sass">
@use "quasar/src/css/variables" as q
text.isFailed
    fill: q.$red
text.isSuccess
    fill:  q.$light-green
text.isSkipped
    fill: q.$grey
text.isPending
    fill: q.$blue
</style>