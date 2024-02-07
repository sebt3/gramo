<script setup lang="ts">
import traefikMiddlewareTCPQuery from '@/queries/traefik/MiddlewareTCP.read.graphql'
import MiddlewareTCPDelete from '@/queries/traefik/MiddlewareTCP.delete.graphql'
import traefikMiddlewareTCPList from '@/components/traefik/MiddlewareTCPList.vue';
import { useQuery, useMutation, useMiddlewareTCP, MiddlewareTCPListExcludes } from '../../../libs/traefik/MiddlewareTCP.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useMiddlewareTCP();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikMiddlewareTCPQuery, {
  "obj": {
    "filters": [],
    "excludes": MiddlewareTCPListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MiddlewareTCPDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikMiddlewareTCPList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikMiddlewareTCP).flat()"
  />
</template>