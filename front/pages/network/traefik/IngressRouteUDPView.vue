<script setup lang="ts">
import traefikIngressRouteUDPQuery from '@/queries/traefik/IngressRouteUDP.details.graphql'
import IngressRouteUDPDelete from '@/queries/traefik/IngressRouteUDP.delete.graphql'
import traefikIngressRouteUDPMeta from '@/components/traefik/IngressRouteUDPMeta.vue';
import traefikIngressRouteUDPView from '@/components/traefik/IngressRouteUDPView.vue';
import { useQuery, useMutation, useIngressRouteUDP, IngressRouteUDPReadExcludes } from '../../../libs/traefik/IngressRouteUDP.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIngressRouteUDPFound, navigation, setNamespacedItemFromRoute } = useIngressRouteUDP();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikIngressRouteUDPQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressRouteUDPReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIngressRouteUDPFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressRouteUDPDelete);
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
      <traefikIngressRouteUDPMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteUDP[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikIngressRouteUDPView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteUDP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteUDP[0]"
        />
    </div>
  </div>
</template>
