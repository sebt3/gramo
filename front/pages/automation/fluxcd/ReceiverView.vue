<script setup lang="ts">
import fluxcdReceiverQuery from '@/queries/fluxcd/Receiver.details.graphql'
import ReceiverDelete from '@/queries/fluxcd/Receiver.delete.graphql'
import fluxcdReceiverMeta from '@/components/fluxcd/ReceiverMeta.vue';
import fluxcdReceiverView from '@/components/fluxcd/ReceiverView.vue';
import fluxcdReceiverStatus from '@/components/fluxcd/ReceiverStatus.vue';
import { useQuery, useMutation, useReceiver, ReceiverReadExcludes } from '../../../libs/fluxcd/Receiver.js'
const { onErrorHandler, notifySuccess, notifyError, onNotReceiverFound, navigation, setNamespacedItemFromRoute } = useReceiver();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdReceiverQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReceiverReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotReceiverFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReceiverDelete);
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
      <fluxcdReceiverMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdReceiverStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdReceiverView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
        />
    </div>
  </div>
</template>
