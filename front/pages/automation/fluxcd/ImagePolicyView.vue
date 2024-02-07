<script setup lang="ts">
import fluxcdImagePolicyQuery from '@/queries/fluxcd/ImagePolicy.details.graphql'
import ImagePolicyDelete from '@/queries/fluxcd/ImagePolicy.delete.graphql'
import fluxcdImagePolicyMeta from '@/components/fluxcd/ImagePolicyMeta.vue';
import fluxcdImagePolicyView from '@/components/fluxcd/ImagePolicyView.vue';
import fluxcdImagePolicyStatus from '@/components/fluxcd/ImagePolicyStatus.vue';
import { useQuery, useMutation, useImagePolicy, ImagePolicyReadExcludes } from '../../../libs/fluxcd/ImagePolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotImagePolicyFound, navigation, setNamespacedItemFromRoute } = useImagePolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImagePolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ImagePolicyReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotImagePolicyFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ImagePolicyDelete);
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
      <fluxcdImagePolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImagePolicy[0]!=undefined && result.k8sNamespace[0].fluxcdImagePolicy[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImagePolicy[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdImagePolicyStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImagePolicy[0]!=undefined && result.k8sNamespace[0].fluxcdImagePolicy[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImagePolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdImagePolicyView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImagePolicy[0]!=undefined && result.k8sNamespace[0].fluxcdImagePolicy[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImagePolicy[0]"
        />
    </div>
  </div>
</template>
