<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlock.read.graphql'
import IPAMBlockEdit from '@/queries/projectcalico/IPAMBlock.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoIPAMBlockMeta from '@/components/projectcalico/IPAMBlockMeta.vue';
import projectcalicoIPAMBlockEdit from '@/components/projectcalico/IPAMBlockEdit.vue';
import { useQuery, useMutation, sanitizeData, useIPAMBlock, IPAMBlockSimpleExcludes } from '../../../libs/projectcalico/IPAMBlock.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIPAMBlockFound, navigation, editor, setItemFromRoute } = useIPAMBlock();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMBlockQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMBlockSimpleExcludes
  },
});
const { mutate: patchIPAMBlock, onDone: onPatchIPAMBlock, onError: onPatchError } = useMutation(IPAMBlockEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMBlock({
    "name": result.projectcalicoIPAMBlock[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIPAMBlockFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoIPAMBlock[0])});onPatchIPAMBlock(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPAMBlockMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock[0]!=undefined && result.projectcalicoIPAMBlock[0]!=null"
        :model="result.projectcalicoIPAMBlock[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPAMBlockEdit
        v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock[0]!=undefined && result.projectcalicoIPAMBlock[0]!=null"
        :model="result.projectcalicoIPAMBlock[0]"
       />
    </div>
  </div>
</template>

