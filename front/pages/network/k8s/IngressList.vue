<script setup lang="ts">
import k8sIngressQuery from '@/queries/k8s/Ingress.read.graphql'
import IngressDelete from '@/queries/k8s/Ingress.delete.graphql'
import k8sIngressList from '@/components/k8s/IngressList.vue';
import { useQuery, useMutation, useIngress, IngressListExcludes } from '../../../libs/k8s/Ingress.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useIngress();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sIngressQuery, {
  "obj": {
    "filters": [],
    "excludes": IngressListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sIngressList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sIngress).flat()"
  />
</template>