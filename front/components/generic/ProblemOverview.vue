<script setup lang="ts">
const { defineAsyncComponent, ref } = await import('vue')
const {chartSizeOptions,chartMarginOptions} = await import("../../libs/core")
const pieChart = defineAsyncComponent(() => import( '@/components/charts/pieChart.vue'));
const stackedBarChart = defineAsyncComponent(() => import( '@/components/charts/stackedBarChart.vue'));
const { useQuasar } = await import("quasar")
const $q = useQuasar()
const {onlyUnique} = await import("@/components/charts/commonTools.js")
const props=withDefaults(defineProps<{model: object[], short: string, to?: (string) =>null, useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean, options?: chartSizeOptions&chartMarginOptions}>(),{
  to: () => null,
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
const problemlist = props.model.map(o=>o.getcoreProblem.map(p=>{ return {namespace: o.metadata.namespace, source: p.source}})).flat()
const problems = ref(problemlist.map(p=>p.namespace).filter(onlyUnique).map(namespace=>problemlist.map(p=>p.source).filter(onlyUnique).map(source=>{return {namespace, source, value: problemlist.filter(p=>p.namespace==namespace&&p.source==source).length}})).flat().filter(p=>p.value>0))
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section class="text-center text-white bg-negative">
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.namespace).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length>1">{{ $t('dashboard.problemPerNamespaceSource', {short}) }}</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.namespace).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length>1">{{ $t('dashboard.problemPerSource', {short}) }}</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.namespace).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length<2">{{ $t('dashboard.problemPerNamespace', {short}) }}</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="problems.map(p=>p.namespace).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length<2">{{ $t('dashboard.problemShort', {short}) }}</div>
    </q-card-section>
    <q-card-section :class="`text-center bg-red-${$q.dark.isActive?'10':'2'}`">
      <stackedBarChart v-if="problems.map(p=>p.namespace).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length>1" :options="options"
        v-model:datum="problems" :axisX="function (d){return d!=undefined?d['source']:this.id}" :axisColor="function (d){return d!=undefined?d['namespace']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" />
      <pieChart v-if="problems.map(p=>p.namespace).filter(onlyUnique).length>1 && problems.map(p=>p.source).filter(onlyUnique).length<2" :options="options"
        :datum="problems.map(p=>{ return { name: p.namespace, value: p.value } })"
        @on-click="(name)=>{to(name)}" />
      <pieChart v-if="problems.map(p=>p.namespace).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length>1" :options="options"
        :datum="problems.map(p=>{ return { name: p.source, value: p.value } })" />
      <stackedBarChart v-if="problems.map(p=>p.namespace).filter(onlyUnique).length<2 && problems.map(p=>p.source).filter(onlyUnique).length<2" :options="options"
        v-model:datum="problems" :axisX="function (d){return d!=undefined?d['namespace']:this.id}" :axisColor="function (d){return d!=undefined?d['source']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" />
    </q-card-section>
  </q-card>
</template>
