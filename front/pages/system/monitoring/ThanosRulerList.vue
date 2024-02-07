<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRuler.read.graphql'
import ThanosRulerDelete from '@/queries/monitoring/ThanosRuler.delete.graphql'
import monitoringThanosRulerList from '@/components/monitoring/ThanosRulerList.vue';
import { useQuery, useMutation, useThanosRuler, ThanosRulerListExcludes } from '../../../libs/monitoring/ThanosRuler.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useThanosRuler();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringThanosRulerQuery, {
  "obj": {
    "filters": [],
    "excludes": ThanosRulerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ThanosRulerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringThanosRulerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringThanosRuler).flat()"
  />
</template>