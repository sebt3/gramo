<script setup lang="ts">
import mariadbDatabaseQuery from '@/queries/mariadb/Database.details.graphql'
import DatabaseDelete from '@/queries/mariadb/Database.delete.graphql'
import mariadbDatabaseMeta from '@/components/mariadb/DatabaseMeta.vue';
import mariadbDatabaseView from '@/components/mariadb/DatabaseView.vue';
import mariadbDatabaseStatus from '@/components/mariadb/DatabaseStatus.vue';
import { useQuery, useMutation, useDatabase, DatabaseReadExcludes } from '../../../libs/mariadb/Database.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDatabaseFound, navigation, setNamespacedItemFromRoute } = useDatabase();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbDatabaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DatabaseReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotDatabaseFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DatabaseDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbDatabaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbDatabaseStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbDatabaseView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
        />
    </div>
  </div>
</template>
