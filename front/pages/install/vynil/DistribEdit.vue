<script setup lang="ts">
import vynilDistribQuery from '@/queries/vynil/Distrib.read.graphql'
import DistribEdit from '@/queries/vynil/Distrib.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import vynilDistribMeta from '@/components/vynil/DistribMeta.vue';
import vynilDistribEdit from '@/components/vynil/DistribEdit.vue';
import vynilDistribStatus from '@/components/vynil/DistribStatus.vue';
import { useQuery, useMutation, sanitizeData, useDistrib, DistribSimpleExcludes } from '../../../libs/vynil/Distrib.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotDistribFound, navigation, editor, setItemFromRoute } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DistribSimpleExcludes
  },
});
const { mutate: patchDistrib, onDone: onPatchDistrib, onError: onPatchError } = useMutation(DistribEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDistrib({
    "name": result.vynilDistrib[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotDistribFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.vynilDistrib[0])});onPatchDistrib(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <vynilDistribMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div>
    <div class="col-md-6">
      <vynilDistribStatus
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div>
    <div class="col-md-12">
      <vynilDistribEdit
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div>
  </div>
</template>

