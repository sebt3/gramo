<script setup lang="ts">
import mariadbDatabaseQuery from '@/queries/mariadb/Database.read.graphql'
import DatabaseDelete from '@/queries/mariadb/Database.delete.graphql'
import mariadbDatabaseList from '@/components/mariadb/DatabaseList.vue';
import { useQuery, useMutation, useDatabase, DatabaseListExcludes } from '../../../libs/mariadb/Database.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useDatabase();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbDatabaseQuery, {
  "obj": {
    "filters": [],
    "excludes": DatabaseListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DatabaseDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbDatabaseList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbDatabase).flat()"
  />
</template>