<script setup lang="ts">
import { ref } from 'vue'
const show_filter = ref(false)
const filter = ref('')
const emit = defineEmits(['setup','refresh','create'])
emit('setup', filter)
withDefaults(defineProps<{
  title: string
  itemtype: string
  usecreate: boolean
}>(), {
  usecreate: true
});
</script>
<template>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        {{ title }}
        <q-btn-group push class="float-right text-capitalize shadow-3">
          <q-input v-if="show_filter" v-model="filter" filled borderless dense debounce="300" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-btn icon="filter_list" @click="show_filter=!show_filter">
            <q-tooltip>Show filter</q-tooltip>
          </q-btn>
          <q-btn icon="refresh" @click="console.log(filter);$emit('refresh')">
            <q-tooltip>Refresh data</q-tooltip>
          </q-btn>
          <q-btn v-if="usecreate == true" label="Add" color="positive" icon="add" @click="$emit('create')">
            <q-tooltip>Create a new {{ itemtype }}</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
    </q-card-section>
</template>