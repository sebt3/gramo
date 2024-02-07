<script setup lang="ts">
import traefikTLSOptionQuery from '@/queries/traefik/TLSOption.read.graphql'
import TLSOptionDelete from '@/queries/traefik/TLSOption.delete.graphql'
import traefikTLSOptionList from '@/components/traefik/TLSOptionList.vue';
import { useQuery, useMutation, useTLSOption, TLSOptionListExcludes } from '../../../libs/traefik/TLSOption.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useTLSOption();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikTLSOptionQuery, {
  "obj": {
    "filters": [],
    "excludes": TLSOptionListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TLSOptionDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikTLSOptionList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikTLSOption).flat()"
  />
</template>