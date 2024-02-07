<script setup lang="ts">
import k8sLimitRangeQuery from '@/queries/k8s/LimitRange.read.graphql'
import LimitRangeDelete from '@/queries/k8s/LimitRange.delete.graphql'
import k8sLimitRangeList from '@/components/k8s/LimitRangeList.vue';
import { useQuery, useMutation, useLimitRange, LimitRangeListExcludes } from '../../../libs/k8s/LimitRange.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useLimitRange();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sLimitRangeQuery, {
  "obj": {
    "filters": [],
    "excludes": LimitRangeListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(LimitRangeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sLimitRangeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sLimitRange).flat()"
  />
</template>