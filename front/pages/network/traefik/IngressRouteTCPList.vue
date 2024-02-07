<script setup lang="ts">
import traefikIngressRouteTCPQuery from '@/queries/traefik/IngressRouteTCP.read.graphql'
import IngressRouteTCPDelete from '@/queries/traefik/IngressRouteTCP.delete.graphql'
import traefikIngressRouteTCPList from '@/components/traefik/IngressRouteTCPList.vue';
import { useQuery, useMutation, useIngressRouteTCP, IngressRouteTCPListExcludes } from '../../../libs/traefik/IngressRouteTCP.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useIngressRouteTCP();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikIngressRouteTCPQuery, {
  "obj": {
    "filters": [],
    "excludes": IngressRouteTCPListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressRouteTCPDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikIngressRouteTCPList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikIngressRouteTCP).flat()"
  />
</template>