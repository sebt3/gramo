<script setup lang="ts">
import k8sConfigMapQuery from '@/queries/k8s/ConfigMap.read.graphql'
import ConfigMapDelete from '@/queries/k8s/ConfigMap.delete.graphql'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { useQuery, useMutation, useConfigMap, ConfigMapListExcludes } from '../../../libs/k8s/ConfigMap.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useConfigMap();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sConfigMapQuery, {
  "obj": {
    "filters": [],
    "excludes": ConfigMapListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ConfigMapDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sConfigMapList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sConfigMap).flat()"
  />
</template>