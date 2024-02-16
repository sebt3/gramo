<script setup lang="ts">
import OpenApiNamedIcon from './OpenApiNamedIcon.vue';
import { elude } from "../../libs/core/"
import { ref, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
  name: string
  data: string|null|number|undefined
  defaultdata?: string,
  description?: string,
  readOnly?: boolean,
  useDelete?: boolean,
}>(), {
  readOnly: false,
  useDelete: false,
});
const max_len=150;
const value=ref(props.data)
const emit = defineEmits(['update:data', 'delete'])
watch(value,(newValue) => emit('update:data', newValue))
const isDefault=computed(() => value.value == props.defaultdata || (props.defaultdata ==undefined && value.value == null))
</script>
<template>
  <div v-if="readOnly">
    <q-field :label="name" stack-label borderless :label-color="isDefault?'':'secondary'">
    <template v-slot:prepend>
      <OpenApiNamedIcon :name="name" :is-default="isDefault" />
    </template>
    <template v-slot:control>
      <div class="self-center full-width no-outline" v-if="typeof value ==='string' && value.includes('\n')"><pre>{{ value }}</pre></div>
      <div class="self-center full-width no-outline" v-else-if="value!=null">{{ value }}</div>
    </template>
  </q-field>
  </div>
  <div v-else>
    <q-input v-model="value" :bottom-slots="description?true:false" :label="name" autogrow :placeholder="defaultdata" :label-color="isDefault?'':'secondary'" :type="(typeof value ==='string' && value.includes('\n'))?'textarea':'text'">
      <template v-slot:hint v-if="description">
        <div>{{ description?elude(description,max_len):'---' }}<q-tooltip v-if="description&&description.length>max_len"><div v-html="description.replaceAll('\n','<br>')"></div></q-tooltip></div>
      </template>
      <template v-slot:prepend>
        <OpenApiNamedIcon :name="name" :is-default="isDefault" v-if="!useDelete" />
        <q-btn icon="delete" flat
            @click="$emit('delete', name)"
            v-else>
            <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </template>
    </q-input>
  </div>
</template>
