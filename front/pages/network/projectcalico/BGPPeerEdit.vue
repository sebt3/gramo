<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeer.read.graphql'
import BGPPeerEdit from '@/queries/projectcalico/BGPPeer.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoBGPPeerMeta from '@/components/projectcalico/BGPPeerMeta.vue';
import projectcalicoBGPPeerEdit from '@/components/projectcalico/BGPPeerEdit.vue';
import { useQuery, useMutation, sanitizeData, useBGPPeer, BGPPeerSimpleExcludes } from '../../../libs/projectcalico/BGPPeer.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBGPPeerFound, navigation, editor, setItemFromRoute } = useBGPPeer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPPeerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BGPPeerSimpleExcludes
  },
});
const { mutate: patchBGPPeer, onDone: onPatchBGPPeer, onError: onPatchError } = useMutation(BGPPeerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBGPPeer({
    "name": result.projectcalicoBGPPeer[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBGPPeerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoBGPPeer[0])});onPatchBGPPeer(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoBGPPeerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBGPPeer[0]!=undefined && result.projectcalicoBGPPeer[0]!=null"
        :model="result.projectcalicoBGPPeer[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoBGPPeerEdit
        v-if="!loading && result!=undefined && result.projectcalicoBGPPeer[0]!=undefined && result.projectcalicoBGPPeer[0]!=null"
        :model="result.projectcalicoBGPPeer[0]"
       />
    </div>
  </div>
</template>

