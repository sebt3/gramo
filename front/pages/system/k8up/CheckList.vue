<script setup lang="ts">
import k8upCheckQuery from '@/queries/k8up/Check.read.graphql'
import CheckDelete from '@/queries/k8up/Check.delete.graphql'
import k8upCheckList from '@/components/k8up/CheckList.vue';
import { useQuery, useMutation, useCheck, CheckListExcludes } from '../../../libs/k8up/Check.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useCheck();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8upCheckQuery, {
  "obj": {
    "filters": [],
    "excludes": CheckListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CheckDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8upCheckList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8upCheck).flat()"
  />
</template>