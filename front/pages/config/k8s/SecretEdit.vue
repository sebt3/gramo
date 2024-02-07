<script setup lang="ts">
import k8sSecretQuery from '@/queries/k8s/Secret.read.graphql'
import SecretEdit from '@/queries/k8s/Secret.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sSecretMeta from '@/components/k8s/SecretMeta.vue';
import k8sSecretEdit from '@/components/k8s/SecretEdit.vue';
import { useQuery, useMutation, sanitizeData, useSecret, SecretSimpleExcludes } from '../../../libs/k8s/Secret.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotSecretFound, navigation, editor, setNamespacedItemFromRoute } = useSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SecretSimpleExcludes
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
const { mutate: patchSecret, onDone: onPatchSecret, onError: onPatchError } = useMutation(SecretEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSecret({
    "name": result.k8sNamespace[0].k8sSecret[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sSecret[0].metadata.namespace,
    "data": sanitizeData(editor.value.obj['data']),
    "immutable": sanitizeData(editor.value.obj['immutable']),
    "stringData": sanitizeData(editor.value.obj['stringData']),
    "type": sanitizeData(editor.value.obj['type']),
  });
}
onError(onErrorHandler);onResult(res => {onNotSecretFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sSecret[0])});onPatchSecret(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sSecretMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sSecretEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
       />
    </div>
  </div>
</template>

