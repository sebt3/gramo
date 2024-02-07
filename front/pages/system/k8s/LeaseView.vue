<script setup lang="ts">
import k8sLeaseQuery from '@/queries/k8s/Lease.details.graphql'
import LeaseDelete from '@/queries/k8s/Lease.delete.graphql'
import k8sLeaseMeta from '@/components/k8s/LeaseMeta.vue';
import k8sLeaseView from '@/components/k8s/LeaseView.vue';
import { useQuery, useMutation, useLease, LeaseReadExcludes } from '../../../libs/k8s/Lease.js'
const { onErrorHandler, notifySuccess, notifyError, onNotLeaseFound, navigation, setNamespacedItemFromRoute } = useLease();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sLeaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": LeaseReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotLeaseFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(LeaseDelete);
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
    <div class="col-md-3">
      <k8sLeaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLease[0]!=undefined && result.k8sNamespace[0].k8sLease[0]!=null"
        :model="result.k8sNamespace[0].k8sLease[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sLeaseView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLease[0]!=undefined && result.k8sNamespace[0].k8sLease[0]!=null"
        :model="result.k8sNamespace[0].k8sLease[0]"
        />
    </div>
  </div>
</template>
