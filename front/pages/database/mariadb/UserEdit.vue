<script setup lang="ts">
import mariadbUserQuery from '@/queries/mariadb/User.read.graphql'
import UserEdit from '@/queries/mariadb/User.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbUserMeta from '@/components/mariadb/UserMeta.vue';
import mariadbUserEdit from '@/components/mariadb/UserEdit.vue';
import mariadbUserStatus from '@/components/mariadb/UserStatus.vue';
import { useQuery, useMutation, sanitizeData, useUser, UserSimpleExcludes } from '../../../libs/mariadb/User.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotUserFound, navigation, editor, setNamespacedItemFromRoute } = useUser();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbUserQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": UserSimpleExcludes
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
const { mutate: patchUser, onDone: onPatchUser, onError: onPatchError } = useMutation(UserEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchUser({
    "name": result.k8sNamespace[0].mariadbUser[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbUser[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotUserFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbUser[0])});onPatchUser(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbUserMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbUserStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbUserEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div>
  </div>
</template>

