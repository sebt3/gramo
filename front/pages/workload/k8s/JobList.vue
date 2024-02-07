<script setup lang="ts">
import k8sJobQuery from '@/queries/k8s/Job.read.graphql'
import JobDelete from '@/queries/k8s/Job.delete.graphql'
import k8sJobList from '@/components/k8s/JobList.vue';
import { useQuery, useMutation, useJob, JobListExcludes } from '../../../libs/k8s/Job.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useJob();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sJobQuery, {
  "obj": {
    "filters": [],
    "excludes": JobListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(JobDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sJobList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sJob).flat()"
  />
</template>