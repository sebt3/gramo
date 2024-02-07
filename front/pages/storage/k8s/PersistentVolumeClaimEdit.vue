<script setup lang="ts">
import k8sPersistentVolumeClaimQuery from '@/queries/k8s/PersistentVolumeClaim.read.graphql'
import PersistentVolumeClaimEdit from '@/queries/k8s/PersistentVolumeClaim.patch.graphql'
import k8sPersistentVolumeClaimMeta from '@/components/k8s/PersistentVolumeClaimMeta.vue';
import k8sPersistentVolumeClaimEdit from '@/components/k8s/PersistentVolumeClaimEdit.vue';
import k8sPersistentVolumeClaimStatus from '@/components/k8s/PersistentVolumeClaimStatus.vue';
import { useQuery, useMutation, usePersistentVolumeClaim, PersistentVolumeClaimSimpleExcludes } from '../../../libs/k8s/PersistentVolumeClaim.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPersistentVolumeClaimFound, navigation, setNamespacedItemFromRoute } = usePersistentVolumeClaim();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeClaimQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PersistentVolumeClaimSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotPersistentVolumeClaimFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PersistentVolumeClaimDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sPersistentVolumeClaimQuery from '@/queries/k8s/PersistentVolumeClaim.read.graphql'
import PersistentVolumeClaimEdit from '@/queries/k8s/PersistentVolumeClaim.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePersistentVolumeClaim, sanitizeData, getProperties } from '../../../libs/k8s/PersistentVolumeClaim.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPersistentVolumeClaimFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePersistentVolumeClaim();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeClaimQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPersistentVolumeClaim, onDone: onPatchPersistentVolumeClaim, onError: onPatchError } = useMutation(PersistentVolumeClaimEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPersistentVolumeClaim({ "namespace": result.value.k8sPersistentVolumeClaim.metadata.namespace, "name": result.value.k8sPersistentVolumeClaim.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotPersistentVolumeClaimFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sPersistentVolumeClaim.metadata.obj.spec})});onPatchPersistentVolumeClaim(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPersistentVolumeClaimMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
      <k8sPersistentVolumeClaimStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentCluster!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentCluster[0]"
       />
      <k8sStatefulSetMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentStatefulSet!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentStatefulSet.length>0"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentStatefulSet[0]"
       />
    </div><div class="col-md-6">
      <k8sPersistentVolumeClaimView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPersistentVolumeClaim!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PersistentVolumeClaim</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sPersistentVolumeClaim.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPersistentVolumeClaim!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sPersistentVolumeClaim!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sPersistentVolumeClaim.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sPersistentVolumeClaim!=null" class="q-ma-sm">
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