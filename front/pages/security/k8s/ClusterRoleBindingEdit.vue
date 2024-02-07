<script setup lang="ts">
import k8sClusterRoleBindingQuery from '@/queries/k8s/ClusterRoleBinding.read.graphql'
import ClusterRoleBindingEdit from '@/queries/k8s/ClusterRoleBinding.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sClusterRoleBindingMeta from '@/components/k8s/ClusterRoleBindingMeta.vue';
import k8sClusterRoleBindingEdit from '@/components/k8s/ClusterRoleBindingEdit.vue';
import { useQuery, useMutation, sanitizeData, useClusterRoleBinding, ClusterRoleBindingSimpleExcludes } from '../../../libs/k8s/ClusterRoleBinding.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotClusterRoleBindingFound, navigation, editor, setItemFromRoute } = useClusterRoleBinding();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleBindingQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterRoleBindingSimpleExcludes
  },
});
const { mutate: patchClusterRoleBinding, onDone: onPatchClusterRoleBinding, onError: onPatchError } = useMutation(ClusterRoleBindingEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterRoleBinding({
    "name": result.k8sClusterRoleBinding[0].metadata.name,
    "roleRef": sanitizeData(editor.value.obj['roleRef']),
    "subjects": sanitizeData(editor.value.obj['subjects']),
  });
}
onError(onErrorHandler);onResult(res => {onNotClusterRoleBindingFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sClusterRoleBinding[0])});onPatchClusterRoleBinding(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sClusterRoleBindingMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null"
        :model="result.k8sClusterRoleBinding[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sClusterRoleBindingEdit
        v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null"
        :model="result.k8sClusterRoleBinding[0]"
       />
    </div>
  </div>
</template>

