<script setup lang="ts">
import fluxcdAlertQuery from '@/queries/fluxcd/Alert.details.graphql'
import AlertDelete from '@/queries/fluxcd/Alert.delete.graphql'
import fluxcdAlertMeta from '@/components/fluxcd/AlertMeta.vue';
import fluxcdAlertView from '@/components/fluxcd/AlertView.vue';
import fluxcdAlertStatus from '@/components/fluxcd/AlertStatus.vue';
import { useQuery, useMutation, useAlert, AlertReadExcludes } from '../../../libs/fluxcd/Alert.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAlertFound, navigation, setNamespacedItemFromRoute } = useAlert();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdAlertQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotAlertFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertDelete);
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
      <fluxcdAlertMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdAlertStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdAlertView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
        />
    </div>
  </div>
</template>
