<script setup lang="ts">
import mariadbConnectionQuery from '@/queries/mariadb/Connection.details.graphql'
import ConnectionDelete from '@/queries/mariadb/Connection.delete.graphql'
import mariadbConnectionMeta from '@/components/mariadb/ConnectionMeta.vue';
import mariadbConnectionView from '@/components/mariadb/ConnectionView.vue';
import mariadbConnectionStatus from '@/components/mariadb/ConnectionStatus.vue';
import { useQuery, useMutation, useConnection, ConnectionReadExcludes } from '../../../libs/mariadb/Connection.js'
const { onErrorHandler, notifySuccess, notifyError, onNotConnectionFound, navigation, setNamespacedItemFromRoute } = useConnection();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbConnectionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ConnectionReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotConnectionFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ConnectionDelete);
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
      <mariadbConnectionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbConnectionStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbConnectionView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
        />
    </div>
  </div>
</template>
