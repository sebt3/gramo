<script setup lang="ts">
import { ref } from 'vue'
import { useNavigationStore } from '../../stores'
const navigation = useNavigationStore()
const options = ref([
  {label: 'off', value: undefined},
  {label: '2s', value: 2000},
  {label: '10s', value: 10000},
  {label: '1m', value: 60000},
  {label: '2m', value: 120000},
  {label: '5m', value: 60000},
]);
const model = ref(options.value[0])
function onRefreshChange() {
  navigation.setPoolInterval(model.value.value)
}
navigation.setPoolInterval(model.value.value)
</script>
<template>
  <q-select
    v-model="model"
    @update:model-value="onRefreshChange"
    :options="options" standout>
    <template v-slot:prepend>
      <q-icon name="refresh" />
    </template>
  </q-select>
</template>
