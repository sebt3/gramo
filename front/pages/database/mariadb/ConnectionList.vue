<script setup lang="ts">
import mariadbConnectionQuery from '@/queries/mariadb/Connection.read.graphql'
import ConnectionDelete from '@/queries/mariadb/Connection.delete.graphql'
import mariadbConnectionList from '@/components/mariadb/ConnectionList.vue';
import { useQuery, useMutation, useConnection, ConnectionListExcludes } from '../../../libs/mariadb/Connection.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useConnection();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbConnectionQuery, {
  "obj": {
    "filters": [],
    "excludes": ConnectionListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ConnectionDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbConnectionList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbConnection).flat()"
  />
</template>