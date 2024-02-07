<script setup lang="ts">
import traefikMiddlewareTCPQuery from '@/queries/traefik/MiddlewareTCP.read.graphql'
import MiddlewareTCPEdit from '@/queries/traefik/MiddlewareTCP.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikMiddlewareTCPMeta from '@/components/traefik/MiddlewareTCPMeta.vue';
import traefikMiddlewareTCPEdit from '@/components/traefik/MiddlewareTCPEdit.vue';
import { useQuery, useMutation, sanitizeData, useMiddlewareTCP, MiddlewareTCPSimpleExcludes } from '../../../libs/traefik/MiddlewareTCP.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotMiddlewareTCPFound, navigation, editor, setNamespacedItemFromRoute } = useMiddlewareTCP();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikMiddlewareTCPQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MiddlewareTCPSimpleExcludes
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
const { mutate: patchMiddlewareTCP, onDone: onPatchMiddlewareTCP, onError: onPatchError } = useMutation(MiddlewareTCPEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMiddlewareTCP({
    "name": result.k8sNamespace[0].traefikMiddlewareTCP[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikMiddlewareTCP[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotMiddlewareTCPFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikMiddlewareTCP[0])});onPatchMiddlewareTCP(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikMiddlewareTCPMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=undefined && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddlewareTCP[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikMiddlewareTCPEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=undefined && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddlewareTCP[0]"
       />
    </div>
  </div>
</template>

