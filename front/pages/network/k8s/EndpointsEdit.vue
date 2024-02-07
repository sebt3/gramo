<script setup lang="ts">
import k8sEndpointsQuery from '@/queries/k8s/Endpoints.read.graphql'
import EndpointsEdit from '@/queries/k8s/Endpoints.patch.graphql'
import k8sEndpointsMeta from '@/components/k8s/EndpointsMeta.vue';
import k8sEndpointsEdit from '@/components/k8s/EndpointsEdit.vue';
import { useQuery, useMutation, useEndpoints, EndpointsSimpleExcludes } from '../../../libs/k8s/Endpoints.js'
const { onErrorHandler, notifySuccess, notifyError, onNotEndpointsFound, navigation, setNamespacedItemFromRoute } = useEndpoints();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointsQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": EndpointsSimpleExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
});onError(onErrorHandler); onResult(res => {onNotEndpointsFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(EndpointsDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sEndpointsQuery from '@/queries/k8s/Endpoints.read.graphql'
import EndpointsEdit from '@/queries/k8s/Endpoints.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useEndpoints, sanitizeData, getProperties } from '../../../libs/k8s/Endpoints.js'
const subsets  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotEndpointsFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useEndpoints();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointsQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchEndpoints, onDone: onPatchEndpoints, onError: onPatchError } = useMutation(EndpointsEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchEndpoints({ "namespace": result.value.k8sEndpoints.metadata.namespace, "name": result.value.k8sEndpoints.metadata.name, "subsets": sanitizeData(subsets.value) });
}
onError(onErrorHandler);onResult(res => {onNotEndpointsFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sEndpoints.metadata.obj.spec})});onPatchEndpoints(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sEndpointsMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpoints[0]!=undefined && result.k8sNamespace[0].k8sEndpoints[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpoints[0]"
       />
    </div><div class="col-md-6">
      <k8sEndpointsView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpoints[0]!=undefined && result.k8sNamespace[0].k8sEndpoints[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpoints[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sEndpoints!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Endpoints</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sEndpoints.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sEndpoints!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sEndpoints!=null && result.k8sNamespace[0].k8sEndpoints.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sEndpoints.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sEndpoints!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.subsets).includes('subsets')?editor.subsets['subsets']:{}"
          @update:out="v=>{ subsets=v;editor.setsubsetsSpec({ subsets: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlsubsets" :key="editor.yamlsubsets"
          @update:text="v=>editor.setsubsetsYaml(v)"
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