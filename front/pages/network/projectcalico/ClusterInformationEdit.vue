<script setup lang="ts">
import projectcalicoClusterInformationQuery from '@/queries/projectcalico/ClusterInformation.read.graphql'
import ClusterInformationEdit from '@/queries/projectcalico/ClusterInformation.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoClusterInformationMeta from '@/components/projectcalico/ClusterInformationMeta.vue';
import projectcalicoClusterInformationEdit from '@/components/projectcalico/ClusterInformationEdit.vue';
import { useQuery, useMutation, sanitizeData, useClusterInformation, ClusterInformationSimpleExcludes } from '../../../libs/projectcalico/ClusterInformation.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotClusterInformationFound, navigation, editor, setItemFromRoute } = useClusterInformation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoClusterInformationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterInformationSimpleExcludes
  },
});
const { mutate: patchClusterInformation, onDone: onPatchClusterInformation, onError: onPatchError } = useMutation(ClusterInformationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterInformation({
    "name": result.projectcalicoClusterInformation[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotClusterInformationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoClusterInformation[0])});onPatchClusterInformation(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoClusterInformationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoClusterInformation[0]!=undefined && result.projectcalicoClusterInformation[0]!=null"
        :model="result.projectcalicoClusterInformation[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoClusterInformationEdit
        v-if="!loading && result!=undefined && result.projectcalicoClusterInformation[0]!=undefined && result.projectcalicoClusterInformation[0]!=null"
        :model="result.projectcalicoClusterInformation[0]"
       />
    </div>
  </div>
</template>

