<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import {dataEntry,chartSizeOptions,chartMarginOptions} from "../../libs/core"
import {arcDirection,entryKey,getSizeOptions,getMarginOptions} from "./commonTools"
const props = withDefaults(defineProps<{
  options?: chartSizeOptions&chartMarginOptions
  datum: Array<dataEntry>
  colorScheme?: Array<string>
}>(), {
  colorScheme: d3.schemeCategory10.concat(d3.schemeTableau10)
});
const defaultHeight = 400;
const defaultWidth = 3*defaultHeight/2;
const marginOptions = getMarginOptions(10,120,props.options);
const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...marginOptions})
const svgRoot = ref(null);
const outerRadius = Math.min(options.value.height, options.value.width-2*options.value.marginLegend) / 2 - options.value.margin;
const pie = d3.pie().sort(null).value(d => d.value);
const arc = d3.arc().outerRadius(outerRadius * 0.8).innerRadius(outerRadius * 0.4);
const targetArc = d3.arc().outerRadius(outerRadius * 0.8).innerRadius(outerRadius * 0.6);
const outerArc = d3.arc().innerRadius(outerRadius * 0.9).outerRadius(outerRadius * 0.9);
const colors = d3.scaleOrdinal(props.colorScheme);
const linePoints = d => {
  const pos = outerArc.centroid(d);
  pos[0] = outerRadius * 0.95 * arcDirection(d);
  return [targetArc.centroid(d), outerArc.centroid(d), pos];
}
const labelAnchor = d => arcDirection(d) > 0 ? "start" : "end"
const labelTranslate = d => {
  const pos = outerArc.centroid(d);
  pos[0] = outerRadius * arcDirection(d);
  return "translate(" + pos + ")";
}
const valueTranslate = d => {
  const pos = arc.centroid(d);
  return "translate(" + pos + ")";
}
onMounted(() => {
    const svg = d3.select(svgRoot.value);
    colors.domain(props.datum.map(d => d.name));
    const pieData = pie(props.datum);
    svg.select(".slices").selectAll("path").data(pieData, entryKey).join("path")
      .attr('d', arc).style("fill", d => colors(entryKey(d)));
    svg.select(".lines").selectAll("polyline").data(pieData, entryKey).join("polyline")
      .attr('points', linePoints);
    svg.select(".labels").selectAll("text").data(pieData, entryKey).join("text")
      .attr("dy", ".35em").attr('transform', labelTranslate).style('text-anchor', labelAnchor).text(d => d.data.name);
    svg.select(".values").selectAll("text").data(pieData, entryKey).join("text")
      .attr("dy", ".35em").attr('transform', valueTranslate).text(d => d.data.value);
})
</script>
<template>
  <svg ref="svgRoot" :width="options.width" :height="options.height" :viewBox="[-options.width / 2, -options.height / 2, options.width, options.height]" style="width: 100%; height: auto; font: 15px sans-serif;">
    <g class="slices" stroke-width="2px"></g>
    <g class="labels"></g>
    <g class="values" text-anchor="middle" stroke="#ccc" stroke-width="2" fill="currentColor" paint-order="stroke"></g>
    <g class="lines" fill="none" stroke-width="2" stroke="#000" stroke-opacity="0.2"></g>
  </svg>
</template>
