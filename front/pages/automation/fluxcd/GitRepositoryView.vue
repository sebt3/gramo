<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepository.details.graphql'
import GitRepositoryDelete from '@/queries/fluxcd/GitRepository.delete.graphql'
import fluxcdGitRepositoryMeta from '@/components/fluxcd/GitRepositoryMeta.vue';
import fluxcdGitRepositoryView from '@/components/fluxcd/GitRepositoryView.vue';
import fluxcdGitRepositoryStatus from '@/components/fluxcd/GitRepositoryStatus.vue';
import { useQuery, useMutation, useGitRepository, GitRepositoryReadExcludes } from '../../../libs/fluxcd/GitRepository.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGitRepositoryFound, navigation, setNamespacedItemFromRoute } = useGitRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdGitRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GitRepositoryReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotGitRepositoryFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GitRepositoryDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdGitRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdGitRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdGitRepositoryView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
        />
    </div>
  </div>
</template>
