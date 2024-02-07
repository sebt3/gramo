<script setup lang="ts">
import projectcalicoGlobalNetworkSetQuery from '@/queries/projectcalico/GlobalNetworkSet.read.graphql'
import GlobalNetworkSetEdit from '@/queries/projectcalico/GlobalNetworkSet.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoGlobalNetworkSetMeta from '@/components/projectcalico/GlobalNetworkSetMeta.vue';
import projectcalicoGlobalNetworkSetEdit from '@/components/projectcalico/GlobalNetworkSetEdit.vue';
import { useQuery, useMutation, sanitizeData, useGlobalNetworkSet, GlobalNetworkSetSimpleExcludes } from '../../../libs/projectcalico/GlobalNetworkSet.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotGlobalNetworkSetFound, navigation, editor, setItemFromRoute } = useGlobalNetworkSet();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GlobalNetworkSetSimpleExcludes
  },
});
const { mutate: patchGlobalNetworkSet, onDone: onPatchGlobalNetworkSet, onError: onPatchError } = useMutation(GlobalNetworkSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGlobalNetworkSet({
    "name": result.projectcalicoGlobalNetworkSet[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotGlobalNetworkSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoGlobalNetworkSet[0])});onPatchGlobalNetworkSet(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoGlobalNetworkSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkSet[0]!=undefined && result.projectcalicoGlobalNetworkSet[0]!=null"
        :model="result.projectcalicoGlobalNetworkSet[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoGlobalNetworkSetEdit
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkSet[0]!=undefined && result.projectcalicoGlobalNetworkSet[0]!=null"
        :model="result.projectcalicoGlobalNetworkSet[0]"
       />
    </div>
  </div>
</template>

