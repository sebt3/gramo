<script setup lang="ts">
import k8upArchiveQuery from '@/queries/k8up/Archive.read.graphql'
import ArchiveEdit from '@/queries/k8up/Archive.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upArchiveMeta from '@/components/k8up/ArchiveMeta.vue';
import k8upArchiveEdit from '@/components/k8up/ArchiveEdit.vue';
import k8upArchiveStatus from '@/components/k8up/ArchiveStatus.vue';
import { useQuery, useMutation, sanitizeData, useArchive, ArchiveSimpleExcludes } from '../../../libs/k8up/Archive.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotArchiveFound, navigation, editor, setNamespacedItemFromRoute } = useArchive();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upArchiveQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ArchiveSimpleExcludes
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
const { mutate: patchArchive, onDone: onPatchArchive, onError: onPatchError } = useMutation(ArchiveEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchArchive({
    "name": result.k8sNamespace[0].k8upArchive[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upArchive[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotArchiveFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upArchive[0])});onPatchArchive(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upArchiveMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upArchive[0]!=undefined && result.k8sNamespace[0].k8upArchive[0]!=null"
        :model="result.k8sNamespace[0].k8upArchive[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upArchiveStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upArchive[0]!=undefined && result.k8sNamespace[0].k8upArchive[0]!=null"
        :model="result.k8sNamespace[0].k8upArchive[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upArchiveEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upArchive[0]!=undefined && result.k8sNamespace[0].k8upArchive[0]!=null"
        :model="result.k8sNamespace[0].k8upArchive[0]"
       />
    </div>
  </div>
</template>

