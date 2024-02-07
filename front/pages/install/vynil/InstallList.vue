<script setup lang="ts">
import vynilInstallQuery from '@/queries/vynil/Install.read.graphql'
import InstallDelete from '@/queries/vynil/Install.delete.graphql'
import vynilInstallList from '@/components/vynil/InstallList.vue';
import { useQuery, useMutation, useInstall, InstallListExcludes } from '../../../libs/vynil/Install.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useInstall();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(vynilInstallQuery, {
  "obj": {
    "filters": [],
    "excludes": InstallListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InstallDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <vynilInstallList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.vynilInstall).flat()"
  />
</template>