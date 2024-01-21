<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpointView.graphql'
import hostEndpointEdit from '@/queries/projectcalico/HostEndpointEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useHostEndpoint, sanitizeData, getProperties } from './HostEndpoint.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotHostEndpointFound, setItemFromRoute, navigation, onErrorHandler } = useHostEndpoint();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoHostEndpointQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHostEndpoint, onDone: onPatchHostEndpoint, onError: onPatchError } = useMutation(hostEndpointEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHostEndpoint({"name": result.value.projectcalicoHostEndpoint.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotHostEndpointFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoHostEndpoint.metadata.obj.spec})});onPatchHostEndpoint(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoHostEndpoint!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HostEndpoint</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoHostEndpoint.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoHostEndpoint!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoHostEndpoint!=null && result.projectcalicoHostEndpoint.status != null">
          <DefaultStatusView :status="result.projectcalicoHostEndpoint.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoHostEndpoint!=null" class="q-ma-sm">
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
