<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecret.read.graphql'
import StringSecretEdit from '@/queries/secretgenerator/StringSecret.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import secretgeneratorStringSecretMeta from '@/components/secretgenerator/StringSecretMeta.vue';
import secretgeneratorStringSecretEdit from '@/components/secretgenerator/StringSecretEdit.vue';
import secretgeneratorStringSecretStatus from '@/components/secretgenerator/StringSecretStatus.vue';
import { useQuery, useMutation, sanitizeData, useStringSecret, StringSecretSimpleExcludes } from '../../../libs/secretgenerator/StringSecret.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotStringSecretFound, navigation, editor, setNamespacedItemFromRoute } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StringSecretSimpleExcludes
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
const { mutate: patchStringSecret, onDone: onPatchStringSecret, onError: onPatchError } = useMutation(StringSecretEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStringSecret({
    "name": result.k8sNamespace[0].secretgeneratorStringSecret[0].metadata.name,
    "namespace": result.k8sNamespace[0].secretgeneratorStringSecret[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotStringSecretFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].secretgeneratorStringSecret[0])});onPatchStringSecret(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <secretgeneratorStringSecretMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
    </div>
    <div class="col-md-6">
      <secretgeneratorStringSecretStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
    </div>
    <div class="col-md-12">
      <secretgeneratorStringSecretEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
    </div>
  </div>
</template>

