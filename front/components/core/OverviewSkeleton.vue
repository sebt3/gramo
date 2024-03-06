<script setup lang="ts">
withDefaults(defineProps<{useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean, showKind?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
  showKind: true,
});
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section class="text-center text-white">
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none"><q-skeleton type="text" /></div>
    </q-card-section>
    <q-card-section class="text-center">
      <q-skeleton type="circle" size="200px" />
    </q-card-section>
  </q-card>
</template>
