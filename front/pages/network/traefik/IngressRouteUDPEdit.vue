<script setup lang="ts">
import traefikIngressRouteUDPQuery from '@/queries/traefik/IngressRouteUDP.read.graphql'
import IngressRouteUDPEdit from '@/queries/traefik/IngressRouteUDP.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikIngressRouteUDPMeta from '@/components/traefik/IngressRouteUDPMeta.vue';
import traefikIngressRouteUDPEdit from '@/components/traefik/IngressRouteUDPEdit.vue';
import { useQuery, useMutation, sanitizeData, useIngressRouteUDP, IngressRouteUDPSimpleExcludes } from '../../../libs/traefik/IngressRouteUDP.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIngressRouteUDPFound, navigation, editor, setNamespacedItemFromRoute } = useIngressRouteUDP();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikIngressRouteUDPQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressRouteUDPSimpleExcludes
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
const { mutate: patchIngressRouteUDP, onDone: onPatchIngressRouteUDP, onError: onPatchError } = useMutation(IngressRouteUDPEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIngressRouteUDP({
    "name": result.k8sNamespace[0].traefikIngressRouteUDP[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikIngressRouteUDP[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIngressRouteUDPFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikIngressRouteUDP[0])});onPatchIngressRouteUDP(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikIngressRouteUDPMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteUDP[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikIngressRouteUDPEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteUDP[0]"
       />
    </div>
  </div>
</template>

