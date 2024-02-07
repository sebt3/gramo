<script setup lang="ts">
import traefikIngressRouteQuery from '@/queries/traefik/IngressRoute.read.graphql'
import IngressRouteEdit from '@/queries/traefik/IngressRoute.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikIngressRouteMeta from '@/components/traefik/IngressRouteMeta.vue';
import traefikIngressRouteEdit from '@/components/traefik/IngressRouteEdit.vue';
import { useQuery, useMutation, sanitizeData, useIngressRoute, IngressRouteSimpleExcludes } from '../../../libs/traefik/IngressRoute.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIngressRouteFound, navigation, editor, setNamespacedItemFromRoute } = useIngressRoute();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikIngressRouteQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressRouteSimpleExcludes
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
const { mutate: patchIngressRoute, onDone: onPatchIngressRoute, onError: onPatchError } = useMutation(IngressRouteEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIngressRoute({
    "name": result.k8sNamespace[0].traefikIngressRoute[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikIngressRoute[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIngressRouteFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikIngressRoute[0])});onPatchIngressRoute(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikIngressRouteMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRoute[0]!=undefined && result.k8sNamespace[0].traefikIngressRoute[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRoute[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikIngressRouteEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRoute[0]!=undefined && result.k8sNamespace[0].traefikIngressRoute[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRoute[0]"
       />
    </div>
  </div>
</template>

