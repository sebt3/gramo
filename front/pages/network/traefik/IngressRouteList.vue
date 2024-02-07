<script setup lang="ts">
import traefikIngressRouteQuery from '@/queries/traefik/IngressRoute.read.graphql'
import IngressRouteDelete from '@/queries/traefik/IngressRoute.delete.graphql'
import traefikIngressRouteList from '@/components/traefik/IngressRouteList.vue';
import { useQuery, useMutation, useIngressRoute, IngressRouteListExcludes } from '../../../libs/traefik/IngressRoute.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useIngressRoute();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikIngressRouteQuery, {
  "obj": {
    "filters": [],
    "excludes": IngressRouteListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressRouteDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikIngressRouteList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikIngressRoute).flat()"
  />
</template>