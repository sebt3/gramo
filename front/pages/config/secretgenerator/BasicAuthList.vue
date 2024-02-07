<script setup lang="ts">
import secretgeneratorBasicAuthQuery from '@/queries/secretgenerator/BasicAuth.read.graphql'
import BasicAuthDelete from '@/queries/secretgenerator/BasicAuth.delete.graphql'
import secretgeneratorBasicAuthList from '@/components/secretgenerator/BasicAuthList.vue';
import { useQuery, useMutation, useBasicAuth, BasicAuthListExcludes } from '../../../libs/secretgenerator/BasicAuth.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useBasicAuth();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(secretgeneratorBasicAuthQuery, {
  "obj": {
    "filters": [],
    "excludes": BasicAuthListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BasicAuthDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <secretgeneratorBasicAuthList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.secretgeneratorBasicAuth).flat()"
  />
</template>