<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {chartSizeOptions,chartMarginOptions} from "../../libs/core"
import * as d3 from "d3";
const {getSizeOptions,getMarginOptions,onlyUnique} = await import("../charts/commonTools")
const props = defineProps<{
  options?: chartSizeOptions&chartMarginOptions
  model: object
}>();
const marginTop = 10;
const marginRight = 10;
const marginBottom = 30;
const marginLeft = 40;
const defaultHeight = 0;
const defaultWidth = 6*defaultHeight/2;
const marginOptions = getMarginOptions(10,defaultHeight/2-20,props.options);
const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...marginOptions})
const svgRoot = ref(null);
const taskIsSkipped = name => Array.isArray(props.model.status.skippedTasks) && props.model.status.skippedTasks.filter(s=>s.name==name).length>0
const getTask = name => Array.isArray(props.model.childtektonTaskRun) && Array.isArray(props.model.status.childReferences) && props.model.status.childReferences.filter(c=>c.pipelineTaskName==name).length>0 && props.model.childtektonTaskRun.filter(tr=>tr.metadata.name==props.model.status.childReferences.filter(c=>c.pipelineTaskName==name)[0].name).length>0
        ?props.model.childtektonTaskRun.filter(tr=>tr.metadata.name==props.model.status.childReferences.filter(c=>c.pipelineTaskName==name)[0].name)[0]
        :null;
onMounted(() => {
    const svg = d3.select(svgRoot.value);
})
console.log(props.model)
</script>
<template>
  <svg ref="svgRoot" :viewBox="[0,0,options.width,options.height]" :width="options.width" :height="options.height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 10px sans-serif;">
    <g class="rects">
        <rect v-for="task in props.model.status.pipelineSpec.tasks" :key="task.name" />
    </g>
    <g class="labels" text-anchor="middle" />
    <g :transform="`translate(0,${options.height - marginBottom})`" ><g class="axisBottom" /></g>
    <g :transform="`translate(${marginLeft}, 0)`"><g class="axisLeft" /></g>
  </svg>
</template>
