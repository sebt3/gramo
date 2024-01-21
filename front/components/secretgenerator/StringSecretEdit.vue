<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecretView.graphql'
import stringSecretEdit from '@/queries/secretgenerator/StringSecretEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useStringSecret, sanitizeData, getProperties } from './StringSecret.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotStringSecretFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchStringSecret, onDone: onPatchStringSecret, onError: onPatchError } = useMutation(stringSecretEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStringSecret({"namespace": result.value.secretgeneratorStringSecret.metadata.namespace, "name": result.value.secretgeneratorStringSecret.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotStringSecretFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.secretgeneratorStringSecret.metadata.obj.spec})});onPatchStringSecret(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StringSecret</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorStringSecret.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorStringSecret!=null && result.secretgeneratorStringSecret.status != null">
          <DefaultStatusView :status="result.secretgeneratorStringSecret.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.secretgeneratorStringSecret!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{data=v;editor.setSpec({spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yaml" :key="editor.yaml"
          @update:text="v=>editor.setYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
