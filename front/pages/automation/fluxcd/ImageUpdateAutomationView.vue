<script setup lang="ts">
import fluxcdImageUpdateAutomationQuery from '@/queries/fluxcd/ImageUpdateAutomation.details.graphql'
import ImageUpdateAutomationDelete from '@/queries/fluxcd/ImageUpdateAutomation.delete.graphql'
import fluxcdImageUpdateAutomationMeta from '@/components/fluxcd/ImageUpdateAutomationMeta.vue';
import fluxcdImageUpdateAutomationView from '@/components/fluxcd/ImageUpdateAutomationView.vue';
import fluxcdImageUpdateAutomationStatus from '@/components/fluxcd/ImageUpdateAutomationStatus.vue';
import { useQuery, useMutation, useImageUpdateAutomation, ImageUpdateAutomationReadExcludes } from '../../../libs/fluxcd/ImageUpdateAutomation.js'
const { onErrorHandler, notifySuccess, notifyError, onNotImageUpdateAutomationFound, navigation, setNamespacedItemFromRoute } = useImageUpdateAutomation();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdImageUpdateAutomationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ImageUpdateAutomationReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotImageUpdateAutomationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ImageUpdateAutomationDelete);
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
      <fluxcdImageUpdateAutomationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=undefined && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdImageUpdateAutomationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=undefined && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdImageUpdateAutomationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=undefined && result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]!=null"
        :model="result.k8sNamespace[0].fluxcdImageUpdateAutomation[0]"
        />
    </div>
  </div>
</template>
