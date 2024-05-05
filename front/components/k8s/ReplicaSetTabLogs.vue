<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  model: object
}>();
const logViewTab = ref((
  props.model.childk8sPod != undefined && props.model.childk8sPod.filter(x=>x!=undefined).map(pod=>pod.childcoreContainer.filter(c=>!c.init)).flat().length>0)?props.model.childk8sPod.filter(x=>x!=undefined).map(pod=>pod.childcoreContainer.filter(c=>!c.init)).flat()[0].name
  :'none')
const logViewSplitterModel= ref(20)
</script>
<template>
  <q-splitter v-model="logViewSplitterModel" style="height: 250px" >
    <template v-slot:before>
      <q-tabs v-model="logViewTab" vertical class="text-teal" switch-indicator active-color="primary">
        <q-tab v-for="prop in props.model.childk8sPod.filter(x=>x!=undefined).map(pod=>pod.childcoreContainer.filter(c=>!c.init||['Job','ReplicaSet','DaemonSet','StatefulSet'].includes(props.short))).flat()" v-bind:key="prop.name" :name="prop.name" :label="prop.name" />
      </q-tabs>
    </template>
    <template v-slot:after>
      <q-tab-panels v-model="logViewTab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel  v-for="prop in props.model.childk8sPod.filter(x=>x!=undefined).map(pod=>pod.childcoreContainer).flat()" v-bind:key="prop.name"  :name="prop.name"  class="bg-black text-white">
          <pre v-if="prop.getcoreLog != undefined && Array.isArray(prop.getcoreLog.lines)">
{{ prop.getcoreLog.lines.join('\n') }}
          </pre>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>
