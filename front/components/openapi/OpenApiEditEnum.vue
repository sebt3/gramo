<script setup lang="ts">
const emit = defineEmits(['update:data', 'delete'])
const props = withDefaults(defineProps<{
  name: string
  data: string|null|undefined
  defaultdata?: string
  description?: string,
  enum: string[]
  readOnly?: boolean
}>(), {
  readOnly: false,
});
const { defineAsyncComponent, ref, computed, watch } = await import('vue')
const { elude } = await import("../../libs/core/")
const max_len   = 150;
const value     = ref(props.data)
const isDefault = computed(() => value.value == props.defaultdata || (props.defaultdata ==undefined && value.value == null))
if (!props.readOnly) watch(value, (newValue) => emit('update:data', newValue));
const OpenApiNamedIcon = defineAsyncComponent(() => import( './OpenApiNamedIcon.vue'));
</script>
<template>
  <div v-if="readOnly">
    <q-field :label="name" stack-label borderless :bottom-slots="description?true:false" :label-color="isDefault?'':'secondary'">
      <template v-slot:hint v-if="description">
        <div>{{ description?elude(description,max_len):'---' }}<q-tooltip v-if="description&&description.length>max_len"><div v-html="description.replaceAll('\n','<br>')"></div></q-tooltip></div>
      </template>
      <template v-slot:prepend>
        <OpenApiNamedIcon :name="name" :is-default="isDefault" />
      </template>
      <template v-slot:control>
        <div class="self-center full-width no-outline" v-if="value!=null && value.includes('\n')"><pre>{{ value }}</pre></div>
        <div class="self-center full-width no-outline" v-else-if="value!=null">{{ value }}</div>
      </template>
    </q-field>
  </div>
  <div v-else>
    <q-select v-model="value" :bottom-slots="description?true:false" :options="props.enum" :label="name" :label-color="isDefault?'':'secondary'">
      <template v-slot:hint v-if="description">
        <div>{{ description?elude(description,max_len):'---' }}<q-tooltip v-if="description&&description.length>max_len"><div v-html="description.replaceAll('\n','<br>')"></div></q-tooltip></div>
      </template>
      <template v-slot:prepend>
        <OpenApiNamedIcon :name="name" :is-default="isDefault" />
      </template>
    </q-select>
  </div>
</template>
