<script setup lang="ts">
import certmanagerOrderQuery from '@/queries/certmanager/Order.read.graphql'
import OrderDelete from '@/queries/certmanager/Order.delete.graphql'
import certmanagerOrderList from '@/components/certmanager/OrderList.vue';
import { useQuery, useMutation, useOrder, OrderListExcludes } from '../../../libs/certmanager/Order.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useOrder();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(certmanagerOrderQuery, {
  "obj": {
    "filters": [],
    "excludes": OrderListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OrderDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <certmanagerOrderList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.certmanagerOrder).flat()"
  />
</template>