<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJob.read.graphql'
import SqlJobDelete from '@/queries/mariadb/SqlJob.delete.graphql'
import mariadbSqlJobList from '@/components/mariadb/SqlJobList.vue';
import { useQuery, useMutation, useSqlJob, SqlJobListExcludes } from '../../../libs/mariadb/SqlJob.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useSqlJob();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbSqlJobQuery, {
  "obj": {
    "filters": [],
    "excludes": SqlJobListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SqlJobDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbSqlJobList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbSqlJob).flat()"
  />
</template>