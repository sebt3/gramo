<script setup lang="ts">
// noGramoGenerator
defineEmits(['refresh']);
withDefaults(defineProps<{model: object, deletor?:any, useAction?:boolean}>(),{
  deletor: ()=>null,
  useAction: false,
});
</script>
<template>
  <q-card bordered class="q-ma-sm">
    <q-card-section class="bg-teal text-grey-2">
      <div class="text-h6 q-mt-none q-mb-none q-pt-none q-pb-none">{{ $t('vynil.cat') }}
      </div>
    </q-card-section>
    <q-card-section  class="bg-teal-2">
        <q-field label="Name" stack-label borderless>
        <template v-slot:prepend><q-icon name="smart_button" /></template>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">{{ model.name }}</div>
        </template>
      </q-field>
    </q-card-section>
  </q-card>
</template>
