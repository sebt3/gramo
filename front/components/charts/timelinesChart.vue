<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
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
const marginBottom = 30+30;
const marginLeft = 40;
const defaultHeight = 200;
const defaultWidth = 800;
const marginOptions = getMarginOptions(10,10,props.options);
const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...marginOptions})
const svgRoot = ref(null);
const data = computed(() => props.datum.map(d=>{return {date: props.axisTime(d),key:props.axisColor(d),value:props.getVal(d)}}).sort((a,b)=>a.date<b.date?-1:1))
const series = computed(()=>d3.groups(data.value, d => d.key))
const x = d3.scaleUtc().domain(d3.extent(data.value, d => d.date)).range([marginLeft, options.value.width - marginRight]);
const y = d3.scaleLinear().domain([0, d3.max(data.value, d => d.value)]).rangeRound([options.value.height - marginBottom, marginTop]);
const color = d3.scaleOrdinal().domain(series.value.map(d=>d[0])).range(d3.schemeCategory10).unknown("#ccc");
//const area = d3.area().x(d => x(d.data[0])).y0(d => y(d[0])).y1(d => y(d[1]));
const line = d3.line().x(d => x(d.date)).y(d => y(d.value));
const moveBar = (bar, date) => {
  const loc = x(date)
  const middle = (y.domain()[0]+y.domain()[1])/2
  if (loc<marginLeft || loc>options.value.width - marginRight) { bar.attr('visibility','hidden'); return; }
  bar.attr('transform',`translate(${loc}, 0)`).attr('visibility','visible')
  series.value.forEach(([cl,values]) => {
    const found = values.reduce((res,cur)=>Math.abs(date-res.date)>Math.abs(date-cur.date)?cur:res,{date:new Date(0)})
    bar.select(`circle.${cl.replace(/ /g, '-')}`).attr('cy',y(found.value))
    bar.select(`text.${cl.replace(/ /g, '-')}`).attr('y',y(found.value)+((found.value<middle)?-10:10)).text(found.value)
  });
}
onMounted(() => {
  const svg = d3.select(svgRoot.value);
  svg.select(".axisLeft").call(d3.axisLeft(y).ticks(options.value.height / 20))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone().attr("x2", options.value.width - marginLeft - marginRight).attr("stroke-opacity", 0.1))
      .call(g => g.append("text").attr("x", -marginLeft).attr("y", 10).attr("fill", "currentColor").attr("text-anchor", "start").text(props.title));
  svg.select(".axisBottom").call(d3.axisBottom(x).ticks(options.value.width / 80));
  svg.on("mousemove touchmove", function(event) {
    moveBar(svg.select('.bar'), x.invert(d3.pointer(event, this)[0]));
    event.preventDefault();
  });
})
watch(data, () => {
  x.domain(d3.extent(data.value, d => d.date))
  y.domain([0, d3.max(data.value, d => d.value)])
  color.domain(series.value.map(d=>d[0]))
},{ deep: true });
const legendLength=options.value.width/4;
const modulo=Math.floor(options.value.width/legendLength)
</script>
<template>
  <svg ref="svgRoot" :viewBox="[0,0,options.width,options.height]" :width="options.width" :height="options.height" style="width: 100%; height: auto; font: 8px sans-serif;">
    <g class="lines">
      <path v-for="d in series" :key="d[0]" :stroke="color(d[0])" :d="line(d[1])" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" fill="none">
        <title>{{ d[0] }}</title>
      </path>
    </g>
    <g class="bar" visibility="hidden">
      <line :y1="options.height" :y2="0" stroke="black" stroke-opacity="0.2"></line>
      <circle v-for="d in series" :key="d[0]" :fill="color(d[0])" r="3" cx="0" :class="d[0].replace(/ /g, '-')" />
      <text v-for="d in series" :key="d[0]" :fill="color(d[0])" x="0" y="30" :class="d[0].replace(/ /g, '-')" />
    </g>
    <g :transform="`translate(0,${options.height - marginBottom})`" ><g class="axisBottom" /></g>
    <g :transform="`translate(${marginLeft}, 0)`"><g class="axisLeft" /></g>
    <g :transform="`translate(${marginLeft},${options.height-marginBottom/2})`">
      <g class="legendBox">
        <rect v-for="(d, idx) in series" :key="d[0]" :ry="3" :rx="2" width="8" height="10" :x="(idx % modulo)*legendLength" :y="Math.floor(idx/modulo)*20" :fill="color(d[0])"></rect>
      </g>
      <g class="legendText" transform="translate(10,8)">
        <text v-for="(d, idx) in series" :key="d[0]" :x="(idx % modulo)*legendLength" :y="Math.floor(idx/modulo)*20">{{ d[0] }}</text>
      </g>
    </g>
  </svg>
</template>
