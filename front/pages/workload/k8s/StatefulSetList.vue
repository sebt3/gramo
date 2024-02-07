<script setup lang="ts">
import k8sStatefulSetQuery from '@/queries/k8s/StatefulSet.read.graphql'
import StatefulSetDelete from '@/queries/k8s/StatefulSet.delete.graphql'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { useQuery, useMutation, useStatefulSet, StatefulSetListExcludes } from '../../../libs/k8s/StatefulSet.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useStatefulSet();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sStatefulSetQuery, {
  "obj": {
    "filters": [],
    "excludes": StatefulSetListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StatefulSetDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sStatefulSetList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sStatefulSet).flat()"
  />
</template>