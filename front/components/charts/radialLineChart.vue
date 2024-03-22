<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from "d3";
const {chartSizeOptions,chartMarginOptions} = await import("../../libs/core")
const {onlyUnique,uid,getSizeOptions,getMarginOptions} = await import("./commonTools")
const props = defineProps<{
  options?: chartSizeOptions&chartMarginOptions
  datum: Array<object>
  axisX: (s:object) => string
  axisColor: (s:object) => string
  getVal: (s:object) => number
}>();
const defaultHeight = 400;
const defaultWidth = 3*defaultHeight/2;
const marginOptions = getMarginOptions(20,defaultHeight/2-20,props.options);
const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...marginOptions})
const svgRoot = ref(null);
const outerRadius = Math.min(options.value.height, options.value.width-options.value.marginLegend) / 2 - options.value.margin;
const innerRadius = outerRadius / 5;
const textRadius = outerRadius*1.02;
const color = d3.scaleOrdinal(d3.schemeCategory10).domain(props.datum.map(props.axisColor).filter(onlyUnique))
const x = d3.scaleBand(props.datum.map(props.axisX).filter(onlyUnique),[0, 2 * Math.PI]);
const y = d3.scaleLinear().range([innerRadius, outerRadius]).domain([d3.min(props.datum, props.getVal), d3.max(props.datum, props.getVal)]);
const line = d3.lineRadial().curve(d3.curveLinearClosed).angle(d => x(props.axisX(d)));
const lines = col => line.radius(d => y(props.getVal(d)))(props.datum.filter(x=>col==props.axisColor(x)))
const getArcPath = ([prev, next]) => `M${d3.pointRadial(x(prev), textRadius)}A${textRadius},${textRadius} 0,0,1 ${d3.pointRadial(x(next), textRadius)}`
const getAxisPath = d => `M${d3.pointRadial(x(d), innerRadius)}L${d3.pointRadial(x(d), outerRadius)}`
const getLegendY = (_,i) => i*50
function getRange(key:string) {
  const lst = x.domain();
  const index = lst.indexOf(key);
  return [
    (index >= 1 && index < lst.length+1)?lst[index-1]:lst[lst.length-1],
    (index >= 0 && index < lst.length-1)?lst[index+1]:lst[0]
  ];
}

onMounted(() => {
    const svg = d3.select(svgRoot.value);
    svg.select(".axis").selectAll("path").data(x.domain()).join("path").attr("d", getAxisPath);
    svg.select(".names").selectAll("g").data(x.domain().map(d=>{return{name:d, id: uid("radialLine")}})).join("g")
      .call(g => g.append("path").attr("fill", "none").attr("id", d => d.id.id).datum(d => getRange(d.name)).attr("d", getArcPath))
      .call(g => g.append("text").append("textPath").attr("startOffset", "50%").attr("xlink:href", d => d.id.href).text(d=>d.name));
    svg.select(".circles").selectAll("circle").data(y.ticks(4)).join("circle").attr("r", y);
    svg.select(".ticks").selectAll("g").data(y.ticks(4)).join("g")
      .append("text").text((x) => `${x.toFixed(0)}`).attr("y", d => -y(d)+20).clone(true).attr("y", d => y(d)-5);
    svg.select(".legendBox").selectAll("rect").data(color.domain()).join("rect")
      .attr("rx",5).attr("ry",5).attr("width",10).attr("height",30).attr("fill", color).attr("y",getLegendY);
    svg.select(".legendText").selectAll("text").data(color.domain()).join("text")
      .text(d=>d).attr("y",getLegendY);
    svg.select(".lines").selectAll("path").data(color.domain()).join("path")
      .attr("stroke",color).attr("d", lines);
})
</script>
<template>
  <svg ref="svgRoot" :viewBox="[-((options.width-options.marginLegend) / 2),-(options.height / 2),options.width,options.height]" :width="options.width" :height="options.height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 20px sans-serif;">
    <g class="lines" fill="none" stroke-width="3"></g>
    <g class="circles" text-anchor="middle" fill="none" stroke="currentColor" stroke-opacity="0.2"></g>
    <g class="ticks" text-anchor="middle" dy="0.35em" stroke="#fff" stroke-width="5" fill="#000" paint-order="stroke"></g>
    <g class="axis" stroke="#000" stroke-opacity="0.2"></g>
    <g class="names" text-anchor="middle"></g>
    <g :transform="`translate(${options.height / 2 + options.margin/2},${10-25*color.domain().length})`">
      <g class="legendBox"></g>
      <g class="legendText" transform="translate(20,20)"></g>
    </g>
  </svg>
</template>
