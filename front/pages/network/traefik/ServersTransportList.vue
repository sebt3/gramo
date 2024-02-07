<script setup lang="ts">
import traefikServersTransportQuery from '@/queries/traefik/ServersTransport.read.graphql'
import ServersTransportDelete from '@/queries/traefik/ServersTransport.delete.graphql'
import traefikServersTransportList from '@/components/traefik/ServersTransportList.vue';
import { useQuery, useMutation, useServersTransport, ServersTransportListExcludes } from '../../../libs/traefik/ServersTransport.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useServersTransport();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikServersTransportQuery, {
  "obj": {
    "filters": [],
    "excludes": ServersTransportListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServersTransportDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikServersTransportList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikServersTransport).flat()"
  />
</template>