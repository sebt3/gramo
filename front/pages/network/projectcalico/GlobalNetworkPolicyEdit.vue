<script setup lang="ts">
import projectcalicoGlobalNetworkPolicyQuery from '@/queries/projectcalico/GlobalNetworkPolicy.read.graphql'
import GlobalNetworkPolicyEdit from '@/queries/projectcalico/GlobalNetworkPolicy.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoGlobalNetworkPolicyMeta from '@/components/projectcalico/GlobalNetworkPolicyMeta.vue';
import projectcalicoGlobalNetworkPolicyEdit from '@/components/projectcalico/GlobalNetworkPolicyEdit.vue';
import { useQuery, useMutation, sanitizeData, useGlobalNetworkPolicy, GlobalNetworkPolicySimpleExcludes } from '../../../libs/projectcalico/GlobalNetworkPolicy.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotGlobalNetworkPolicyFound, navigation, editor, setItemFromRoute } = useGlobalNetworkPolicy();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkPolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GlobalNetworkPolicySimpleExcludes
  },
});
const { mutate: patchGlobalNetworkPolicy, onDone: onPatchGlobalNetworkPolicy, onError: onPatchError } = useMutation(GlobalNetworkPolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGlobalNetworkPolicy({
    "name": result.projectcalicoGlobalNetworkPolicy[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotGlobalNetworkPolicyFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoGlobalNetworkPolicy[0])});onPatchGlobalNetworkPolicy(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoGlobalNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=null"
        :model="result.projectcalicoGlobalNetworkPolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoGlobalNetworkPolicyEdit
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=null"
        :model="result.projectcalicoGlobalNetworkPolicy[0]"
       />
    </div>
  </div>
</template>

