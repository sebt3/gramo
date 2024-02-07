<script setup lang="ts">
import k8sRoleBindingQuery from '@/queries/k8s/RoleBinding.read.graphql'
import RoleBindingEdit from '@/queries/k8s/RoleBinding.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sRoleBindingMeta from '@/components/k8s/RoleBindingMeta.vue';
import k8sRoleBindingEdit from '@/components/k8s/RoleBindingEdit.vue';
import { useQuery, useMutation, sanitizeData, useRoleBinding, RoleBindingSimpleExcludes } from '../../../libs/k8s/RoleBinding.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRoleBindingFound, navigation, editor, setNamespacedItemFromRoute } = useRoleBinding();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleBindingQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RoleBindingSimpleExcludes
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
const { mutate: patchRoleBinding, onDone: onPatchRoleBinding, onError: onPatchError } = useMutation(RoleBindingEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRoleBinding({
    "name": result.k8sNamespace[0].k8sRoleBinding[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sRoleBinding[0].metadata.namespace,
    "roleRef": sanitizeData(editor.value.obj['roleRef']),
    "subjects": sanitizeData(editor.value.obj['subjects']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRoleBindingFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sRoleBinding[0])});onPatchRoleBinding(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sRoleBindingMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null"
        :model="result.k8sNamespace[0].k8sRoleBinding[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sRoleBindingEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null"
        :model="result.k8sNamespace[0].k8sRoleBinding[0]"
       />
    </div>
  </div>
</template>

