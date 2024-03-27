<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import * as d3 from "d3";
const {chartSizeOptions,chartMarginOptions} = await import("../../libs/core")
const {getSizeOptions,getMarginOptions,onlyUnique} = await import("./commonTools")
const props = withDefaults(defineProps<{
  options?: chartSizeOptions&chartMarginOptions
  datum: Array<object>
  title: string
  axisColor: (s:object) => string
  axisTime?: (s:object) => Date
  getVal: (s:object) => number
}>(),{
  axisTime: (s) => new Date(s.timestamp)
});
const marginTop = 10;
const marginRight = 10;
const marginBottom = 30;
const marginLeft = 40;
const defaultHeight = 200;
const defaultWidth = 800;
const marginOptions = getMarginOptions(10,10,props.options);
const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...marginOptions})
const svgRoot = ref(null);
const data = computed(() => props.datum.map(d=>{return {date: props.axisTime(d),key:props.axisColor(d),value:props.getVal(d)}}).sort((a,b)=>a.date<b.date?-1:1))
console.log('series', data.value, d3.index(data.value, d=>d.date, d=>d.key))
const series = d3.stack().keys(d3.union(data.value.map(d=>d.key))).value(([, D], key) => D.get(key).value)(d3.index(data.value, d=>d.date, d=>d.key));
const x = d3.scaleUtc().domain(d3.extent(data.value, d => d.date)).range([marginLeft, options.value.width - marginRight]);
const y = d3.scaleLinear().domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).rangeRound([options.value.height - marginBottom, marginTop]);
const color = d3.scaleOrdinal().domain(series.map(d=>d.key)).range(d3.schemeCategory10).unknown("#ccc");
const area = d3.area().x(d => x(d.data[0])).y0(d => y(d[0])).y1(d => y(d[1]));
onMounted(() => {
  const svg = d3.select(svgRoot.value);
  svg.select(".axisLeft").call(d3.axisLeft(y).ticks(options.value.height / 20))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", options.value.width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(props.title));
  svg.select(".axisBottom").call(d3.axisBottom(x).ticks(options.value.width / 80));
  svg.select(".series").selectAll("path").data(series).join("path").attr("fill", d => color(d.key)).attr("d", area).append("title").text(d => d.key);
})
console.log(props)
</script>
<template>
  <svg ref="svgRoot" :viewBox="[0,0,options.width,options.height]" :width="options.width" :height="options.height" style="width: 100%; height: auto; font: 8px sans-serif;">
    <g class="series" />
    <g :transform="`translate(0,${options.height - marginBottom})`" ><g class="axisBottom" /></g>
    <g :transform="`translate(${marginLeft}, 0)`"><g class="axisLeft" /></g>
  </svg>
</template>
