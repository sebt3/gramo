<script setup lang="ts">
import k8sPodTemplateQuery from '@/queries/k8s/PodTemplate.read.graphql'
import PodTemplateDelete from '@/queries/k8s/PodTemplate.delete.graphql'
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import { useQuery, useMutation, usePodTemplate, PodTemplateListExcludes } from '../../../libs/k8s/PodTemplate.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePodTemplate();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sPodTemplateQuery, {
  "obj": {
    "filters": [],
    "excludes": PodTemplateListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodTemplateDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sPodTemplateList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sPodTemplate).flat()"
  />
</template>