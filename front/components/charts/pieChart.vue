<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import {dataEntry,chartSizeOptions} from "../core/interfaces"
import {arcDirection,entryKey} from "./commonTools"
const props = defineProps<{
  options?: chartSizeOptions
  datum: Array<dataEntry>
}>();
const defaultWidth = 600;
const options = ref({
    width: props.options!=undefined&&props.options.width!==undefined?props.options.width:defaultWidth,
    height: props.options!=undefined&&props.options.height!==undefined?props.options.height:(defaultWidth * 0.5)
})
const svgRoot = ref(null);
const radius = Math.min(options.value.width, options.value.height) / 2;
const pie = d3.pie().sort(null).value(d => d.value);
const arc = d3.arc().outerRadius(radius * 0.8).innerRadius(radius * 0.4);
const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);
const cScale = d3.scaleOrdinal(d3.schemeCategory10);
const linePoints = d => {
  const pos = outerArc.centroid(d);
  pos[0] = radius * 0.95 * arcDirection(d);
  return [arc.centroid(d), outerArc.centroid(d), pos];
}
const labelAnchor = d => arcDirection(d) > 0 ? "start" : "end"
const labelTranslate = d => {
  const pos = outerArc.centroid(d);
  pos[0] = radius * arcDirection(d);
  return "translate(" + pos + ")";
}
onMounted(() => {
    const svg = d3.select(svgRoot.value);
    cScale.domain(props.datum.map(d => d.name));
    const pieData = pie(props.datum);
    svg.select(".slices").selectAll("path").data(pieData, entryKey).join("path")
      .attr("stroke-width", "2px")
      .attr('d', arc)
      .style("fill", d => cScale(entryKey(d)));
    svg.select(".lines").selectAll("polyline").data(pie(props.datum), entryKey).join("polyline")
      .attr('fill','none').attr('stroke','black').attr('stroke-width','2px').attr('opacity','.3')
      .attr('points', linePoints);
    svg.select(".labels").selectAll("text").data(pie(props.datum), entryKey).join("text")
      .attr("dy", ".35em")
      .attr('transform', labelTranslate)
      .style('text-anchor', labelAnchor)
      .text(d => `${d.data.name}: ${d.data.value}`);
})
</script>
<template>
  <svg ref="svgRoot" :width="options.width" :height="options.height">
    <g :transform='`translate(${options.width / 2},${options.height / 2})`'>
      <g class="slices"></g>
      <g class="labels"></g>
      <g class="lines"></g>
    </g>
  </svg>
</template>
