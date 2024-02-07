<script setup lang="ts">
import k8sDaemonSetQuery from '@/queries/k8s/DaemonSet.read.graphql'
import DaemonSetEdit from '@/queries/k8s/DaemonSet.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sDaemonSetMeta from '@/components/k8s/DaemonSetMeta.vue';
import k8sDaemonSetEdit from '@/components/k8s/DaemonSetEdit.vue';
import k8sDaemonSetStatus from '@/components/k8s/DaemonSetStatus.vue';
import { useQuery, useMutation, sanitizeData, useDaemonSet, DaemonSetSimpleExcludes } from '../../../libs/k8s/DaemonSet.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotDaemonSetFound, navigation, editor, setNamespacedItemFromRoute } = useDaemonSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDaemonSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DaemonSetSimpleExcludes
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
const { mutate: patchDaemonSet, onDone: onPatchDaemonSet, onError: onPatchError } = useMutation(DaemonSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDaemonSet({
    "name": result.k8sNamespace[0].k8sDaemonSet[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sDaemonSet[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotDaemonSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sDaemonSet[0])});onPatchDaemonSet(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sDaemonSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sDaemonSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sDaemonSetEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
    </div>
  </div>
</template>

