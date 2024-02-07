<script setup lang="ts">
import oracleInnoDBClusterQuery from '@/queries/oracle/InnoDBCluster.details.graphql'
import InnoDBClusterDelete from '@/queries/oracle/InnoDBCluster.delete.graphql'
import oracleInnoDBClusterMeta from '@/components/oracle/InnoDBClusterMeta.vue';
import oracleInnoDBClusterView from '@/components/oracle/InnoDBClusterView.vue';
import oracleInnoDBClusterStatus from '@/components/oracle/InnoDBClusterStatus.vue';
import { useQuery, useMutation, useInnoDBCluster, InnoDBClusterReadExcludes } from '../../../libs/oracle/InnoDBCluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotInnoDBClusterFound, navigation, setNamespacedItemFromRoute } = useInnoDBCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(oracleInnoDBClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InnoDBClusterReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotInnoDBClusterFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InnoDBClusterDelete);
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
      <oracleInnoDBClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleInnoDBCluster[0]!=undefined && result.k8sNamespace[0].oracleInnoDBCluster[0]!=null"
        :model="result.k8sNamespace[0].oracleInnoDBCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <oracleInnoDBClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleInnoDBCluster[0]!=undefined && result.k8sNamespace[0].oracleInnoDBCluster[0]!=null"
        :model="result.k8sNamespace[0].oracleInnoDBCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <oracleInnoDBClusterView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleInnoDBCluster[0]!=undefined && result.k8sNamespace[0].oracleInnoDBCluster[0]!=null"
        :model="result.k8sNamespace[0].oracleInnoDBCluster[0]"
        />
    </div>
  </div>
</template>
