<script setup lang="ts">
// noGramoGenerator
import { defineAsyncComponent } from 'vue'
const  TableHeader   = defineAsyncComponent(() => import( '@/components/core/TableHeader.vue'));
import { QTableColumn } from 'quasar'
import { ref, useCore, tableColumnAlign } from '../../libs/core'
import { i18n } from "../../libs/i18n"
const { pagination } = useCore();
const DistribColumns:Array<QTableColumn> = [
  {name: 'Name', label: i18n.global.t('meta.name'), field: row => row.metadata.name, sortable: true, align: tableColumnAlign.left}
] as QTableColumn[];
const filter = ref('');
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
