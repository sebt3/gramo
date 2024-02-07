<script setup lang="ts">
import cnpgPoolerQuery from '@/queries/cnpg/Pooler.read.graphql'
import PoolerDelete from '@/queries/cnpg/Pooler.delete.graphql'
import cnpgPoolerList from '@/components/cnpg/PoolerList.vue';
import { useQuery, useMutation, usePooler, PoolerListExcludes } from '../../../libs/cnpg/Pooler.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePooler();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(cnpgPoolerQuery, {
  "obj": {
    "filters": [],
    "excludes": PoolerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PoolerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <cnpgPoolerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.cnpgPooler).flat()"
  />
</template>