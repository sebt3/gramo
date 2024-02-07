<script setup lang="ts">
import k8sSecretQuery from '@/queries/k8s/Secret.read.graphql'
import SecretDelete from '@/queries/k8s/Secret.delete.graphql'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { useQuery, useMutation, useSecret, SecretListExcludes } from '../../../libs/k8s/Secret.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useSecret();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sSecretQuery, {
  "obj": {
    "filters": [],
    "excludes": SecretListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SecretDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sSecretList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sSecret).flat()"
  />
</template>