<script setup lang="ts">
import projectcalicoHostEndpointQuery from '@/queries/projectcalico/HostEndpoint.details.graphql'
import HostEndpointDelete from '@/queries/projectcalico/HostEndpoint.delete.graphql'
import projectcalicoHostEndpointMeta from '@/components/projectcalico/HostEndpointMeta.vue';
import projectcalicoHostEndpointView from '@/components/projectcalico/HostEndpointView.vue';
import { useQuery, useMutation, useHostEndpoint, HostEndpointReadExcludes } from '../../../libs/projectcalico/HostEndpoint.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHostEndpointFound, navigation, setItemFromRoute } = useHostEndpoint();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoHostEndpointQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HostEndpointReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotHostEndpointFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HostEndpointDelete);
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
      <projectcalicoHostEndpointMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint[0]!=undefined && result.projectcalicoHostEndpoint[0]!=null"
        :model="result.projectcalicoHostEndpoint[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoHostEndpointView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoHostEndpoint[0]!=undefined && result.projectcalicoHostEndpoint[0]!=null"
        :model="result.projectcalicoHostEndpoint[0]"
        />
    </div>
  </div>
</template>
