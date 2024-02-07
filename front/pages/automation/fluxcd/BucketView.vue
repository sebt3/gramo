<script setup lang="ts">
import fluxcdBucketQuery from '@/queries/fluxcd/Bucket.details.graphql'
import BucketDelete from '@/queries/fluxcd/Bucket.delete.graphql'
import fluxcdBucketMeta from '@/components/fluxcd/BucketMeta.vue';
import fluxcdBucketView from '@/components/fluxcd/BucketView.vue';
import fluxcdBucketStatus from '@/components/fluxcd/BucketStatus.vue';
import { useQuery, useMutation, useBucket, BucketReadExcludes } from '../../../libs/fluxcd/Bucket.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBucketFound, navigation, setNamespacedItemFromRoute } = useBucket();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdBucketQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BucketReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotBucketFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BucketDelete);
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
      <fluxcdBucketMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdBucketStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdBucketView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
        />
    </div>
  </div>
</template>
