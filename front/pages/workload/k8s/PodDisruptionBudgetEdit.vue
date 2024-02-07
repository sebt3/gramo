<script setup lang="ts">
import k8sPodDisruptionBudgetQuery from '@/queries/k8s/PodDisruptionBudget.read.graphql'
import PodDisruptionBudgetEdit from '@/queries/k8s/PodDisruptionBudget.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sPodDisruptionBudgetMeta from '@/components/k8s/PodDisruptionBudgetMeta.vue';
import k8sPodDisruptionBudgetEdit from '@/components/k8s/PodDisruptionBudgetEdit.vue';
import k8sPodDisruptionBudgetStatus from '@/components/k8s/PodDisruptionBudgetStatus.vue';
import { useQuery, useMutation, sanitizeData, usePodDisruptionBudget, PodDisruptionBudgetSimpleExcludes } from '../../../libs/k8s/PodDisruptionBudget.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPodDisruptionBudgetFound, navigation, editor, setNamespacedItemFromRoute } = usePodDisruptionBudget();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodDisruptionBudgetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodDisruptionBudgetSimpleExcludes
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
const { mutate: patchPodDisruptionBudget, onDone: onPatchPodDisruptionBudget, onError: onPatchError } = useMutation(PodDisruptionBudgetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPodDisruptionBudget({
    "name": result.k8sNamespace[0].k8sPodDisruptionBudget[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sPodDisruptionBudget[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPodDisruptionBudgetFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sPodDisruptionBudget[0])});onPatchPodDisruptionBudget(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPodDisruptionBudgetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPodDisruptionBudgetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPodDisruptionBudgetEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
    </div>
  </div>
</template>

