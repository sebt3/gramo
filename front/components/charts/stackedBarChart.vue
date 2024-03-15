<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import {chartSizeOptions,chartMarginOptions} from "../../libs/core"
import {getSizeOptions,getMarginOptions,onlyUnique} from "./commonTools"
const props = defineProps<{
  options?: chartSizeOptions&chartMarginOptions
  datum: Array<object>
  axisX: (s:object) => string
  axisColor: (s:object) => string
  getVal: (s:object) => number
}>();
const marginTop = 10;
const marginRight = 10;
const marginBottom = 30;
const marginLeft = 40;
const defaultHeight = 400;
const defaultWidth = 3*defaultHeight/2;
const marginOptions = getMarginOptions(10,defaultHeight/2-20,props.options);
const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...marginOptions})
const svgRoot = ref(null);
const series = d3.stack().keys(d3.union(props.datum.map(props.axisColor))).value(([, D], key) => props.getVal(D.get(key)))(d3.index(props.datum, props.axisX, props.axisColor));
const x = d3.scaleBand().domain(d3.groupSort(props.datum, D => -d3.sum(D, props.getVal), props.axisX)).range([marginLeft, options.value.width - marginRight]).padding(0.1);
const y = d3.scaleLinear().domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).rangeRound([options.value.height - marginBottom, marginTop]);
const color = props.datum.length>1?d3.scaleOrdinal().domain(series.map(d => d.key)).range(d3.schemeSpectral[series.length>4&&series.length<11?series.length:4]).unknown("#ccc"):()=>d3.schemeSpectral[4][1];
const rotation = options.value.width/(props.datum.map(props.axisX).filter(onlyUnique).length+1)<80?-10:0
const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")
onMounted(() => {
    const svg = d3.select(svgRoot.value);
    svg.select(".axisBottom").call(d3.axisBottom(x).tickSizeOuter(0)).call(g => g.selectAll(".domain").remove()).call(g => g.selectAll("text").attr('transform', `rotate(${rotation})`));
    svg.select(".axisLeft").call(d3.axisLeft(y)).call(g => g.selectAll(".domain").remove());
    svg.select(".rects").selectAll().data(series).join("g")
        .attr("fill", d => color(d.key))
      .selectAll("rect").data(D => D.map(d => (d.key = D.key, d))).join("rect")
        .attr("x", d => x(d.data[0])).attr("y", d => y(d[1])).attr("height", d => isNaN(y(d[0]))||isNaN(y(d[1]))?0:y(d[0]) - y(d[1])).attr("width", x.bandwidth())
      .append("title")
      .text(d => `${d.data[0]} ${d.key}\n${formatValue(props.getVal(d.data[1].get(d.key)))}`);
    svg.select(".labels").selectAll().data(series).join("g").selectAll("text").data(D => D.map(d => (d.key = D.key, d))).join("text")
      .text((x) => `${x.key}`).attr('transform', d=> `translate(${x(d.data[0])+x.bandwidth()/2}, ${isNaN(y(d[0]))||isNaN(y(d[1]))?-100:(y(d[0]) + y(d[1]))/2}) rotate(${rotation})`)
})
</script>
<template>
  <svg ref="svgRoot" :viewBox="[0,0,options.width,options.height]" :width="options.width" :height="options.height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 10px sans-serif;">
    <g class="rects" />
    <g class="labels" text-anchor="middle" />
    <g :transform="`translate(0,${options.height - marginBottom})`" ><g class="axisBottom" /></g>
    <g :transform="`translate(${marginLeft}, 0)`"><g class="axisLeft" /></g>
  </svg>
</template>
