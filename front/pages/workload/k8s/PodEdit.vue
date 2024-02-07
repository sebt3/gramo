<script setup lang="ts">
import k8sPodQuery from '@/queries/k8s/Pod.read.graphql'
import PodEdit from '@/queries/k8s/Pod.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sPodMeta from '@/components/k8s/PodMeta.vue';
import k8sPodEdit from '@/components/k8s/PodEdit.vue';
import k8sPodStatus from '@/components/k8s/PodStatus.vue';
import { useQuery, useMutation, sanitizeData, usePod, PodSimpleExcludes } from '../../../libs/k8s/Pod.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPodFound, navigation, editor, setNamespacedItemFromRoute } = usePod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodSimpleExcludes
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
const { mutate: patchPod, onDone: onPatchPod, onError: onPatchError } = useMutation(PodEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPod({
    "name": result.k8sNamespace[0].k8sPod[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sPod[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPodFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sPod[0])});onPatchPod(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPodMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPodStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPodEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
    </div>
  </div>
</template>

