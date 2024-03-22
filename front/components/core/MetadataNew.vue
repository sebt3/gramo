<script setup lang="ts">
const { ref, watch } = await import('vue')
const { useNavigationStoreRef } = await import('../../stores/navigation.js');
const { i18n } = await import("../../libs/i18n")
const emit = defineEmits(['update:name'])
const props = withDefaults(defineProps<{
  namespaced?: boolean
  name?: string
}>(),{
  namespaced: true
});
const navigation = useNavigationStoreRef();
const name = ref(props.name!=undefined?props.name:"")
const nameRules = [
  val => !!val || 'Name is required',
  val => val.toLowerCase() == val || 'Name should be all lowercase',
  val => !val.includes('_') || 'Name should not include underscores',
];
watch(name,(newValue) => emit('update:name', newValue))
</script>
<template>
  <div class="q-gutter-md">
    <q-input v-model="name" :label="i18n.global.t('meta.name')" :rules="nameRules" />
    <div v-if="props.namespaced">
      <q-field :label="i18n.global.t('meta.namespace')" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ navigation.currentNamespace.value }}</div>
          </template>
        </q-field>
    </div>
  </div>
</template>
