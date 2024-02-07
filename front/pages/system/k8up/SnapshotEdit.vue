<script setup lang="ts">
import k8upSnapshotQuery from '@/queries/k8up/Snapshot.read.graphql'
import SnapshotEdit from '@/queries/k8up/Snapshot.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upSnapshotMeta from '@/components/k8up/SnapshotMeta.vue';
import k8upSnapshotEdit from '@/components/k8up/SnapshotEdit.vue';
import k8upSnapshotStatus from '@/components/k8up/SnapshotStatus.vue';
import { useQuery, useMutation, sanitizeData, useSnapshot, SnapshotSimpleExcludes } from '../../../libs/k8up/Snapshot.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotSnapshotFound, navigation, editor, setNamespacedItemFromRoute } = useSnapshot();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upSnapshotQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SnapshotSimpleExcludes
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
const { mutate: patchSnapshot, onDone: onPatchSnapshot, onError: onPatchError } = useMutation(SnapshotEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSnapshot({
    "name": result.k8sNamespace[0].k8upSnapshot[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upSnapshot[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotSnapshotFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upSnapshot[0])});onPatchSnapshot(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upSnapshotMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upSnapshotStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upSnapshotEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div>
  </div>
</template>

