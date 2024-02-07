<script setup lang="ts">
import zalandopostgresqlQuery from '@/queries/zalando/postgresql.details.graphql'
import postgresqlDelete from '@/queries/zalando/postgresql.delete.graphql'
import zalandopostgresqlMeta from '@/components/zalando/postgresqlMeta.vue';
import zalandopostgresqlView from '@/components/zalando/postgresqlView.vue';
import zalandopostgresqlStatus from '@/components/zalando/postgresqlStatus.vue';
import { useQuery, useMutation, usepostgresql, postgresqlReadExcludes } from '../../../libs/zalando/postgresql.js'
const { onErrorHandler, notifySuccess, notifyError, onNotpostgresqlFound, navigation, setNamespacedItemFromRoute } = usepostgresql();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandopostgresqlQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": postgresqlReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotpostgresqlFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(postgresqlDelete);
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
      <zalandopostgresqlMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandopostgresql[0]!=undefined && result.k8sNamespace[0].zalandopostgresql[0]!=null"
        :model="result.k8sNamespace[0].zalandopostgresql[0]"
       />
    </div>
    <div class="col-md-6">
      <zalandopostgresqlStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandopostgresql[0]!=undefined && result.k8sNamespace[0].zalandopostgresql[0]!=null"
        :model="result.k8sNamespace[0].zalandopostgresql[0]"
       />
    </div>
    <div class="col-md-12">
      <zalandopostgresqlView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandopostgresql[0]!=undefined && result.k8sNamespace[0].zalandopostgresql[0]!=null"
        :model="result.k8sNamespace[0].zalandopostgresql[0]"
        />
    </div>
  </div>
</template>
