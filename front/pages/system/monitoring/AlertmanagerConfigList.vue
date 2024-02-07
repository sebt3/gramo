<script setup lang="ts">
import monitoringAlertmanagerConfigQuery from '@/queries/monitoring/AlertmanagerConfig.read.graphql'
import AlertmanagerConfigDelete from '@/queries/monitoring/AlertmanagerConfig.delete.graphql'
import monitoringAlertmanagerConfigList from '@/components/monitoring/AlertmanagerConfigList.vue';
import { useQuery, useMutation, useAlertmanagerConfig, AlertmanagerConfigListExcludes } from '../../../libs/monitoring/AlertmanagerConfig.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useAlertmanagerConfig();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringAlertmanagerConfigQuery, {
  "obj": {
    "filters": [],
    "excludes": AlertmanagerConfigListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertmanagerConfigDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringAlertmanagerConfigList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringAlertmanagerConfig).flat()"
  />
</template>