<script setup lang="ts">
import vynilInstallQuery from '@/queries/vynil/InstallView.graphql'
import installEdit from '@/queries/vynil/InstallEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import { useInstall, ref, useMutation, useQuery, sanitizeData } from './Install.js'
const { onNotInstallFound, onErrorHandler, navigation, setNamespacedItemFromRoute, patchDone, patchError, notifyWorking } = useInstall();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilInstallQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchInstall, onDone: onPatchInstall, onError: onPatchError } = useMutation(installEdit);
const data = ref({});
function onSubmit() {
  notifyWorking('Update in progress');
  const spec = Object.fromEntries(Object.entries(result.value.vynilInstall).filter(([key, value]) => !value==null&&!['options','category','component','distrib'].includes(key)))
  const payload = {
    "name": result.value.vynilInstall.metadata.name,
    "namespace": result.value.vynilInstall.metadata.namespace,
    "spec": {
      "category":result.value.vynilInstall.category.name,
      "distrib":result.value.vynilInstall.distrib.metadata.name,
      "component":result.value.vynilInstall.component.name,
      ...spec,
      "options": {
        ...result.value.vynilInstall.options,
        ...sanitizeData(data.value)
      }
    }
  }
  console.log(payload)
  patchInstall(payload);
}
onResult(onNotInstallFound);onError(onErrorHandler);onPatchInstall(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Install</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.vynilInstall.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" :color="['planning','installing'].includes(result.vynilInstall.status.status)?'warning':result.vynilInstall.status.status=='installed'?'positive':result.vynilInstall.status.status=='errors'?'negative':'info'"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="result.vynilInstall.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in result.vynilInstall.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Package</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Distribution" stack-label borderless>
              <template v-slot:prepend><q-icon name="alt_route" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.distrib.metadata.name }}</div></template>
            </q-field>
            <q-field label="Category" stack-label borderless>
              <template v-slot:prepend><q-icon name="category" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.category.name }}</div></template>
            </q-field>
            <q-field label="Name" stack-label borderless>
              <template v-slot:prepend><q-icon name="smart_button" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.component.name }}</div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card v-if="!loading && result!=null && result.vynilInstall!=null">
      <q-card-section>
        <div class="text-h5 q-mt-none q-mb-none">Options</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
            :in="result.vynilInstall.options"
            v-model:out="data"
            :properties="new Map(Object.entries(result.vynilInstall.component.options))"
          />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
