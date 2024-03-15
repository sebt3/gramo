<script setup lang="ts">
defineEmits(['refresh','on-delete']);
const props=withDefaults(defineProps<{model: object[], parent?:object, useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
console.log('AdviceList',props.model)
</script>
<template>
<div></div>
</template>
<style scoped>
</style>