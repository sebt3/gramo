<script setup lang="ts">
import mariadbGrantQuery from '@/queries/mariadb/Grant.read.graphql'
import GrantDelete from '@/queries/mariadb/Grant.delete.graphql'
import mariadbGrantList from '@/components/mariadb/GrantList.vue';
import { useQuery, useMutation, useGrant, GrantListExcludes } from '../../../libs/mariadb/Grant.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useGrant();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbGrantQuery, {
  "obj": {
    "filters": [],
    "excludes": GrantListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GrantDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbGrantList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbGrant).flat()"
  />
</template>