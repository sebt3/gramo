<script setup lang="ts">
import k8sServiceAccountQuery from '@/queries/k8s/ServiceAccount.read.graphql'
import ServiceAccountEdit from '@/queries/k8s/ServiceAccount.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import k8sServiceAccountEdit from '@/components/k8s/ServiceAccountEdit.vue';
import { useQuery, useMutation, sanitizeData, useServiceAccount, ServiceAccountSimpleExcludes } from '../../../libs/k8s/ServiceAccount.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotServiceAccountFound, navigation, editor, setNamespacedItemFromRoute } = useServiceAccount();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceAccountQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceAccountSimpleExcludes
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
const { mutate: patchServiceAccount, onDone: onPatchServiceAccount, onError: onPatchError } = useMutation(ServiceAccountEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServiceAccount({
    "name": result.k8sNamespace[0].k8sServiceAccount[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sServiceAccount[0].metadata.namespace,
    "automountServiceAccountToken": sanitizeData(editor.value.obj['automountServiceAccountToken']),
    "imagePullSecrets": sanitizeData(editor.value.obj['imagePullSecrets']),
    "secrets": sanitizeData(editor.value.obj['secrets']),
  });
}
onError(onErrorHandler);onResult(res => {onNotServiceAccountFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sServiceAccount[0])});onPatchServiceAccount(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sServiceAccountMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null"
        :model="result.k8sNamespace[0].k8sServiceAccount[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sServiceAccountEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null"
        :model="result.k8sNamespace[0].k8sServiceAccount[0]"
       />
    </div>
  </div>
</template>

