<script setup lang="ts">
import certmanagerOrderQuery from '@/queries/certmanager/Order.details.graphql'
import OrderDelete from '@/queries/certmanager/Order.delete.graphql'
import certmanagerOrderMeta from '@/components/certmanager/OrderMeta.vue';
import certmanagerOrderView from '@/components/certmanager/OrderView.vue';
import certmanagerOrderStatus from '@/components/certmanager/OrderStatus.vue';
import { useQuery, useMutation, useOrder, OrderReadExcludes } from '../../../libs/certmanager/Order.js'
const { onErrorHandler, notifySuccess, notifyError, onNotOrderFound, navigation, setNamespacedItemFromRoute } = useOrder();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerOrderQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OrderReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotOrderFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OrderDelete);
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
      <certmanagerOrderMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerOrder[0]!=undefined && result.k8sNamespace[0].certmanagerOrder[0]!=null"
        :model="result.k8sNamespace[0].certmanagerOrder[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerOrderStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerOrder[0]!=undefined && result.k8sNamespace[0].certmanagerOrder[0]!=null"
        :model="result.k8sNamespace[0].certmanagerOrder[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerOrderView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerOrder[0]!=undefined && result.k8sNamespace[0].certmanagerOrder[0]!=null"
        :model="result.k8sNamespace[0].certmanagerOrder[0]"
        />
    </div>
  </div>
</template>
