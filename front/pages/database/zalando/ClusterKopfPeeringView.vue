<script setup lang="ts">
import zalandoClusterKopfPeeringQuery from '@/queries/zalando/ClusterKopfPeering.details.graphql'
import ClusterKopfPeeringDelete from '@/queries/zalando/ClusterKopfPeering.delete.graphql'
import zalandoClusterKopfPeeringMeta from '@/components/zalando/ClusterKopfPeeringMeta.vue';
import zalandoClusterKopfPeeringView from '@/components/zalando/ClusterKopfPeeringView.vue';
import zalandoClusterKopfPeeringStatus from '@/components/zalando/ClusterKopfPeeringStatus.vue';
import { useQuery, useMutation, useClusterKopfPeering, ClusterKopfPeeringReadExcludes } from '../../../libs/zalando/ClusterKopfPeering.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterKopfPeeringFound, navigation, setItemFromRoute } = useClusterKopfPeering();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandoClusterKopfPeeringQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterKopfPeeringReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotClusterKopfPeeringFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterKopfPeeringDelete);
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
    <div class="col-md-6">
      <zalandoClusterKopfPeeringMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div>
    <div class="col-md-6">
      <zalandoClusterKopfPeeringStatus
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div>
    <div class="col-md-12">
      <zalandoClusterKopfPeeringView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
        />
    </div>
  </div>
</template>
