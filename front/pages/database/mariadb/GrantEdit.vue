<script setup lang="ts">
import mariadbGrantQuery from '@/queries/mariadb/Grant.read.graphql'
import GrantEdit from '@/queries/mariadb/Grant.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbGrantMeta from '@/components/mariadb/GrantMeta.vue';
import mariadbGrantEdit from '@/components/mariadb/GrantEdit.vue';
import mariadbGrantStatus from '@/components/mariadb/GrantStatus.vue';
import { useQuery, useMutation, sanitizeData, useGrant, GrantSimpleExcludes } from '../../../libs/mariadb/Grant.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotGrantFound, navigation, editor, setNamespacedItemFromRoute } = useGrant();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbGrantQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GrantSimpleExcludes
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
const { mutate: patchGrant, onDone: onPatchGrant, onError: onPatchError } = useMutation(GrantEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGrant({
    "name": result.k8sNamespace[0].mariadbGrant[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbGrant[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotGrantFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbGrant[0])});onPatchGrant(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbGrantMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbGrant[0]!=undefined && result.k8sNamespace[0].mariadbGrant[0]!=null"
        :model="result.k8sNamespace[0].mariadbGrant[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbGrantStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbGrant[0]!=undefined && result.k8sNamespace[0].mariadbGrant[0]!=null"
        :model="result.k8sNamespace[0].mariadbGrant[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbGrantEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbGrant[0]!=undefined && result.k8sNamespace[0].mariadbGrant[0]!=null"
        :model="result.k8sNamespace[0].mariadbGrant[0]"
       />
    </div>
  </div>
</template>

