<script setup lang="ts">
const props = withDefaults(defineProps<{model: object, group:string, short:string, useActions?:boolean, showLink?:boolean, showLabels?:boolean, showStatus?: boolean, origin?:string}>(), {
  useActions: false,
  showLabels: false,
  showStatus: true,
  showLink: true,
});
const { defineAsyncComponent, elude } = await import("../../libs/core/")
const { loader } = await import("../../libs/core/importer")
const { colorItem, extraColumns } = await loader(props.group,props.short)
const { useQuasar } = await import("quasar")
const $q = useQuasar()
const OpenApiNamedIcon = defineAsyncComponent(() => import( '@/components/openapi/OpenApiNamedIcon.vue'));
</script>
<template>
  <q-card bordered class="q-ma-sm" v-if="model.status != null">
    <q-card-section :class="`bg-${ colorItem } text-white`">
      <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none">{{ $t('core.highlight') }}</div>
    </q-card-section>
    <q-card-section  :class="`bg-${ colorItem }-${$q.dark.isActive?'10':'2'}`">
      <div class="q-gutter-md">
      <q-field label="Problems" stack-label borderless v-if="Array.isArray(model.getcoreProblem) && model.getcoreProblem.length>0">
        <template v-slot:prepend><q-icon name="error" /></template>
        <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
          <q-chip v-for="problem in model.getcoreProblem" v-bind:key="problem" class="glossy" color="negative" text-color="white" icon="error">{{ elude(problem.description, 100) }}<q-tooltip>{{ problem.description }}</q-tooltip></q-chip>
        </div></template>
      </q-field>
      <div class="row" v-if="extraColumns.filter(c=>![null,undefined,''].includes(c.field(model))).length>0">
        <div :class="`col-md-${extraColumns.filter(c=>![null,undefined,''].includes(c.field(model))).length<4?12/extraColumns.filter(c=>![null,undefined,''].includes(c.field(model))).length:3}`" v-for="extra in extraColumns.filter(c=>![null,undefined,''].includes(c.field(model)))" :key="extra.label">
          <q-field stack-label borderless  :label="extra.label">
            <template v-slot:prepend><OpenApiNamedIcon :name="extra.name" /></template>
            <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
              <div class="self-center full-width no-outline">{{ extra.field(model) }}</div>
            </div></template>
          </q-field>
        </div>
      </div>
      </div>
    </q-card-section>
  </q-card>
</template>
