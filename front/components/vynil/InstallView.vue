<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import vynilInstallQuery from '@/queries/vynil/InstallView.graphql'
import vynilPackageOptions from '@/queries/vynil/PackageOptions.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import {getProperties} from '../core/openapiSetup';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter();
import { useNavigationStore } from '../../stores/navigation'
const navigation = storeToRefs(useNavigationStore())
import { setupItem } from '../core/itemSetup'
const { setNamespacedItemFromRoute } = setupItem();setNamespacedItemFromRoute();
const { result: install, loading: loadingInstall, onResult, onError } = useQuery(vynilInstallQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem})
const { result: installOption, loading: loadingOptions } = useQuery(vynilPackageOptions, computed(() => {return loadingInstall.value||install.value==null||install.value.vynilInstall==null?{}:{
  "distrib": install.value.vynilInstall.distrib.metadata.name,
  "category": install.value.vynilInstall.category.name,
  "name": install.value.vynilInstall.component.name
}}), {enabled: computed(() => !loadingInstall.value && install.value)})
onResult(res => {
  if ( !res.loading && res.data.vynilInstall == null) {
    const matched = router.currentRoute.value.matched
    console.log('moving out asap', matched[matched.length>1?matched.length-2:matched.length-1].path)
    router.push({
      path: matched[matched.length>1?matched.length-2:matched.length-1].path,
      replace: true
    })
    //console.log(res)
  }
})
onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.log('[Network error]:', networkError);
  if (graphQLErrors)console.log('[graphQL error]:', graphQLErrors);
});
function onSubmit (evt) {
  console.log(evt, installOption.value.vynilPackage.options, install.value.vynilInstall.options)
}
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <q-card bordered v-if="!loadingInstall && install!=null && install.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Install</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="install.vynilInstall.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loadingInstall && install!=null && install.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" :label="install.vynilInstall.status.status" color="warning" v-if="['planning','installing'].includes(install.vynilInstall.status.status)"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="install.vynilInstall.status.status" color="positive" v-if="install.vynilInstall.status.status=='installed'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="install.vynilInstall.status.status" color="negative" v-if="install.vynilInstall.status.status=='errors'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="install.vynilInstall.status.status" color="info" v-if="!['installed','planning','installing','errors'].includes(install.vynilInstall.status.status)"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="install.vynilInstall.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in install.vynilInstall.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loadingInstall && install!=null && install.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Package</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Distribution" stack-label borderless>
              <template v-slot:prepend><q-icon name="alt_route" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ install.vynilInstall.distrib.metadata.name }}</div></template>
            </q-field>
            <q-field label="Category" stack-label borderless>
              <template v-slot:prepend><q-icon name="category" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ install.vynilInstall.category.name }}</div></template>
            </q-field>
            <q-field label="Name" stack-label borderless>
              <template v-slot:prepend><q-icon name="smart_button" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ install.vynilInstall.component.name }}</div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card v-if="!loadingOptions && !loadingInstall && installOption != undefined && install!=null && install.vynilInstall!=null && installOption.vynilPackage != undefined">
      <q-card-section>
        <div class="text-h5 q-mt-none q-mb-none">Options</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
            :in="install.vynilInstall.options"
            :properties="new Map(Object.entries(installOption.vynilPackage.options))"
            :read-only="true"
            :show-default="false"
          />
      </q-card-section>
    </q-card>
  </q-form>
</template>
