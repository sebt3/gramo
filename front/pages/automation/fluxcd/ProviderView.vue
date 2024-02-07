<script setup lang="ts">
import fluxcdProviderQuery from '@/queries/fluxcd/Provider.details.graphql'
import ProviderDelete from '@/queries/fluxcd/Provider.delete.graphql'
import fluxcdProviderMeta from '@/components/fluxcd/ProviderMeta.vue';
import fluxcdProviderView from '@/components/fluxcd/ProviderView.vue';
import fluxcdProviderStatus from '@/components/fluxcd/ProviderStatus.vue';
import { useQuery, useMutation, useProvider, ProviderReadExcludes } from '../../../libs/fluxcd/Provider.js'
const { onErrorHandler, notifySuccess, notifyError, onNotProviderFound, navigation, setNamespacedItemFromRoute } = useProvider();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdProviderQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ProviderReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotProviderFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ProviderDelete);
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
      <fluxcdProviderMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdProviderStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdProviderView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
        />
    </div>
  </div>
</template>
