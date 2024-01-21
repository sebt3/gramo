<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPairView.graphql'
import sSHKeyPairEdit from '@/queries/secretgenerator/SSHKeyPairEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useSSHKeyPair, sanitizeData, getProperties } from './SSHKeyPair.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotSSHKeyPairFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSSHKeyPair, onDone: onPatchSSHKeyPair, onError: onPatchError } = useMutation(sSHKeyPairEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSSHKeyPair({"namespace": result.value.secretgeneratorSSHKeyPair.metadata.namespace, "name": result.value.secretgeneratorSSHKeyPair.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotSSHKeyPairFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.secretgeneratorSSHKeyPair.metadata.obj.spec})});onPatchSSHKeyPair(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SSHKeyPair</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorSSHKeyPair.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorSSHKeyPair!=null && result.secretgeneratorSSHKeyPair.status != null">
          <DefaultStatusView :status="result.secretgeneratorSSHKeyPair.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
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
