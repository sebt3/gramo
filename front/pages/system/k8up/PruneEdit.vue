<script setup lang="ts">
import k8upPruneQuery from '@/queries/k8up/Prune.read.graphql'
import PruneEdit from '@/queries/k8up/Prune.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upPruneMeta from '@/components/k8up/PruneMeta.vue';
import k8upPruneEdit from '@/components/k8up/PruneEdit.vue';
import k8upPruneStatus from '@/components/k8up/PruneStatus.vue';
import { useQuery, useMutation, sanitizeData, usePrune, PruneSimpleExcludes } from '../../../libs/k8up/Prune.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPruneFound, navigation, editor, setNamespacedItemFromRoute } = usePrune();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPruneQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PruneSimpleExcludes
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
const { mutate: patchPrune, onDone: onPatchPrune, onError: onPatchError } = useMutation(PruneEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrune({
    "name": result.k8sNamespace[0].k8upPrune[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upPrune[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPruneFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upPrune[0])});onPatchPrune(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upPruneMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upPruneStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upPruneEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div>
  </div>
</template>

