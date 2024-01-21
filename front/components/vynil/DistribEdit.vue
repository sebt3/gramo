<script setup lang="ts">
import vynilDistribQuery from '@/queries/vynil/DistribView.graphql'
import distribEdit from '@/queries/vynil/DistribEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useDistrib, sanitizeData, getProperties } from './Distrib.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotDistribFound, setItemFromRoute, navigation, onErrorHandler } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchDistrib, onDone: onPatchDistrib, onError: onPatchError } = useMutation(distribEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDistrib({"name": result.value.vynilDistrib.metadata.name, "spec": sanitizeData(editor.value.tab=='simple'?data.value:editor.value.spec)});
}
onError(onErrorHandler);onResult(res => {onNotDistribFound(res);editor.value.updateFromQuery(res, res.loading?{}:{options: res.data.vynilDistrib.metadata.obj.spec})});onPatchDistrib(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Distrib</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.vynilDistrib.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" label="Ok" color="positive" v-if="result.vynilDistrib.status.errors.length==0"></q-chip>
                <q-chip class="float-right text-white text-capitalize" label="Errors" color="negative" v-if="result.vynilDistrib.status.errors.length>0"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="result.vynilDistrib.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in result.vynilDistrib.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.vynilDistrib!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Options" name="simple" />
        <q-tab label="Specifications" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
            v-model:out="data"
            :in="result.vynilDistrib"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor :text="editor.yaml" :key="editor.yaml" @update:text="v=>editor.setYaml(v)" />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
