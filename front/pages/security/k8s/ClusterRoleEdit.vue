<script setup lang="ts">
import k8sClusterRoleQuery from '@/queries/k8s/ClusterRole.read.graphql'
import ClusterRoleEdit from '@/queries/k8s/ClusterRole.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sClusterRoleMeta from '@/components/k8s/ClusterRoleMeta.vue';
import k8sClusterRoleEdit from '@/components/k8s/ClusterRoleEdit.vue';
import { useQuery, useMutation, sanitizeData, useClusterRole, ClusterRoleSimpleExcludes } from '../../../libs/k8s/ClusterRole.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotClusterRoleFound, navigation, editor, setItemFromRoute } = useClusterRole();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterRoleSimpleExcludes
  },
});
const { mutate: patchClusterRole, onDone: onPatchClusterRole, onError: onPatchError } = useMutation(ClusterRoleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterRole({
    "name": result.k8sClusterRole[0].metadata.name,
    "aggregationRule": sanitizeData(editor.value.obj['aggregationRule']),
    "rules": sanitizeData(editor.value.obj['rules']),
  });
}
onError(onErrorHandler);onResult(res => {onNotClusterRoleFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sClusterRole[0])});onPatchClusterRole(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sClusterRoleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null"
        :model="result.k8sClusterRole[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sClusterRoleEdit
        v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null"
        :model="result.k8sClusterRole[0]"
       />
    </div>
  </div>
</template>

