<script setup lang="ts">
import projectcalicoCalicoNodeStatusQuery from '@/queries/projectcalico/CalicoNodeStatus.read.graphql'
import CalicoNodeStatusEdit from '@/queries/projectcalico/CalicoNodeStatus.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoCalicoNodeStatusMeta from '@/components/projectcalico/CalicoNodeStatusMeta.vue';
import projectcalicoCalicoNodeStatusEdit from '@/components/projectcalico/CalicoNodeStatusEdit.vue';
import projectcalicoCalicoNodeStatusStatus from '@/components/projectcalico/CalicoNodeStatusStatus.vue';
import { useQuery, useMutation, sanitizeData, useCalicoNodeStatus, CalicoNodeStatusSimpleExcludes } from '../../../libs/projectcalico/CalicoNodeStatus.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCalicoNodeStatusFound, navigation, editor, setItemFromRoute } = useCalicoNodeStatus();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoCalicoNodeStatusQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CalicoNodeStatusSimpleExcludes
  },
});
const { mutate: patchCalicoNodeStatus, onDone: onPatchCalicoNodeStatus, onError: onPatchError } = useMutation(CalicoNodeStatusEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCalicoNodeStatus({
    "name": result.projectcalicoCalicoNodeStatus[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCalicoNodeStatusFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoCalicoNodeStatus[0])});onPatchCalicoNodeStatus(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoCalicoNodeStatusMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div>
    <div class="col-md-6">
      <projectcalicoCalicoNodeStatusStatus
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoCalicoNodeStatusEdit
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div>
  </div>
</template>

