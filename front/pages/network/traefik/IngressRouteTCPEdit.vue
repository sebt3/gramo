<script setup lang="ts">
import traefikIngressRouteTCPQuery from '@/queries/traefik/IngressRouteTCP.read.graphql'
import IngressRouteTCPEdit from '@/queries/traefik/IngressRouteTCP.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikIngressRouteTCPMeta from '@/components/traefik/IngressRouteTCPMeta.vue';
import traefikIngressRouteTCPEdit from '@/components/traefik/IngressRouteTCPEdit.vue';
import { useQuery, useMutation, sanitizeData, useIngressRouteTCP, IngressRouteTCPSimpleExcludes } from '../../../libs/traefik/IngressRouteTCP.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIngressRouteTCPFound, navigation, editor, setNamespacedItemFromRoute } = useIngressRouteTCP();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikIngressRouteTCPQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressRouteTCPSimpleExcludes
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
const { mutate: patchIngressRouteTCP, onDone: onPatchIngressRouteTCP, onError: onPatchError } = useMutation(IngressRouteTCPEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIngressRouteTCP({
    "name": result.k8sNamespace[0].traefikIngressRouteTCP[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikIngressRouteTCP[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIngressRouteTCPFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikIngressRouteTCP[0])});onPatchIngressRouteTCP(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikIngressRouteTCPMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteTCP[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikIngressRouteTCPEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteTCP[0]"
       />
    </div>
  </div>
</template>

