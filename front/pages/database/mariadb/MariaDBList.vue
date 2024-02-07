<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDB.read.graphql'
import MariaDBDelete from '@/queries/mariadb/MariaDB.delete.graphql'
import mariadbMariaDBList from '@/components/mariadb/MariaDBList.vue';
import { useQuery, useMutation, useMariaDB, MariaDBListExcludes } from '../../../libs/mariadb/MariaDB.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useMariaDB();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbMariaDBQuery, {
  "obj": {
    "filters": [],
    "excludes": MariaDBListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MariaDBDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbMariaDBList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbMariaDB).flat()"
  />
</template>