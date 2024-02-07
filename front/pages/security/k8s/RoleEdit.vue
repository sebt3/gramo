<script setup lang="ts">
import k8sRoleQuery from '@/queries/k8s/Role.read.graphql'
import RoleEdit from '@/queries/k8s/Role.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sRoleMeta from '@/components/k8s/RoleMeta.vue';
import k8sRoleEdit from '@/components/k8s/RoleEdit.vue';
import { useQuery, useMutation, sanitizeData, useRole, RoleSimpleExcludes } from '../../../libs/k8s/Role.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRoleFound, navigation, editor, setNamespacedItemFromRoute } = useRole();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RoleSimpleExcludes
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
const { mutate: patchRole, onDone: onPatchRole, onError: onPatchError } = useMutation(RoleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRole({
    "name": result.k8sNamespace[0].k8sRole[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sRole[0].metadata.namespace,
    "rules": sanitizeData(editor.value.obj['rules']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRoleFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sRole[0])});onPatchRole(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sRoleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null"
        :model="result.k8sNamespace[0].k8sRole[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sRoleEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null"
        :model="result.k8sNamespace[0].k8sRole[0]"
       />
    </div>
  </div>
</template>

