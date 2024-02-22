<script setup lang="ts">
import { watch,ref } from 'vue';

defineEmits(['refresh','on-delete']);
const props=withDefaults(defineProps<{model: object[], useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
console.log('EventList',props.model)
</script>
<template>
  <q-timeline dense>
    <TransitionGroup enterActiveClass="animate__animated animate__backInRight" leaveActiveClass="animate__animated animate__backOutDown">
      <q-timeline-entry v-for="(item,num) in props.model" v-bind:key="`${item['metadata']['uid']}-${item['involvedObject']['uid']}`"
        :title="`${item['involvedObject']['name']} ${item['reason']}`"
        :subtitle="`${(new Date(item['metadata']['creationTimestamp'])).toLocaleTimeString()} ${showKind?item['involvedObject']['kind']:''} ${showNamespace?item['involvedObject']['namespace']:''} ${item['involvedObject']['name']}`"
        :color="item['type']=='Warning'?'warning':'secondary'"
        :icon="item['type']=='Warning'?'warning_amber':undefined"
        :body="item['message']"
      />
    </TransitionGroup>
  </q-timeline>
</template>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
}
</style>