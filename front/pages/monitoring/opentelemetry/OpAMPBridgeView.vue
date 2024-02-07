<script setup lang="ts">
import opentelemetryOpAMPBridgeQuery from '@/queries/opentelemetry/OpAMPBridge.details.graphql'
import OpAMPBridgeDelete from '@/queries/opentelemetry/OpAMPBridge.delete.graphql'
import opentelemetryOpAMPBridgeMeta from '@/components/opentelemetry/OpAMPBridgeMeta.vue';
import opentelemetryOpAMPBridgeView from '@/components/opentelemetry/OpAMPBridgeView.vue';
import opentelemetryOpAMPBridgeStatus from '@/components/opentelemetry/OpAMPBridgeStatus.vue';
import { useQuery, useMutation, useOpAMPBridge, OpAMPBridgeReadExcludes } from '../../../libs/opentelemetry/OpAMPBridge.js'
const { onErrorHandler, notifySuccess, notifyError, onNotOpAMPBridgeFound, navigation, setNamespacedItemFromRoute } = useOpAMPBridge();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryOpAMPBridgeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OpAMPBridgeReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotOpAMPBridgeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OpAMPBridgeDelete);
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
      <opentelemetryOpAMPBridgeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
      <opentelemetryOpAMPBridgeStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div><div class="col-md-6">
      <opentelemetryOpAMPBridgeView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=undefined && result.k8sNamespace[0].opentelemetryOpAMPBridge[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpAMPBridge[0]"
       />
    </div>
  </div>
</template>
