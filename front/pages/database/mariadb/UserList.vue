<script setup lang="ts">
import mariadbUserQuery from '@/queries/mariadb/User.read.graphql'
import UserDelete from '@/queries/mariadb/User.delete.graphql'
import mariadbUserList from '@/components/mariadb/UserList.vue';
import { useQuery, useMutation, useUser, UserListExcludes } from '../../../libs/mariadb/User.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useUser();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mariadbUserQuery, {
  "obj": {
    "filters": [],
    "excludes": UserListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(UserDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mariadbUserList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mariadbUser).flat()"
  />
</template>