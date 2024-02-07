<script setup lang="ts">
import k8sStatefulSetQuery from '@/queries/k8s/StatefulSet.read.graphql'
import StatefulSetEdit from '@/queries/k8s/StatefulSet.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sStatefulSetMeta from '@/components/k8s/StatefulSetMeta.vue';
import k8sStatefulSetEdit from '@/components/k8s/StatefulSetEdit.vue';
import k8sStatefulSetStatus from '@/components/k8s/StatefulSetStatus.vue';
import { useQuery, useMutation, sanitizeData, useStatefulSet, StatefulSetSimpleExcludes } from '../../../libs/k8s/StatefulSet.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotStatefulSetFound, navigation, editor, setNamespacedItemFromRoute } = useStatefulSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStatefulSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StatefulSetSimpleExcludes
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
const { mutate: patchStatefulSet, onDone: onPatchStatefulSet, onError: onPatchError } = useMutation(StatefulSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStatefulSet({
    "name": result.k8sNamespace[0].k8sStatefulSet[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sStatefulSet[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotStatefulSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sStatefulSet[0])});onPatchStatefulSet(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sStatefulSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sStatefulSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sStatefulSetEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
    </div>
  </div>
</template>

