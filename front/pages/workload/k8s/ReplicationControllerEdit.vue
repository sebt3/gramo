<script setup lang="ts">
import k8sReplicationControllerQuery from '@/queries/k8s/ReplicationController.read.graphql'
import ReplicationControllerEdit from '@/queries/k8s/ReplicationController.patch.graphql'
import k8sReplicationControllerMeta from '@/components/k8s/ReplicationControllerMeta.vue';
import k8sReplicationControllerEdit from '@/components/k8s/ReplicationControllerEdit.vue';
import k8sReplicationControllerStatus from '@/components/k8s/ReplicationControllerStatus.vue';
import { useQuery, useMutation, useReplicationController, ReplicationControllerSimpleExcludes } from '../../../libs/k8s/ReplicationController.js'
const { onErrorHandler, notifySuccess, notifyError, onNotReplicationControllerFound, navigation, setNamespacedItemFromRoute } = useReplicationController();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sReplicationControllerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReplicationControllerSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotReplicationControllerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReplicationControllerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sReplicationControllerQuery from '@/queries/k8s/ReplicationController.read.graphql'
import ReplicationControllerEdit from '@/queries/k8s/ReplicationController.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useReplicationController, sanitizeData, getProperties } from '../../../libs/k8s/ReplicationController.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotReplicationControllerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useReplicationController();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sReplicationControllerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchReplicationController, onDone: onPatchReplicationController, onError: onPatchError } = useMutation(ReplicationControllerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchReplicationController({ "namespace": result.value.k8sReplicationController.metadata.namespace, "name": result.value.k8sReplicationController.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotReplicationControllerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sReplicationController.metadata.obj.spec})});onPatchReplicationController(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sReplicationControllerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
      <k8sReplicationControllerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div><div class="col-md-6">
      <k8sReplicationControllerView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicationController[0]!=undefined && result.k8sNamespace[0].k8sReplicationController[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicationController[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sReplicationController!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ReplicationController</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sReplicationController.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sReplicationController!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sReplicationController!=null && result.k8sNamespace[0].k8sReplicationController.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sReplicationController.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sReplicationController!=null" class="q-ma-sm">
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