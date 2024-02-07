<script setup lang="ts">
import k8sPersistentVolumeQuery from '@/queries/k8s/PersistentVolume.read.graphql'
import PersistentVolumeEdit from '@/queries/k8s/PersistentVolume.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sPersistentVolumeMeta from '@/components/k8s/PersistentVolumeMeta.vue';
import k8sPersistentVolumeEdit from '@/components/k8s/PersistentVolumeEdit.vue';
import k8sPersistentVolumeStatus from '@/components/k8s/PersistentVolumeStatus.vue';
import { useQuery, useMutation, sanitizeData, usePersistentVolume, PersistentVolumeSimpleExcludes } from '../../../libs/k8s/PersistentVolume.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPersistentVolumeFound, navigation, editor, setItemFromRoute } = usePersistentVolume();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PersistentVolumeSimpleExcludes
  },
});
const { mutate: patchPersistentVolume, onDone: onPatchPersistentVolume, onError: onPatchError } = useMutation(PersistentVolumeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPersistentVolume({
    "name": result.k8sPersistentVolume[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPersistentVolumeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sPersistentVolume[0])});onPatchPersistentVolume(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPersistentVolumeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPersistentVolumeStatus
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPersistentVolumeEdit
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div>
  </div>
</template>

