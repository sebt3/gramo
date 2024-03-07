<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import {chartSizeOptions,chartMarginOptions} from "../../libs/core"
const pieChart = defineAsyncComponent(() => import( '@/components/charts/pieChart.vue'));
const stackedBarChart = defineAsyncComponent(() => import( '@/components/charts/stackedBarChart.vue'));
import { useQuasar } from 'quasar'
const $q = useQuasar()
import {onlyUnique} from "@/components/charts/commonTools.js"
const props=withDefaults(defineProps<{model: {short:string,source:string}[], short: string, useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean, options?: chartSizeOptions&chartMarginOptions}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
const problems = ref(props.model.map(p=>p.short).filter(onlyUnique).map(short=>props.model.map(p=>p.source).filter(onlyUnique).map(source=>{return {short, source, value: props.model.filter(p=>p.short==short&&p.source==source).length}})).flat().filter(p=>p.value>0))
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section class="text-center text-white bg-negative">
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.short).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length>1">{{ short }} problems distribution per object type and sources</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.short).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length>1">{{ short }} problems per sources</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.short).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length<2">{{ short }} problems per object type</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.short).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length<2">{{ short }} problems</div>
    </q-card-section>
    <q-card-section :class="`text-center bg-red-${$q.dark.isActive?'10':'2'}`">
      <stackedBarChart v-if="problems.map(p=>p.short).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length>1" :options="options"
        v-model:datum="problems" :axisX="function (d){return d!=undefined?d['short']:this.id}" :axisColor="function (d){return d!=undefined?d['source']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" />
      <pieChart v-if="problems.map(p=>p.short).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length<2"  :options="options"
        :datum="problems.map(p=>{ return { name: p.short, value: p.value } })"
        @on-click="(name)=>{to(name)}" />
      <pieChart v-if="problems.map(p=>p.short).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length>1"  :options="options"
        :datum="problems.map(p=>{ return { name: p.source, value: p.value } })" />
      <stackedBarChart v-if="problems.map(p=>p.short).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length<2"  :options="options"
        v-model:datum="problems" :axisX="function (d){return d!=undefined?d['short']:this.id}" :axisColor="function (d){return d!=undefined?d['source']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" />
    </q-card-section>
  </q-card>
</template>
