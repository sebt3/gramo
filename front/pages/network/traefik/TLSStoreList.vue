<script setup lang="ts">
import traefikTLSStoreQuery from '@/queries/traefik/TLSStore.read.graphql'
import TLSStoreDelete from '@/queries/traefik/TLSStore.delete.graphql'
import traefikTLSStoreList from '@/components/traefik/TLSStoreList.vue';
import { useQuery, useMutation, useTLSStore, TLSStoreListExcludes } from '../../../libs/traefik/TLSStore.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useTLSStore();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikTLSStoreQuery, {
  "obj": {
    "filters": [],
    "excludes": TLSStoreListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TLSStoreDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikTLSStoreList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikTLSStore).flat()"
  />
</template>