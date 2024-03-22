<script setup lang="ts">
const {chartSizeOptions,chartMarginOptions, HierarchyObject} = await import("../../libs/core")
import { ref, onMounted } from 'vue';
const {getSizeOptions,getMarginOptions} = await import("./commonTools")

const props = defineProps<{
    options?: chartSizeOptions&chartMarginOptions
    data: HierarchyObject
    childrens?: Array<HierarchyObject>
    parents?: Array<HierarchyObject>
    users?: Array<HierarchyObject>
    useds?: Array<HierarchyObject>
    providers?: Array<HierarchyObject>
    provideds?: Array<HierarchyObject>
}>();
const itemDim = {
    height: 20,
    width: 100,
    margin: 5
};
const counts = {
    data: props.data.items.length,
    parents: props.parents?props.parents.reduce((acc,cur)=>Math.max(acc,cur.items.length),0):0,
    childrens: props.childrens?props.childrens.reduce((acc,cur)=>Math.max(acc,cur.items.length),0):0,
    users: props.users?props.users.reduce((acc,cur)=>acc+cur.items.length,0):0,
    useds: props.useds?props.useds.reduce((acc,cur)=>acc+cur.items.length,0):0,
    providers: props.users?props.users.reduce((acc,cur)=>acc+cur.items.length,0):0,
    provideds: props.users?props.users.reduce((acc,cur)=>acc+cur.items.length,0):0,
};
const columns = {
    left: counts.provideds+counts.users,
    middle: counts.data+counts.childrens+counts.parents,
    right: counts.providers+counts.useds
}
console.log(props.data)
const defaultHeight = (itemDim.height+itemDim.margin)*Math.max(columns.left,columns.middle,columns.right);
const defaultWidth = 16*defaultHeight/9;

const options = ref({...getSizeOptions(defaultWidth, defaultHeight, props.options),...getMarginOptions(10,10,props.options)})

onMounted(() => {
});
</script>
<template>
  <svg ref="svgRoot" :width="options.width" :height="options.height" :viewBox="[0, 0, options.width, options.height]" style="width: 100%; height: auto; font: 15px sans-serif;">
    <g>
        <rect x="0" y="0" width="100" height="30" rx="15" ry="15" stroke="green" stroke-width="3" fill="red" />
    </g>
    <g v-if="childrens">
    </g>
    <g v-if="parents">
    </g>
    <g v-if="users">
    </g>
    <g v-if="useds">
    </g>
    <g v-if="providers">
    </g>
    <g v-if="provideds">
    </g>
  </svg>
</template>
