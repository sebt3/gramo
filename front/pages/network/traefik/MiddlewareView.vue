<script setup lang="ts">
import traefikMiddlewareQuery from '@/queries/traefik/Middleware.details.graphql'
import MiddlewareDelete from '@/queries/traefik/Middleware.delete.graphql'
import traefikMiddlewareMeta from '@/components/traefik/MiddlewareMeta.vue';
import traefikMiddlewareView from '@/components/traefik/MiddlewareView.vue';
import { useQuery, useMutation, useMiddleware, MiddlewareReadExcludes } from '../../../libs/traefik/Middleware.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMiddlewareFound, navigation, setNamespacedItemFromRoute } = useMiddleware();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikMiddlewareQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MiddlewareReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotMiddlewareFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MiddlewareDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3">
      <traefikMiddlewareMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddleware[0]!=undefined && result.k8sNamespace[0].traefikMiddleware[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddleware[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikMiddlewareView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddleware[0]!=undefined && result.k8sNamespace[0].traefikMiddleware[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddleware[0]"
        />
    </div>
  </div>
</template>
