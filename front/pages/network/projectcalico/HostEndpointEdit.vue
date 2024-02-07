<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpoint.read.graphql'
import HostEndpointEdit from '@/queries/projectcalico/HostEndpoint.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoHostEndpointMeta from '@/components/projectcalico/HostEndpointMeta.vue';
import projectcalicoHostEndpointEdit from '@/components/projectcalico/HostEndpointEdit.vue';
import { useQuery, useMutation, sanitizeData, useHostEndpoint, HostEndpointSimpleExcludes } from '../../../libs/projectcalico/HostEndpoint.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotHostEndpointFound, navigation, editor, setItemFromRoute } = useHostEndpoint();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoHostEndpointQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HostEndpointSimpleExcludes
  },
});
const { mutate: patchHostEndpoint, onDone: onPatchHostEndpoint, onError: onPatchError } = useMutation(HostEndpointEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHostEndpoint({
    "name": result.projectcalicoHostEndpoint[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotHostEndpointFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoHostEndpoint[0])});onPatchHostEndpoint(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoHostEndpointMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint[0]!=undefined && result.projectcalicoHostEndpoint[0]!=null"
        :model="result.projectcalicoHostEndpoint[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoHostEndpointEdit
        v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint[0]!=undefined && result.projectcalicoHostEndpoint[0]!=null"
        :model="result.projectcalicoHostEndpoint[0]"
       />
    </div>
  </div>
</template>

