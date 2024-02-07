<script setup lang="ts">
import k8sCronJobQuery from '@/queries/k8s/CronJob.read.graphql'
import CronJobDelete from '@/queries/k8s/CronJob.delete.graphql'
import k8sCronJobList from '@/components/k8s/CronJobList.vue';
import { useQuery, useMutation, useCronJob, CronJobListExcludes } from '../../../libs/k8s/CronJob.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useCronJob();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sCronJobQuery, {
  "obj": {
    "filters": [],
    "excludes": CronJobListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CronJobDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sCronJobList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sCronJob).flat()"
  />
</template>