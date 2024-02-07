<script setup lang="ts">
import certmanagerClusterIssuerQuery from '@/queries/certmanager/ClusterIssuer.details.graphql'
import ClusterIssuerDelete from '@/queries/certmanager/ClusterIssuer.delete.graphql'
import certmanagerClusterIssuerMeta from '@/components/certmanager/ClusterIssuerMeta.vue';
import certmanagerClusterIssuerView from '@/components/certmanager/ClusterIssuerView.vue';
import certmanagerClusterIssuerStatus from '@/components/certmanager/ClusterIssuerStatus.vue';
import { useQuery, useMutation, useClusterIssuer, ClusterIssuerReadExcludes } from '../../../libs/certmanager/ClusterIssuer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterIssuerFound, navigation, setItemFromRoute } = useClusterIssuer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerClusterIssuerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterIssuerReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotClusterIssuerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterIssuerDelete);
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
      <certmanagerClusterIssuerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerClusterIssuerStatus
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerClusterIssuerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
        />
    </div>
  </div>
</template>
