<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepository.read.graphql'
import GitRepositoryEdit from '@/queries/fluxcd/GitRepository.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdGitRepositoryMeta from '@/components/fluxcd/GitRepositoryMeta.vue';
import fluxcdGitRepositoryEdit from '@/components/fluxcd/GitRepositoryEdit.vue';
import fluxcdGitRepositoryStatus from '@/components/fluxcd/GitRepositoryStatus.vue';
import { useQuery, useMutation, sanitizeData, useGitRepository, GitRepositorySimpleExcludes } from '../../../libs/fluxcd/GitRepository.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotGitRepositoryFound, navigation, editor, setNamespacedItemFromRoute } = useGitRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdGitRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GitRepositorySimpleExcludes
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
});
const { mutate: patchGitRepository, onDone: onPatchGitRepository, onError: onPatchError } = useMutation(GitRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGitRepository({
    "name": result.k8sNamespace[0].fluxcdGitRepository[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdGitRepository[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotGitRepositoryFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdGitRepository[0])});onPatchGitRepository(patchDone);onPatchError(patchError);
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
      <fluxcdGitRepositoryEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
       />
    </div>
  </div>
</template>

