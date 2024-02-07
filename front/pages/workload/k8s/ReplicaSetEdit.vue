<script setup lang="ts">
import k8sReplicaSetQuery from '@/queries/k8s/ReplicaSet.read.graphql'
import ReplicaSetEdit from '@/queries/k8s/ReplicaSet.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sReplicaSetMeta from '@/components/k8s/ReplicaSetMeta.vue';
import k8sReplicaSetEdit from '@/components/k8s/ReplicaSetEdit.vue';
import k8sReplicaSetStatus from '@/components/k8s/ReplicaSetStatus.vue';
import { useQuery, useMutation, sanitizeData, useReplicaSet, ReplicaSetSimpleExcludes } from '../../../libs/k8s/ReplicaSet.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotReplicaSetFound, navigation, editor, setNamespacedItemFromRoute } = useReplicaSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sReplicaSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReplicaSetSimpleExcludes
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
const { mutate: patchReplicaSet, onDone: onPatchReplicaSet, onError: onPatchError } = useMutation(ReplicaSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchReplicaSet({
    "name": result.k8sNamespace[0].k8sReplicaSet[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sReplicaSet[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotReplicaSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sReplicaSet[0])});onPatchReplicaSet(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sReplicaSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicaSet[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sReplicaSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicaSet[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sReplicaSetEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicaSet[0]"
       />
    </div>
  </div>
</template>

