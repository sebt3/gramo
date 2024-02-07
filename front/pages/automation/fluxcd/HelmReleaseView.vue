<script setup lang="ts">
import fluxcdHelmReleaseQuery from '@/queries/fluxcd/HelmRelease.details.graphql'
import HelmReleaseDelete from '@/queries/fluxcd/HelmRelease.delete.graphql'
import fluxcdHelmReleaseMeta from '@/components/fluxcd/HelmReleaseMeta.vue';
import fluxcdHelmReleaseView from '@/components/fluxcd/HelmReleaseView.vue';
import fluxcdHelmReleaseStatus from '@/components/fluxcd/HelmReleaseStatus.vue';
import { useQuery, useMutation, useHelmRelease, HelmReleaseReadExcludes } from '../../../libs/fluxcd/HelmRelease.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHelmReleaseFound, navigation, setNamespacedItemFromRoute } = useHelmRelease();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmReleaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmReleaseReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotHelmReleaseFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmReleaseDelete);
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
      <fluxcdHelmReleaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRelease[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRelease[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRelease[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdHelmReleaseStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRelease[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRelease[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRelease[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdHelmReleaseView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRelease[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRelease[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRelease[0]"
        />
    </div>
  </div>
</template>
