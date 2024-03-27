<script setup lang="ts">
defineEmits(['refresh','on-delete']);
const props=withDefaults(defineProps<{model: {namespace:string, name:string, pod_name:string,data:object[]}[], parent?:object, useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
});
const { cpuValue, memValue } = await import("../charts/commonTools")
const { colorPod } = await import('../../libs/k8s/custom.js')
const { computed, defineAsyncComponent } = await import('vue')
const { i18n } = await import("../../libs/i18n")
const dataModel = computed(()=>props.model.map(c=>c.data.map(d=>{return {...d,name:c.name}})).flat())
const timelinesChart = defineAsyncComponent(() => import( '../charts/timelinesChart.vue'));
</script>
<template>
  <q-card bordered class="q-ma-sm"  :class="`bg-${ colorPod }-${$q.dark.isActive?'10':'1'} row`">
    <div class="col-md-6">
      <timelinesChart :title="i18n.global.t('container.cpu')" :datum="dataModel" :axisColor="d=>d.name" :getVal="d=>cpuValue(d.cpu)" />
    </div>
    <div class="col-md-6">
      <timelinesChart :title="i18n.global.t('container.memory')" :datum="dataModel" :axisColor="d=>d.name" :getVal="d=>memValue(d.memory)" />
    </div>
  </q-card>
</template>
