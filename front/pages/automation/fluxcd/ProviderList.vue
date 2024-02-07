<script setup lang="ts">
import fluxcdProviderQuery from '@/queries/fluxcd/Provider.read.graphql'
import ProviderDelete from '@/queries/fluxcd/Provider.delete.graphql'
import fluxcdProviderList from '@/components/fluxcd/ProviderList.vue';
import { useQuery, useMutation, useProvider, ProviderListExcludes } from '../../../libs/fluxcd/Provider.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useProvider();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdProviderQuery, {
  "obj": {
    "filters": [],
    "excludes": ProviderListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ProviderDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdProviderList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdProvider).flat()"
  />
</template>