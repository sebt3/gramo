<script setup lang="ts">
import projectcalicoNetworkPolicyQuery from '@/queries/projectcalico/NetworkPolicy.read.graphql'
import NetworkPolicyEdit from '@/queries/projectcalico/NetworkPolicy.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoNetworkPolicyMeta from '@/components/projectcalico/NetworkPolicyMeta.vue';
import projectcalicoNetworkPolicyEdit from '@/components/projectcalico/NetworkPolicyEdit.vue';
import { useQuery, useMutation, sanitizeData, useNetworkPolicy, NetworkPolicySimpleExcludes } from '../../../libs/projectcalico/NetworkPolicy.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotNetworkPolicyFound, navigation, editor, setNamespacedItemFromRoute } = useNetworkPolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkPolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NetworkPolicySimpleExcludes
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
const { mutate: patchNetworkPolicy, onDone: onPatchNetworkPolicy, onError: onPatchError } = useMutation(NetworkPolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNetworkPolicy({
    "name": result.k8sNamespace[0].projectcalicoNetworkPolicy[0].metadata.name,
    "namespace": result.k8sNamespace[0].projectcalicoNetworkPolicy[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotNetworkPolicyFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].projectcalicoNetworkPolicy[0])});onPatchNetworkPolicy(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkPolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoNetworkPolicyEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkPolicy[0]"
       />
    </div>
  </div>
</template>

