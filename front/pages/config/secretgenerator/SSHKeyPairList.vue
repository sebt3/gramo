<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPair.read.graphql'
import SSHKeyPairDelete from '@/queries/secretgenerator/SSHKeyPair.delete.graphql'
import secretgeneratorSSHKeyPairList from '@/components/secretgenerator/SSHKeyPairList.vue';
import { useQuery, useMutation, useSSHKeyPair, SSHKeyPairListExcludes } from '../../../libs/secretgenerator/SSHKeyPair.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useSSHKeyPair();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {
  "obj": {
    "filters": [],
    "excludes": SSHKeyPairListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SSHKeyPairDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <secretgeneratorSSHKeyPairList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.secretgeneratorSSHKeyPair).flat()"
  />
</template>