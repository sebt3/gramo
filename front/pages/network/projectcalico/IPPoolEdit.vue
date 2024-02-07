<script setup lang="ts">
import projectcalicoIPPoolQuery from '@/queries/projectcalico/IPPool.read.graphql'
import IPPoolEdit from '@/queries/projectcalico/IPPool.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoIPPoolMeta from '@/components/projectcalico/IPPoolMeta.vue';
import projectcalicoIPPoolEdit from '@/components/projectcalico/IPPoolEdit.vue';
import { useQuery, useMutation, sanitizeData, useIPPool, IPPoolSimpleExcludes } from '../../../libs/projectcalico/IPPool.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIPPoolFound, navigation, editor, setItemFromRoute } = useIPPool();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPPoolQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPPoolSimpleExcludes
  },
});
const { mutate: patchIPPool, onDone: onPatchIPPool, onError: onPatchError } = useMutation(IPPoolEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPPool({
    "name": result.projectcalicoIPPool[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIPPoolFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoIPPool[0])});onPatchIPPool(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPPoolMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPPool[0]!=undefined && result.projectcalicoIPPool[0]!=null"
        :model="result.projectcalicoIPPool[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPPoolEdit
        v-if="!loading && result!=undefined && result.projectcalicoIPPool[0]!=undefined && result.projectcalicoIPPool[0]!=null"
        :model="result.projectcalicoIPPool[0]"
       />
    </div>
  </div>
</template>

