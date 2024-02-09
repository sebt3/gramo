<script setup lang="ts">
import { ref } from 'vue'
const show_filter = ref(false)
defineEmits(['update:modelFilter','refresh','create'])
withDefaults(defineProps<{
  title: string
  itemtype: string
  modelFilter: string
  usecreate?: boolean
  userefresh?: boolean
  icon?:string
}>(), {
  usecreate: true,
  userefresh: true
});
</script>
<template>
    <q-card-section>
      <div class="text-subtitle1 text-white">
        <q-icon :name="icon" v-if="icon" class="q-mr-sm" />
        {{ title }}
        <q-btn-group push class="float-right text-capitalize shadow-3">
          <q-input v-if="show_filter" :model-value="modelFilter" @update:model-value="v=>$emit('update:modelFilter', v)" filled borderless dense debounce="300" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn icon="filter_list" @click="show_filter=!show_filter">
            <q-tooltip>Show filter</q-tooltip>
          </q-btn>
          <q-btn v-if="userefresh == true" icon="refresh" @click="console.log(modelFilter);$emit('refresh')">
            <q-tooltip>Refresh data</q-tooltip>
          </q-btn>
          <q-btn v-if="usecreate == true" label="Add" color="positive" icon="add" @click="$emit('create')">
            <q-tooltip>Create a new {{ itemtype }}</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
    </q-card-section>
</template>