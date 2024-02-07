<script setup lang="ts">
import k8sCSIStorageCapacityQuery from '@/queries/k8s/CSIStorageCapacity.read.graphql'
import CSIStorageCapacityEdit from '@/queries/k8s/CSIStorageCapacity.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sCSIStorageCapacityMeta from '@/components/k8s/CSIStorageCapacityMeta.vue';
import k8sCSIStorageCapacityEdit from '@/components/k8s/CSIStorageCapacityEdit.vue';
import { useQuery, useMutation, sanitizeData, useCSIStorageCapacity, CSIStorageCapacitySimpleExcludes } from '../../../libs/k8s/CSIStorageCapacity.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCSIStorageCapacityFound, navigation, editor, setNamespacedItemFromRoute } = useCSIStorageCapacity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIStorageCapacityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSIStorageCapacitySimpleExcludes
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
const { mutate: patchCSIStorageCapacity, onDone: onPatchCSIStorageCapacity, onError: onPatchError } = useMutation(CSIStorageCapacityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCSIStorageCapacity({
    "name": result.k8sNamespace[0].k8sCSIStorageCapacity[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sCSIStorageCapacity[0].metadata.namespace,
    "capacity": sanitizeData(editor.value.obj['capacity']),
    "maximumVolumeSize": sanitizeData(editor.value.obj['maximumVolumeSize']),
    "nodeTopology": sanitizeData(editor.value.obj['nodeTopology']),
    "storageClassName": sanitizeData(editor.value.obj['storageClassName']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCSIStorageCapacityFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sCSIStorageCapacity[0])});onPatchCSIStorageCapacity(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCSIStorageCapacityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=undefined && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=null"
        :model="result.k8sNamespace[0].k8sCSIStorageCapacity[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCSIStorageCapacityEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=undefined && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=null"
        :model="result.k8sNamespace[0].k8sCSIStorageCapacity[0]"
       />
    </div>
  </div>
</template>

