<script setup lang="ts">
import fluxcdBucketQuery from '@/queries/fluxcd/Bucket.read.graphql'
import BucketEdit from '@/queries/fluxcd/Bucket.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdBucketMeta from '@/components/fluxcd/BucketMeta.vue';
import fluxcdBucketEdit from '@/components/fluxcd/BucketEdit.vue';
import fluxcdBucketStatus from '@/components/fluxcd/BucketStatus.vue';
import { useQuery, useMutation, sanitizeData, useBucket, BucketSimpleExcludes } from '../../../libs/fluxcd/Bucket.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBucketFound, navigation, editor, setNamespacedItemFromRoute } = useBucket();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdBucketQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BucketSimpleExcludes
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
});
const { mutate: patchBucket, onDone: onPatchBucket, onError: onPatchError } = useMutation(BucketEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBucket({
    "name": result.k8sNamespace[0].fluxcdBucket[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdBucket[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBucketFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdBucket[0])});onPatchBucket(patchDone);onPatchError(patchError);
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
      <fluxcdBucketEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
       />
    </div>
  </div>
</template>

