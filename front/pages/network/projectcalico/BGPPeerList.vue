<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeer.read.graphql'
import BGPPeerDelete from '@/queries/projectcalico/BGPPeer.delete.graphql'
import projectcalicoBGPPeerList from '@/components/projectcalico/BGPPeerList.vue';
import { useQuery, useMutation, useBGPPeer, BGPPeerListExcludes } from '../../../libs/projectcalico/BGPPeer.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useBGPPeer();
const { result, refetch, onError } = useQuery(projectcalicoBGPPeerQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BGPPeerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoBGPPeerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoBGPPeer'] !== undefined"
    :model="result.projectcalicoBGPPeer"
  />
</template>