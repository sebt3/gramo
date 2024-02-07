<script setup lang="ts">
import k8sRoleQuery from '@/queries/k8s/Role.read.graphql'
import RoleDelete from '@/queries/k8s/Role.delete.graphql'
import k8sRoleList from '@/components/k8s/RoleList.vue';
import { useQuery, useMutation, useRole, RoleListExcludes } from '../../../libs/k8s/Role.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useRole();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sRoleQuery, {
  "obj": {
    "filters": [],
    "excludes": RoleListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RoleDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sRoleList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sRole).flat()"
  />
</template>