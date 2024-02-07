<script setup lang="ts">
import traefikIngressRouteUDPQuery from '@/queries/traefik/IngressRouteUDP.read.graphql'
import IngressRouteUDPDelete from '@/queries/traefik/IngressRouteUDP.delete.graphql'
import traefikIngressRouteUDPList from '@/components/traefik/IngressRouteUDPList.vue';
import { useQuery, useMutation, useIngressRouteUDP, IngressRouteUDPListExcludes } from '../../../libs/traefik/IngressRouteUDP.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useIngressRouteUDP();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikIngressRouteUDPQuery, {
  "obj": {
    "filters": [],
    "excludes": IngressRouteUDPListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressRouteUDPDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikIngressRouteUDPList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikIngressRouteUDP).flat()"
  />
</template>