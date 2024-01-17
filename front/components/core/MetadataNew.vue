<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNavigationStoreRef } from '../../stores';
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
    <q-input v-model="name" label="Name" :rules="nameRules" />
    <div v-if="props.namespaced">
      <q-field label="Namespace" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ navigation.currentNamespace.value }}</div>
          </template>
        </q-field>
    </div>
  </div>
</template>
