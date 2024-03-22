<script setup lang="ts">
const { defineAsyncComponent, ref } = await import('vue')
const { useQuasar } = await import("quasar")
const $q = useQuasar()
const {onlyUnique} = await import("@/components/charts/commonTools.js")
const props=withDefaults(defineProps<{model: object[], short: string, to: (string) =>null, useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
const advicelist = props.model.map(o=>o.getcoreadvice.map(p=>{ return {namespace: o.metadata.namespace, source: p.source}})).flat()
const advices = ref(advicelist.map(p=>p.namespace).filter(onlyUnique).map(namespace=>advicelist.map(p=>p.source).filter(onlyUnique).map(source=>{return {namespace, source, value: advicelist.filter(p=>p.namespace==namespace&&p.source==source).length}})).flat().filter(p=>p.value>0))
const pieChart        = defineAsyncComponent(() => import( '@/components/charts/pieChart.vue'));
const stackedBarChart = defineAsyncComponent(() => import( '@/components/charts/stackedBarChart.vue'));
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section class="text-center text-white bg-warning">
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="advices.map(p=>p.namespace).filter(onlyUnique).length>1 && advices.map(p=>p.source).filter(onlyUnique).length>1">{{ $t('dashboard.advicePerNamespaceSource', {short}) }}</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="advices.map(p=>p.namespace).filter(onlyUnique).length<2 && advices.map(p=>p.source).filter(onlyUnique).length>1">{{ $t('dashboard.advicePerSource', {short}) }}</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="advices.map(p=>p.namespace).filter(onlyUnique).length>1 && advices.map(p=>p.source).filter(onlyUnique).length<2">{{ $t('dashboard.advicePerNamespace', {short}) }}</div>
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none" v-if="advices.map(p=>p.namespace).filter(onlyUnique).length<2 && advices.map(p=>p.source).filter(onlyUnique).length<2">{{ $t('dashboard.adviceShort', {short}) }}</div>
    </q-card-section>
    <q-card-section :class="`text-center bg-amber-${$q.dark.isActive?'10':'2'}`">
      <stackedBarChart v-if="advices.map(p=>p.namespace).filter(onlyUnique).length>1 && advices.map(p=>p.source).filter(onlyUnique).length>1"
        v-model:datum="advices" :axisX="function (d){return d!=undefined?d['source']:this.id}" :axisColor="function (d){return d!=undefined?d['namespace']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" />
      <pieChart v-if="advices.map(p=>p.namespace).filter(onlyUnique).length>1 && advices.map(p=>p.source).filter(onlyUnique).length<2"
        :datum="advices.map(p=>{ return { name: p.namespace, value: p.value } })"
        @on-click="(name)=>{to(name)}" />
      <pieChart v-if="advices.map(p=>p.namespace).filter(onlyUnique).length<2 && advices.map(p=>p.source).filter(onlyUnique).length>1"
        :datum="advices.map(p=>{ return { name: p.source, value: p.value } })" />
      <stackedBarChart v-if="advices.map(p=>p.namespace).filter(onlyUnique).length<2 && advices.map(p=>p.source).filter(onlyUnique).length<2"
        v-model:datum="advices" :axisX="function (d){return d!=undefined?d['namespace']:this.id}" :axisColor="function (d){return d!=undefined?d['source']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" />
    </q-card-section>
  </q-card>
</template>
