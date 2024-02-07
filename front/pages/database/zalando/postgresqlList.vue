<script setup lang="ts">
import zalandopostgresqlQuery from '@/queries/zalando/postgresql.read.graphql'
import postgresqlDelete from '@/queries/zalando/postgresql.delete.graphql'
import zalandopostgresqlList from '@/components/zalando/postgresqlList.vue';
import { useQuery, useMutation, usepostgresql, postgresqlListExcludes } from '../../../libs/zalando/postgresql.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usepostgresql();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(zalandopostgresqlQuery, {
  "obj": {
    "filters": [],
    "excludes": postgresqlListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(postgresqlDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <zalandopostgresqlList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.zalandopostgresql).flat()"
  />
</template>