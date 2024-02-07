<script setup lang="ts">
import fluxcdKustomizationQuery from '@/queries/fluxcd/Kustomization.details.graphql'
import KustomizationDelete from '@/queries/fluxcd/Kustomization.delete.graphql'
import fluxcdKustomizationMeta from '@/components/fluxcd/KustomizationMeta.vue';
import fluxcdKustomizationView from '@/components/fluxcd/KustomizationView.vue';
import fluxcdKustomizationStatus from '@/components/fluxcd/KustomizationStatus.vue';
import { useQuery, useMutation, useKustomization, KustomizationReadExcludes } from '../../../libs/fluxcd/Kustomization.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKustomizationFound, navigation, setNamespacedItemFromRoute } = useKustomization();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdKustomizationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KustomizationReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotKustomizationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KustomizationDelete);
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
      <fluxcdKustomizationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdKustomizationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdKustomizationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
        />
    </div>
  </div>
</template>
