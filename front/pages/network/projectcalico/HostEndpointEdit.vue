<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpoint.read.graphql'
import HostEndpointEdit from '@/queries/projectcalico/HostEndpoint.patch.graphql'
import projectcalicoHostEndpointMeta from '@/components/projectcalico/HostEndpointMeta.vue';
import projectcalicoHostEndpointEdit from '@/components/projectcalico/HostEndpointEdit.vue';
import { useQuery, useMutation, useHostEndpoint, HostEndpointSimpleExcludes } from '../../../libs/projectcalico/HostEndpoint.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHostEndpointFound, navigation, setItemFromRoute } = useHostEndpoint();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoHostEndpointQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HostEndpointSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotHostEndpointFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HostEndpointDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpoint.read.graphql'
import HostEndpointEdit from '@/queries/projectcalico/HostEndpoint.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useHostEndpoint, sanitizeData, getProperties } from '../../../libs/projectcalico/HostEndpoint.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotHostEndpointFound, setItemFromRoute, navigation, onErrorHandler } = useHostEndpoint();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoHostEndpointQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHostEndpoint, onDone: onPatchHostEndpoint, onError: onPatchError } = useMutation(HostEndpointEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHostEndpoint({ "name": result.value.projectcalicoHostEndpoint.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotHostEndpointFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoHostEndpoint.metadata.obj.spec})});onPatchHostEndpoint(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoHostEndpointMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint[0]!=undefined && result.projectcalicoHostEndpoint[0]!=null"
        :model="result.projectcalicoHostEndpoint[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoHostEndpointView
        v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint[0]!=undefined && result.projectcalicoHostEndpoint[0]!=null"
        :model="result.projectcalicoHostEndpoint[0]"
       />
    </div>
  </div>
</template>



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
          @update:out="v=>{ spec=v;editor.setspecSpec({ spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlspec" :key="editor.yamlspec"
          @update:text="v=>editor.setspecYaml(v)"
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