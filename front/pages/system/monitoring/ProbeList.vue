<script setup lang="ts">
import monitoringProbeQuery from '@/queries/monitoring/Probe.read.graphql'
import ProbeDelete from '@/queries/monitoring/Probe.delete.graphql'
import monitoringProbeList from '@/components/monitoring/ProbeList.vue';
import { useQuery, useMutation, useProbe, ProbeListExcludes } from '../../../libs/monitoring/Probe.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useProbe();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(monitoringProbeQuery, {
  "obj": {
    "filters": [],
    "excludes": ProbeListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ProbeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <monitoringProbeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.monitoringProbe).flat()"
  />
</template>