<script setup lang="ts">
import monitoringAlertmanagerQuery from '@/queries/monitoring/Alertmanager.read.graphql'
import AlertmanagerDelete from '@/queries/monitoring/Alertmanager.delete.graphql'
import monitoringAlertmanagerList from '@/components/monitoring/AlertmanagerList.vue';
import { useQuery, useMutation, useAlertmanager, AlertmanagerListExcludes } from '../../../libs/monitoring/Alertmanager.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useAlertmanager();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringAlertmanagerQuery, {
  "obj": {
    "filters": [],
    "excludes": AlertmanagerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertmanagerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringAlertmanagerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringAlertmanager).flat()"
  />
</template>