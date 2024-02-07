<script setup lang="ts">
import fluxcdOCIRepositoryQuery from '@/queries/fluxcd/OCIRepository.details.graphql'
import OCIRepositoryDelete from '@/queries/fluxcd/OCIRepository.delete.graphql'
import fluxcdOCIRepositoryMeta from '@/components/fluxcd/OCIRepositoryMeta.vue';
import fluxcdOCIRepositoryView from '@/components/fluxcd/OCIRepositoryView.vue';
import fluxcdOCIRepositoryStatus from '@/components/fluxcd/OCIRepositoryStatus.vue';
import { useQuery, useMutation, useOCIRepository, OCIRepositoryReadExcludes } from '../../../libs/fluxcd/OCIRepository.js'
const { onErrorHandler, notifySuccess, notifyError, onNotOCIRepositoryFound, navigation, setNamespacedItemFromRoute } = useOCIRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdOCIRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OCIRepositoryReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotOCIRepositoryFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OCIRepositoryDelete);
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
      <fluxcdOCIRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdOCIRepository[0]!=undefined && result.k8sNamespace[0].fluxcdOCIRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdOCIRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdOCIRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdOCIRepository[0]!=undefined && result.k8sNamespace[0].fluxcdOCIRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdOCIRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdOCIRepositoryView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdOCIRepository[0]!=undefined && result.k8sNamespace[0].fluxcdOCIRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdOCIRepository[0]"
        />
    </div>
  </div>
</template>
