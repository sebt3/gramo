<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import vynilDistribQuery from '@/queries/vynil/DistribView.graphql'
import customResourceDefinition from '@/queries/core/CustomResourceDefinition.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import {getProperties} from '../core/openapiSetup';
import TableHeader from '../core/TableHeader.vue';
import { setupTableWidget, tableColumnAlign } from '../core/TableSetup'
const { pagination } = setupTableWidget();let filter = ref('');
const router = useRouter();
import { useNavigationStore } from '../../stores/navigation'
const navigation = storeToRefs(useNavigationStore())
import { setupItem } from '../core/itemSetup'
const { setItemFromRoute } = setupItem();setItemFromRoute();
const { result: Distrib, loading: loadingDistrib, onResult, onError } = useQuery(vynilDistribQuery, {"name": navigation.currentItem})
const { result: CRdef, loading: loadingCRD } = useQuery(customResourceDefinition, {"name": 'distribs.vynil.solidite.fr'})
onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.log('[Network error]:', networkError);
  if (graphQLErrors)console.log('[graphQL error]:', graphQLErrors);
});
onResult(res => {
  if ( !res.loading && res.data.vynilDistrib == null) {
    const matched = router.currentRoute.value.matched
    router.push({path: matched[matched.length>1?matched.length-2:matched.length-1].path,replace: true})
  }
})
const columns = [
  {name: 'Category', label: 'Category', field: row => row.category.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Name', label: 'Name', field: row => row.name, sortable: true, align: tableColumnAlign.left},
  {name: 'Description', label: 'Description', field: row => row.description, sortable: true, align: tableColumnAlign.left},
];
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <q-card bordered v-if="!loadingDistrib && Distrib.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Distrib</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="Distrib.vynilDistrib.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loadingDistrib && Distrib.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" label="Ok" color="positive" v-if="Distrib.vynilDistrib.status.errors.length==0"></q-chip>
                <q-chip class="float-right text-white text-capitalize" label="Errors" color="negative" v-if="Distrib.vynilDistrib.status.errors.length>0"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="Distrib.vynilDistrib.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in Distrib.vynilDistrib.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loadingDistrib && Distrib.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section v-if="!loadingCRD">
          <OpenApiEdit
            :in="Distrib.vynilDistrib"
            :properties="getProperties(CRdef.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-card v-if="!loadingDistrib && Distrib.vynilDistrib!=null" class="q-ma-sm">
    <q-card-section>
      <TableHeader title="Packages" v-model:model-filter="filter" itemtype='Package' :usecreate="false" :userefresh="false" />
      <q-table :rows="Distrib.vynilDistrib.packages" :columns="columns" class="no-shadow" v-model:pagination="pagination" :filter="filter" hide-bottom></q-table>
    </q-card-section>
  </q-card>
</template>
