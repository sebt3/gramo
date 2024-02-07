<script setup lang="ts">
import projectcalicoNetworkSetQuery from '@/queries/projectcalico/NetworkSet.read.graphql'
import NetworkSetEdit from '@/queries/projectcalico/NetworkSet.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoNetworkSetMeta from '@/components/projectcalico/NetworkSetMeta.vue';
import projectcalicoNetworkSetEdit from '@/components/projectcalico/NetworkSetEdit.vue';
import { useQuery, useMutation, sanitizeData, useNetworkSet, NetworkSetSimpleExcludes } from '../../../libs/projectcalico/NetworkSet.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotNetworkSetFound, navigation, editor, setNamespacedItemFromRoute } = useNetworkSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NetworkSetSimpleExcludes
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
const { mutate: patchNetworkSet, onDone: onPatchNetworkSet, onError: onPatchError } = useMutation(NetworkSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNetworkSet({
    "name": result.k8sNamespace[0].projectcalicoNetworkSet[0].metadata.name,
    "namespace": result.k8sNamespace[0].projectcalicoNetworkSet[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotNetworkSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].projectcalicoNetworkSet[0])});onPatchNetworkSet(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoNetworkSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkSet[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoNetworkSetEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkSet[0]"
       />
    </div>
  </div>
</template>

