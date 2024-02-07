<script setup lang="ts">
import traefikServersTransportQuery from '@/queries/traefik/ServersTransport.read.graphql'
import ServersTransportEdit from '@/queries/traefik/ServersTransport.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikServersTransportMeta from '@/components/traefik/ServersTransportMeta.vue';
import traefikServersTransportEdit from '@/components/traefik/ServersTransportEdit.vue';
import { useQuery, useMutation, sanitizeData, useServersTransport, ServersTransportSimpleExcludes } from '../../../libs/traefik/ServersTransport.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotServersTransportFound, navigation, editor, setNamespacedItemFromRoute } = useServersTransport();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikServersTransportQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServersTransportSimpleExcludes
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
const { mutate: patchServersTransport, onDone: onPatchServersTransport, onError: onPatchError } = useMutation(ServersTransportEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServersTransport({
    "name": result.k8sNamespace[0].traefikServersTransport[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikServersTransport[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotServersTransportFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikServersTransport[0])});onPatchServersTransport(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikServersTransportMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikServersTransport[0]!=undefined && result.k8sNamespace[0].traefikServersTransport[0]!=null"
        :model="result.k8sNamespace[0].traefikServersTransport[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikServersTransportEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikServersTransport[0]!=undefined && result.k8sNamespace[0].traefikServersTransport[0]!=null"
        :model="result.k8sNamespace[0].traefikServersTransport[0]"
       />
    </div>
  </div>
</template>

