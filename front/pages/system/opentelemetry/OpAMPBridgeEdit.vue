<script setup lang="ts">
import opentelemetryOpAMPBridgeQuery from '@/queries/opentelemetry/OpAMPBridge.read.graphql'
import OpAMPBridgeEdit from '@/queries/opentelemetry/OpAMPBridge.patch.graphql'
import opentelemetryOpAMPBridgeMeta from '@/components/opentelemetry/OpAMPBridgeMeta.vue';
import opentelemetryOpAMPBridgeEdit from '@/components/opentelemetry/OpAMPBridgeEdit.vue';
import opentelemetryOpAMPBridgeStatus from '@/components/opentelemetry/OpAMPBridgeStatus.vue';
import { useQuery, useMutation, useOpAMPBridge, OpAMPBridgeSimpleExcludes } from '../../../libs/opentelemetry/OpAMPBridge.js'
const { onErrorHandler, notifySuccess, notifyError, onNotOpAMPBridgeFound, navigation, setNamespacedItemFromRoute } = useOpAMPBridge();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryOpAMPBridgeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OpAMPBridgeSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotOpAMPBridgeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OpAMPBridgeDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import opentelemetryOpAMPBridgeQuery from '@/queries/opentelemetry/OpAMPBridge.read.graphql'
import OpAMPBridgeEdit from '@/queries/opentelemetry/OpAMPBridge.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useOpAMPBridge, sanitizeData, getProperties } from '../../../libs/opentelemetry/OpAMPBridge.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotOpAMPBridgeFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useOpAMPBridge();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryOpAMPBridgeQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchOpAMPBridge, onDone: onPatchOpAMPBridge, onError: onPatchError } = useMutation(OpAMPBridgeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchOpAMPBridge({ "namespace": result.value.opentelemetryOpAMPBridge.metadata.namespace, "name": result.value.opentelemetryOpAMPBridge.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotOpAMPBridgeFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.opentelemetryOpAMPBridge.metadata.obj.spec})});onPatchOpAMPBridge(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <opentelemetryOpAMPBridgeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
      <opentelemetryOpAMPBridgeStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div><div class="col-md-6">
      <opentelemetryOpAMPBridgeView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].opentelemetryOpAMPBridge!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">OpAMPBridge</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].opentelemetryOpAMPBridge.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].opentelemetryOpAMPBridge!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].opentelemetryOpAMPBridge!=null && result.k8sNamespace[0].opentelemetryOpAMPBridge.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].opentelemetryOpAMPBridge.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].opentelemetryOpAMPBridge!=null" class="q-ma-sm">
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