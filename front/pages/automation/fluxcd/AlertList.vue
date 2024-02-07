<script setup lang="ts">
import fluxcdAlertQuery from '@/queries/fluxcd/Alert.read.graphql'
import AlertDelete from '@/queries/fluxcd/Alert.delete.graphql'
import fluxcdAlertList from '@/components/fluxcd/AlertList.vue';
import { useQuery, useMutation, useAlert, AlertListExcludes } from '../../../libs/fluxcd/Alert.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useAlert();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdAlertQuery, {
  "obj": {
    "filters": [],
    "excludes": AlertListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdAlertList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdAlert).flat()"
  />
</template>