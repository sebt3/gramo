<script setup lang="ts">
import k8sLimitRangeQuery from '@/queries/k8s/LimitRange.read.graphql'
import LimitRangeEdit from '@/queries/k8s/LimitRange.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sLimitRangeMeta from '@/components/k8s/LimitRangeMeta.vue';
import k8sLimitRangeEdit from '@/components/k8s/LimitRangeEdit.vue';
import { useQuery, useMutation, sanitizeData, useLimitRange, LimitRangeSimpleExcludes } from '../../../libs/k8s/LimitRange.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotLimitRangeFound, navigation, editor, setNamespacedItemFromRoute } = useLimitRange();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sLimitRangeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": LimitRangeSimpleExcludes
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
const { mutate: patchLimitRange, onDone: onPatchLimitRange, onError: onPatchError } = useMutation(LimitRangeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchLimitRange({
    "name": result.k8sNamespace[0].k8sLimitRange[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sLimitRange[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotLimitRangeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sLimitRange[0])});onPatchLimitRange(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sLimitRangeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLimitRange[0]!=undefined && result.k8sNamespace[0].k8sLimitRange[0]!=null"
        :model="result.k8sNamespace[0].k8sLimitRange[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sLimitRangeEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLimitRange[0]!=undefined && result.k8sNamespace[0].k8sLimitRange[0]!=null"
        :model="result.k8sNamespace[0].k8sLimitRange[0]"
       />
    </div>
  </div>
</template>

