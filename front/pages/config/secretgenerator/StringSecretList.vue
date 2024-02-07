<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecret.read.graphql'
import StringSecretDelete from '@/queries/secretgenerator/StringSecret.delete.graphql'
import secretgeneratorStringSecretList from '@/components/secretgenerator/StringSecretList.vue';
import { useQuery, useMutation, useStringSecret, StringSecretListExcludes } from '../../../libs/secretgenerator/StringSecret.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useStringSecret();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(secretgeneratorStringSecretQuery, {
  "obj": {
    "filters": [],
    "excludes": StringSecretListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StringSecretDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <secretgeneratorStringSecretList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.secretgeneratorStringSecret).flat()"
  />
</template>