<script setup lang="ts">
import projectcalicoIPAMHandleQuery from '@/queries/projectcalico/IPAMHandle.read.graphql'
import IPAMHandleEdit from '@/queries/projectcalico/IPAMHandle.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoIPAMHandleMeta from '@/components/projectcalico/IPAMHandleMeta.vue';
import projectcalicoIPAMHandleEdit from '@/components/projectcalico/IPAMHandleEdit.vue';
import { useQuery, useMutation, sanitizeData, useIPAMHandle, IPAMHandleSimpleExcludes } from '../../../libs/projectcalico/IPAMHandle.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIPAMHandleFound, navigation, editor, setItemFromRoute } = useIPAMHandle();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMHandleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMHandleSimpleExcludes
  },
});
const { mutate: patchIPAMHandle, onDone: onPatchIPAMHandle, onError: onPatchError } = useMutation(IPAMHandleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMHandle({
    "name": result.projectcalicoIPAMHandle[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIPAMHandleFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoIPAMHandle[0])});onPatchIPAMHandle(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPAMHandleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMHandle[0]!=undefined && result.projectcalicoIPAMHandle[0]!=null"
        :model="result.projectcalicoIPAMHandle[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPAMHandleEdit
        v-if="!loading && result!=undefined && result.projectcalicoIPAMHandle[0]!=undefined && result.projectcalicoIPAMHandle[0]!=null"
        :model="result.projectcalicoIPAMHandle[0]"
       />
    </div>
  </div>
</template>

