<script setup lang="ts">
import projectcalicoIPReservationQuery from '@/queries/projectcalico/IPReservation.read.graphql'
import IPReservationEdit from '@/queries/projectcalico/IPReservation.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoIPReservationMeta from '@/components/projectcalico/IPReservationMeta.vue';
import projectcalicoIPReservationEdit from '@/components/projectcalico/IPReservationEdit.vue';
import { useQuery, useMutation, sanitizeData, useIPReservation, IPReservationSimpleExcludes } from '../../../libs/projectcalico/IPReservation.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIPReservationFound, navigation, editor, setItemFromRoute } = useIPReservation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPReservationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPReservationSimpleExcludes
  },
});
const { mutate: patchIPReservation, onDone: onPatchIPReservation, onError: onPatchError } = useMutation(IPReservationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPReservation({
    "name": result.projectcalicoIPReservation[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIPReservationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoIPReservation[0])});onPatchIPReservation(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPReservationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPReservation[0]!=undefined && result.projectcalicoIPReservation[0]!=null"
        :model="result.projectcalicoIPReservation[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPReservationEdit
        v-if="!loading && result!=undefined && result.projectcalicoIPReservation[0]!=undefined && result.projectcalicoIPReservation[0]!=null"
        :model="result.projectcalicoIPReservation[0]"
       />
    </div>
  </div>
</template>

