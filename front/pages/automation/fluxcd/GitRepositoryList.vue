<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepository.read.graphql'
import GitRepositoryDelete from '@/queries/fluxcd/GitRepository.delete.graphql'
import fluxcdGitRepositoryList from '@/components/fluxcd/GitRepositoryList.vue';
import { useQuery, useMutation, useGitRepository, GitRepositoryListExcludes } from '../../../libs/fluxcd/GitRepository.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useGitRepository();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdGitRepositoryQuery, {
  "obj": {
    "filters": [],
    "excludes": GitRepositoryListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GitRepositoryDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdGitRepositoryList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdGitRepository).flat()"
  />
</template>