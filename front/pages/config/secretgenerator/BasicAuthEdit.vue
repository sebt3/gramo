<script setup lang="ts">
import secretgeneratorBasicAuthQuery from '@/queries/secretgenerator/BasicAuth.read.graphql'
import BasicAuthEdit from '@/queries/secretgenerator/BasicAuth.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import secretgeneratorBasicAuthMeta from '@/components/secretgenerator/BasicAuthMeta.vue';
import secretgeneratorBasicAuthEdit from '@/components/secretgenerator/BasicAuthEdit.vue';
import secretgeneratorBasicAuthStatus from '@/components/secretgenerator/BasicAuthStatus.vue';
import { useQuery, useMutation, sanitizeData, useBasicAuth, BasicAuthSimpleExcludes } from '../../../libs/secretgenerator/BasicAuth.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBasicAuthFound, navigation, editor, setNamespacedItemFromRoute } = useBasicAuth();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorBasicAuthQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BasicAuthSimpleExcludes
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
const { mutate: patchBasicAuth, onDone: onPatchBasicAuth, onError: onPatchError } = useMutation(BasicAuthEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBasicAuth({
    "name": result.k8sNamespace[0].secretgeneratorBasicAuth[0].metadata.name,
    "namespace": result.k8sNamespace[0].secretgeneratorBasicAuth[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBasicAuthFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].secretgeneratorBasicAuth[0])});onPatchBasicAuth(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <secretgeneratorBasicAuthMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0]"
       />
    </div>
    <div class="col-md-6">
      <secretgeneratorBasicAuthStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0]"
       />
    </div>
    <div class="col-md-12">
      <secretgeneratorBasicAuthEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0]"
       />
    </div>
  </div>
</template>

