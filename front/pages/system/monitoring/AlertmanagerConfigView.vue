<script setup lang="ts">
import monitoringAlertmanagerConfigQuery from '@/queries/monitoring/AlertmanagerConfig.details.graphql'
import AlertmanagerConfigDelete from '@/queries/monitoring/AlertmanagerConfig.delete.graphql'
import monitoringAlertmanagerConfigMeta from '@/components/monitoring/AlertmanagerConfigMeta.vue';
import monitoringAlertmanagerConfigView from '@/components/monitoring/AlertmanagerConfigView.vue';
import { useQuery, useMutation, useAlertmanagerConfig, AlertmanagerConfigReadExcludes } from '../../../libs/monitoring/AlertmanagerConfig.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAlertmanagerConfigFound, navigation, setNamespacedItemFromRoute } = useAlertmanagerConfig();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerConfigQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertmanagerConfigReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotAlertmanagerConfigFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertmanagerConfigDelete);
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
    <div class="col-md-3">
      <monitoringAlertmanagerConfigMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanagerConfig[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringAlertmanagerConfigView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanagerConfig[0]"
        />
    </div>
  </div>
</template>
