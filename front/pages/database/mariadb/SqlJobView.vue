<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJob.details.graphql'
import SqlJobDelete from '@/queries/mariadb/SqlJob.delete.graphql'
import mariadbSqlJobMeta from '@/components/mariadb/SqlJobMeta.vue';
import mariadbSqlJobView from '@/components/mariadb/SqlJobView.vue';
import mariadbSqlJobStatus from '@/components/mariadb/SqlJobStatus.vue';
import { useQuery, useMutation, useSqlJob, SqlJobReadExcludes } from '../../../libs/mariadb/SqlJob.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSqlJobFound, navigation, setNamespacedItemFromRoute } = useSqlJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbSqlJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SqlJobReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotSqlJobFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SqlJobDelete);
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
      <mariadbSqlJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbSqlJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbSqlJobView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
        />
    </div>
  </div>
</template>
