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
const innerRadius = options.value.margin*5/4;
const textRadius = outerRadius*1.02;
const series = d3.stack().keys(d3.union(props.datum.map(props.axisColor))).value(([, D], key) => props.getVal(D.get(key)))(d3.index(props.datum, props.axisX, props.axisColor));
const color = d3.scaleOrdinal(d3.schemeCategory10).domain(props.datum.map(props.axisColor).filter(onlyUnique))
const x = d3.scaleBand(props.datum.map(props.axisX).filter(onlyUnique),[0, 2 * Math.PI]);
const y = d3.scaleLinear().range([innerRadius, outerRadius]).domain([0, d3.max(series, d => d3.max(d, d => d[1]))]);
const coord = d => d3.pointRadial(x(d.data[0]),y((d[0])+((d[1]-d[0])/2)));
const area = d3.areaRadial().curve(d3.curveLinearClosed).angle(d => x(d.data[0])).innerRadius(d => y(d[0])).outerRadius(d => y(d[1]))
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
    const mouseEnter = (_,d)=>{
      svg.select(`.areas path#${d}Area`).transition().duration('200').attr('fill-opacity', "1.0");
      svg.select(`.legendValues g#${d}LegendValues`).attr('visibility','visible');
      svg.select(`.legendText text#${d}Text`).style('font-weight', 'bold');
    }
    const mouseLeave = (_,d)=>{
      svg.select(`.areas path#${d}Area`).transition().duration('70').attr('fill-opacity', "0.5");
      svg.select(`.legendValues g#${d}LegendValues`).attr('visibility','hidden');
      svg.select(`.legendText text#${d}Text`).style('font-weight', 'normal');
    }
    svg.select(".axis").selectAll("path").data(x.domain()).join("path").attr("d", getAxisPath);
    svg.select(".names").selectAll("g").data(x.domain().map(d=>{return{name:d, id: uid("radialStackedArea")}})).join("g")
      .call(g => g.append("path").attr("fill", "none").attr("id", d => d.id.id).datum(d => getRange(d.name)).attr("d", getArcPath))
      .call(g => g.append("text").append("textPath").attr("startOffset", "50%").attr("xlink:href", d => d.id.href).text(d=>`${d.name}: ${props.datum.filter(l=>props.axisX(l)==d.name).reduce((res,cur)=>res+props.getVal(cur),0)}`));
    svg.select(".circles").selectAll("circle").data(y.ticks(4)).join("circle").attr("r", y);
    svg.select(".ticks").selectAll("g").data(y.ticks(4)).join("g")
      .append("text").text((x) => `${x.toFixed(0)}`).attr("y", d => -y(d)+20).clone(true).attr("y", d => y(d)-5);
    svg.select(".legendBox").selectAll("g").data(color.domain()).join("g").attr('transform',(d,i)=>`translate(0,${getLegendY(d,i)})`,)
      .attr('id',d=> `${d}Box`).on('mouseenter',mouseEnter).on('mouseleave',mouseLeave)
      .call(g => g.append("rect").attr("rx",5).attr("ry",5).attr("width",35).attr("height",30).attr("fill", color))
      .call(g => g.append("text").text(d=>`${props.datum.filter(l=>d==props.axisColor(l)).reduce((res,cur)=>res+props.getVal(cur),0)}`)
                .attr("x",5).attr('y',23).attr('stroke','#fff').attr('stroke-width','2'));
    svg.select(".legendText").selectAll("text").data(color.domain()).join("text").text(d=>d).attr("y",getLegendY)
      .attr('id',d=> `${d}Text`).on('mouseenter',mouseEnter).on('mouseleave',mouseLeave);
    svg.select(".areas").selectAll("path").data(series).join("path").attr("fill", d => color(d.key)).attr("d", d=> area(d))
      .attr('id',d=> `${d.key}Area`).on('mouseenter',(evt,d)=>mouseEnter(evt,d.key)).on('mouseleave',(evt,d)=>mouseLeave(evt,d.key));
    svg.select(".legendValues").selectAll("g").data(series).join("g").attr('id',d=> `${d.key}LegendValues`).attr("fill", d => color(d.key))
      .selectAll("text").data(d=>d).join("text").text(d=>d[1]-d[0]).attr("x", d => coord(d)[0]).attr("y", d => coord(d)[1])
})
</script>
<template>
  <svg ref="svgRoot" :viewBox="[-((options.width-options.marginLegend) / 2),-(options.height / 2),options.width,options.height]" :width="options.width" :height="options.height" stroke-linejoin="round" stroke-linecap="round" style="width: 100%; height: auto; font: 20px sans-serif;">
    <g class="axis" stroke="#000" stroke-opacity="0.2"></g>
    <g class="names" text-anchor="middle"></g>
    <g :transform="`translate(${options.height / 2 + options.margin/2},${10-25*color.domain().length})`">
      <g class="legendBox"></g>
      <g class="legendText" transform="translate(40,20)"></g>
    </g>
    <g class="areas" fill-opacity="0.5"></g>
    <g class="circles" text-anchor="middle" fill="none" stroke="currentColor" stroke-opacity="0.2"></g>
    <g class="ticks" text-anchor="middle" dy="0.35em" stroke="#fff" stroke-width="3" fill="#000" paint-order="stroke"></g>
    <g class="legendValues" text-anchor="middle" visibility="hidden" alignment-baseline="middle" dy="0.35em" stroke="#fff" stroke-width="3" fill="#000" paint-order="stroke"></g>
  </svg>
</template>
