<script setup lang="ts">
import k8sServiceAccountQuery from '@/queries/k8s/ServiceAccount.read.graphql'
import ServiceAccountDelete from '@/queries/k8s/ServiceAccount.delete.graphql'
import k8sServiceAccountList from '@/components/k8s/ServiceAccountList.vue';
import { useQuery, useMutation, useServiceAccount, ServiceAccountListExcludes } from '../../../libs/k8s/ServiceAccount.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useServiceAccount();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sServiceAccountQuery, {
  "obj": {
    "filters": [],
    "excludes": ServiceAccountListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceAccountDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sServiceAccountList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sServiceAccount).flat()"
  />
</template>