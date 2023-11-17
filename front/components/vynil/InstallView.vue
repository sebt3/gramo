<script setup>
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import vynilInstallQuery from '../../queries/vynil/Install.graphql'
import vynilPackageOptions from '../../queries/vynil/PackageOptions.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiItemView from '../core/OpenApiItemView.vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter();
import { useNavigationStore } from '../../stores/navigation'
const navigation = storeToRefs(useNavigationStore())
import { setupItem } from '../core/itemSetup'
const { setItemFromRoute } = setupItem();setItemFromRoute();
const { result: install, loading: loadingInstall, onResult } = useQuery(vynilInstallQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem})
const { result: installOption, loading: loadingOptions } = useQuery(vynilPackageOptions, computed(() => {return loadingInstall.value||install.value.vynilInstall==null?{}:{
  "distrib": install.value.vynilInstall.distrib.metadata.name,
  "category": install.value.vynilInstall.category.name,
  "name": install.value.vynilInstall.component.name
}}), {enabled: computed(() => !loadingInstall.value)})
onResult(res => {
  if ( !res.loading && res.data.vynilInstall == null) {
    const matched = router.currentRoute.value.matched
    console.log('moving out asap', matched[matched.length>1?matched.length-2:matched.length-1].path)
    router.push({
      path: matched[matched.length>1?matched.length-2:matched.length-1].path,
      replace: true
    })
  }
})
function onSubmit (evt) {
  console.log(evt, installOption.value.vynilPackage.options, install.value.vynilInstall.options)
}
</script>
<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-card bordered v-if="!loadingInstall && install.vynilInstall!=null">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Install</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="install.vynilInstall.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loadingInstall && install.vynilInstall!=null">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Package</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <div class="row"><div class="col">
                <q-field label="Distribution" stack-label borderless>
                  <template v-slot:prepend><q-icon name="alt_route" /></template>
                  <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ install.vynilInstall.distrib.metadata.name }}</div></template>
                </q-field>
              </div><div class="col">
                <q-field label="Category" stack-label borderless>
                  <template v-slot:prepend><q-icon name="category" /></template>
                  <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ install.vynilInstall.category.name }}</div></template>
                </q-field>
              </div><div class="col">
                <q-field label="Name" stack-label borderless>
                  <template v-slot:prepend><q-icon name="smart_button" /></template>
                  <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ install.vynilInstall.component.name }}</div></template>
                </q-field>
              </div></div>
          </div>
        </q-card-section>
      </q-card>
      <q-card v-if="!loadingOptions && !loadingInstall && install.vynilInstall!=null">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none">Options</div>
        </q-card-section>
        <q-card-section v-if="!loadingOptions">
          <div class="q-gutter-md column">
            <div v-for="(value, key) in installOption==undefined?{}:installOption.vynilPackage.options" v-bind:key="key" :style="value.type=='string'?key=='name'?'order: 1':'order: 2':['number','integer'].includes(value.type)?'order: 3':value.type=='boolean'?'order: 1':value.type=='array'?'order: 5':'order: 4'">
              <OpenApiItemView
                :key="key"
                :name="key"
                :data="install.vynilInstall.options==undefined?undefined:install.vynilInstall.options[key]"
                :defaultdata="value.default"
                :apitype="value.type"
                :properties="value.properties"
                :items="value.items"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Submit" type="submit" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
