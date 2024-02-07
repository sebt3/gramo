<script setup lang="ts">
import traefikMiddlewareQuery from '@/queries/traefik/Middleware.read.graphql'
import MiddlewareEdit from '@/queries/traefik/Middleware.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikMiddlewareMeta from '@/components/traefik/MiddlewareMeta.vue';
import traefikMiddlewareEdit from '@/components/traefik/MiddlewareEdit.vue';
import { useQuery, useMutation, sanitizeData, useMiddleware, MiddlewareSimpleExcludes } from '../../../libs/traefik/Middleware.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotMiddlewareFound, navigation, editor, setNamespacedItemFromRoute } = useMiddleware();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikMiddlewareQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MiddlewareSimpleExcludes
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
const { mutate: patchMiddleware, onDone: onPatchMiddleware, onError: onPatchError } = useMutation(MiddlewareEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMiddleware({
    "name": result.k8sNamespace[0].traefikMiddleware[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikMiddleware[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotMiddlewareFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikMiddleware[0])});onPatchMiddleware(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikMiddlewareMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddleware[0]!=undefined && result.k8sNamespace[0].traefikMiddleware[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddleware[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikMiddlewareEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddleware[0]!=undefined && result.k8sNamespace[0].traefikMiddleware[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddleware[0]"
       />
    </div>
  </div>
</template>

