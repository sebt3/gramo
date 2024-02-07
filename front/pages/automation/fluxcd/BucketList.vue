<script setup lang="ts">
import fluxcdBucketQuery from '@/queries/fluxcd/Bucket.read.graphql'
import BucketDelete from '@/queries/fluxcd/Bucket.delete.graphql'
import fluxcdBucketList from '@/components/fluxcd/BucketList.vue';
import { useQuery, useMutation, useBucket, BucketListExcludes } from '../../../libs/fluxcd/Bucket.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useBucket();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdBucketQuery, {
  "obj": {
    "filters": [],
    "excludes": BucketListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BucketDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdBucketList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdBucket).flat()"
  />
</template>