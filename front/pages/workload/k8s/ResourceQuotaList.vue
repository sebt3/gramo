<script setup lang="ts">
import k8sResourceQuotaQuery from '@/queries/k8s/ResourceQuota.read.graphql'
import ResourceQuotaDelete from '@/queries/k8s/ResourceQuota.delete.graphql'
import k8sResourceQuotaList from '@/components/k8s/ResourceQuotaList.vue';
import { useQuery, useMutation, useResourceQuota, ResourceQuotaListExcludes } from '../../../libs/k8s/ResourceQuota.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useResourceQuota();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sResourceQuotaQuery, {
  "obj": {
    "filters": [],
    "excludes": ResourceQuotaListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ResourceQuotaDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sResourceQuotaList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sResourceQuota).flat()"
  />
</template>