<script setup lang="ts">
import k8sPodQuery from '@/queries/k8s/Pod.read.graphql'
import PodDelete from '@/queries/k8s/Pod.delete.graphql'
import k8sPodList from '@/components/k8s/PodList.vue';
import { useQuery, useMutation, usePod, PodListExcludes } from '../../../libs/k8s/Pod.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = usePod();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sPodQuery, {
  "obj": {
    "filters": [],
    "excludes": PodListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sPodList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sPod).flat()"
  />
</template>