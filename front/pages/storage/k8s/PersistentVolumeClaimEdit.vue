<script setup lang="ts">
import k8sPersistentVolumeClaimQuery from '@/queries/k8s/PersistentVolumeClaim.read.graphql'
import PersistentVolumeClaimEdit from '@/queries/k8s/PersistentVolumeClaim.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sPersistentVolumeClaimMeta from '@/components/k8s/PersistentVolumeClaimMeta.vue';
import k8sPersistentVolumeClaimEdit from '@/components/k8s/PersistentVolumeClaimEdit.vue';
import k8sPersistentVolumeClaimStatus from '@/components/k8s/PersistentVolumeClaimStatus.vue';
import { useQuery, useMutation, sanitizeData, usePersistentVolumeClaim, PersistentVolumeClaimSimpleExcludes } from '../../../libs/k8s/PersistentVolumeClaim.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPersistentVolumeClaimFound, navigation, editor, setNamespacedItemFromRoute } = usePersistentVolumeClaim();setNamespacedItemFromRoute();
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
});
const { mutate: patchPersistentVolumeClaim, onDone: onPatchPersistentVolumeClaim, onError: onPatchError } = useMutation(PersistentVolumeClaimEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPersistentVolumeClaim({
    "name": result.k8sNamespace[0].k8sPersistentVolumeClaim[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sPersistentVolumeClaim[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPersistentVolumeClaimFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sPersistentVolumeClaim[0])});onPatchPersistentVolumeClaim(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPersistentVolumeClaimMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPersistentVolumeClaimStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPersistentVolumeClaimEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
    </div>
  </div>
</template>

