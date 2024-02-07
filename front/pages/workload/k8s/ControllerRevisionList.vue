<script setup lang="ts">
import k8sControllerRevisionQuery from '@/queries/k8s/ControllerRevision.read.graphql'
import ControllerRevisionDelete from '@/queries/k8s/ControllerRevision.delete.graphql'
import k8sControllerRevisionList from '@/components/k8s/ControllerRevisionList.vue';
import { useQuery, useMutation, useControllerRevision, ControllerRevisionListExcludes } from '../../../libs/k8s/ControllerRevision.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useControllerRevision();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sControllerRevisionQuery, {
  "obj": {
    "filters": [],
    "excludes": ControllerRevisionListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ControllerRevisionDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sControllerRevisionList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sControllerRevision).flat()"
  />
</template>