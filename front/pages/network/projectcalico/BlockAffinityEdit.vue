<script setup lang="ts">
import projectcalicoBlockAffinityQuery from '@/queries/projectcalico/BlockAffinity.read.graphql'
import BlockAffinityEdit from '@/queries/projectcalico/BlockAffinity.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoBlockAffinityMeta from '@/components/projectcalico/BlockAffinityMeta.vue';
import projectcalicoBlockAffinityEdit from '@/components/projectcalico/BlockAffinityEdit.vue';
import { useQuery, useMutation, sanitizeData, useBlockAffinity, BlockAffinitySimpleExcludes } from '../../../libs/projectcalico/BlockAffinity.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBlockAffinityFound, navigation, editor, setItemFromRoute } = useBlockAffinity();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBlockAffinityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BlockAffinitySimpleExcludes
  },
});
const { mutate: patchBlockAffinity, onDone: onPatchBlockAffinity, onError: onPatchError } = useMutation(BlockAffinityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBlockAffinity({
    "name": result.projectcalicoBlockAffinity[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBlockAffinityFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoBlockAffinity[0])});onPatchBlockAffinity(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoBlockAffinityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity[0]!=undefined && result.projectcalicoBlockAffinity[0]!=null"
        :model="result.projectcalicoBlockAffinity[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoBlockAffinityEdit
        v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity[0]!=undefined && result.projectcalicoBlockAffinity[0]!=null"
        :model="result.projectcalicoBlockAffinity[0]"
       />
    </div>
  </div>
</template>

