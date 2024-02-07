<script setup lang="ts">
import projectcalicoIPReservationQuery from '@/queries/projectcalico/IPReservation.details.graphql'
import IPReservationDelete from '@/queries/projectcalico/IPReservation.delete.graphql'
import projectcalicoIPReservationMeta from '@/components/projectcalico/IPReservationMeta.vue';
import projectcalicoIPReservationView from '@/components/projectcalico/IPReservationView.vue';
import { useQuery, useMutation, useIPReservation, IPReservationReadExcludes } from '../../../libs/projectcalico/IPReservation.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPReservationFound, navigation, setItemFromRoute } = useIPReservation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPReservationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPReservationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIPReservationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPReservationDelete);
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
      <projectcalicoIPReservationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPReservation[0]!=undefined && result.projectcalicoIPReservation[0]!=null"
        :model="result.projectcalicoIPReservation[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPReservationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoIPReservation[0]!=undefined && result.projectcalicoIPReservation[0]!=null"
        :model="result.projectcalicoIPReservation[0]"
        />
    </div>
  </div>
</template>
