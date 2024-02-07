<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeer.details.graphql'
import BGPPeerDelete from '@/queries/projectcalico/BGPPeer.delete.graphql'
import projectcalicoBGPPeerMeta from '@/components/projectcalico/BGPPeerMeta.vue';
import projectcalicoBGPPeerView from '@/components/projectcalico/BGPPeerView.vue';
import { useQuery, useMutation, useBGPPeer, BGPPeerReadExcludes } from '../../../libs/projectcalico/BGPPeer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBGPPeerFound, navigation, setItemFromRoute } = useBGPPeer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPPeerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BGPPeerReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotBGPPeerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BGPPeerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3">
      <projectcalicoBGPPeerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBGPPeer[0]!=undefined && result.projectcalicoBGPPeer[0]!=null"
        :model="result.projectcalicoBGPPeer[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoBGPPeerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoBGPPeer[0]!=undefined && result.projectcalicoBGPPeer[0]!=null"
        :model="result.projectcalicoBGPPeer[0]"
        />
    </div>
  </div>
</template>
