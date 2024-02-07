<script setup lang="ts">
import fluxcdImageRepositoryQuery from '@/queries/fluxcd/ImageRepository.details.graphql'
import ImageRepositoryDelete from '@/queries/fluxcd/ImageRepository.delete.graphql'
import fluxcdImageRepositoryMeta from '@/components/fluxcd/ImageRepositoryMeta.vue';
import fluxcdImageRepositoryView from '@/components/fluxcd/ImageRepositoryView.vue';
import fluxcdImageRepositoryStatus from '@/components/fluxcd/ImageRepositoryStatus.vue';
import { useQuery, useMutation, useImageRepository, ImageRepositoryReadExcludes } from '../../../libs/fluxcd/ImageRepository.js'
const { onErrorHandler, notifySuccess, notifyError, onNotImageRepositoryFound, navigation, setNamespacedItemFromRoute } = useImageRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImageRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ImageRepositoryReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotImageRepositoryFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ImageRepositoryDelete);
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
      <fluxcdImageRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageRepository[0]!=undefined && result.k8sNamespace[0].fluxcdImageRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdImageRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageRepository[0]!=undefined && result.k8sNamespace[0].fluxcdImageRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdImageRepositoryView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageRepository[0]!=undefined && result.k8sNamespace[0].fluxcdImageRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageRepository[0]"
        />
    </div>
  </div>
</template>
