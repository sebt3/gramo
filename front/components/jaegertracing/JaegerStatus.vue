<script setup lang="ts">
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
defineProps<{model: object}>();
</script>
<template>
  <q-card bordered v-if="model.status != null" class="q-ma-sm">
    <q-card-section>
      <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
    </q-card-section>
    <q-card-section>
      <DefaultStatusView :status="model.status" />
    </q-card-section>
  </q-card>
</template>
