<script setup lang="ts">
import k8sRoleBindingQuery from '@/queries/k8s/RoleBinding.read.graphql'
import RoleBindingDelete from '@/queries/k8s/RoleBinding.delete.graphql'
import k8sRoleBindingList from '@/components/k8s/RoleBindingList.vue';
import { useQuery, useMutation, useRoleBinding, RoleBindingListExcludes } from '../../../libs/k8s/RoleBinding.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRoleBinding();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sRoleBindingQuery, {
  "obj": {
    "filters": [],
    "excludes": RoleBindingListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RoleBindingDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sRoleBindingList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sRoleBinding).flat()"
  />
</template>