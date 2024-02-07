<script setup lang="ts">
import traefikIngressRouteQuery from '@/queries/traefik/IngressRoute.details.graphql'
import IngressRouteDelete from '@/queries/traefik/IngressRoute.delete.graphql'
import traefikIngressRouteMeta from '@/components/traefik/IngressRouteMeta.vue';
import traefikIngressRouteView from '@/components/traefik/IngressRouteView.vue';
import { useQuery, useMutation, useIngressRoute, IngressRouteReadExcludes } from '../../../libs/traefik/IngressRoute.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIngressRouteFound, navigation, setNamespacedItemFromRoute } = useIngressRoute();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikIngressRouteQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressRouteReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIngressRouteFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressRouteDelete);
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
      <traefikIngressRouteMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRoute[0]!=undefined && result.k8sNamespace[0].traefikIngressRoute[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRoute[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikIngressRouteView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRoute[0]!=undefined && result.k8sNamespace[0].traefikIngressRoute[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRoute[0]"
        />
    </div>
  </div>
</template>
