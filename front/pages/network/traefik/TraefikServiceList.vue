<script setup lang="ts">
import traefikTraefikServiceQuery from '@/queries/traefik/TraefikService.read.graphql'
import TraefikServiceDelete from '@/queries/traefik/TraefikService.delete.graphql'
import traefikTraefikServiceList from '@/components/traefik/TraefikServiceList.vue';
import { useQuery, useMutation, useTraefikService, TraefikServiceListExcludes } from '../../../libs/traefik/TraefikService.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useTraefikService();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikTraefikServiceQuery, {
  "obj": {
    "filters": [],
    "excludes": TraefikServiceListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TraefikServiceDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikTraefikServiceList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikTraefikService).flat()"
  />
</template>