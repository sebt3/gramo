<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import vynilDistribQuery from '@/queries/vynil/DistribView.graphql'
import customResourceDefinition from '@/queries/core/CustomResourceDefinition.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import {getProperties} from '../core/openapiSetup';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter();
import { useNavigationStore } from '../../stores/navigation'
const navigation = storeToRefs(useNavigationStore())
import { setupItem } from '../core/itemSetup'
const data = ref({})
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
function onSubmit() {
  console.log(data.value)
}
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loadingDistrib && Distrib.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Distrib</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="Distrib.vynilDistrib.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
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
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loadingDistrib && Distrib.vynilDistrib!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section v-if="!loadingCRD">
        <OpenApiEdit
          v-model:out="data"
          :in="Distrib.vynilDistrib"
          :properties="getProperties(CRdef.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
