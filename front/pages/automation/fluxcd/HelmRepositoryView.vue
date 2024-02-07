<script setup lang="ts">
import fluxcdHelmRepositoryQuery from '@/queries/fluxcd/HelmRepository.details.graphql'
import HelmRepositoryDelete from '@/queries/fluxcd/HelmRepository.delete.graphql'
import fluxcdHelmRepositoryMeta from '@/components/fluxcd/HelmRepositoryMeta.vue';
import fluxcdHelmRepositoryView from '@/components/fluxcd/HelmRepositoryView.vue';
import fluxcdHelmRepositoryStatus from '@/components/fluxcd/HelmRepositoryStatus.vue';
import { useQuery, useMutation, useHelmRepository, HelmRepositoryReadExcludes } from '../../../libs/fluxcd/HelmRepository.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHelmRepositoryFound, navigation, setNamespacedItemFromRoute } = useHelmRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmRepositoryReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotHelmRepositoryFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmRepositoryDelete);
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
      <fluxcdHelmRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdHelmRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdHelmRepositoryView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
        />
    </div>
  </div>
</template>
