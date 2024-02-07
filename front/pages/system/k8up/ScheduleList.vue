<script setup lang="ts">
import k8upScheduleQuery from '@/queries/k8up/Schedule.read.graphql'
import ScheduleDelete from '@/queries/k8up/Schedule.delete.graphql'
import k8upScheduleList from '@/components/k8up/ScheduleList.vue';
import { useQuery, useMutation, useSchedule, ScheduleListExcludes } from '../../../libs/k8up/Schedule.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useSchedule();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upScheduleQuery, {
  "obj": {
    "filters": [],
    "excludes": ScheduleListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ScheduleDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upScheduleList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upSchedule).flat()"
  />
</template>