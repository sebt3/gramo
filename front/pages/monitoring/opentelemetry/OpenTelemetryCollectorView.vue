<script setup lang="ts">
import opentelemetryOpenTelemetryCollectorQuery from '@/queries/opentelemetry/OpenTelemetryCollector.details.graphql'
import OpenTelemetryCollectorDelete from '@/queries/opentelemetry/OpenTelemetryCollector.delete.graphql'
import opentelemetryOpenTelemetryCollectorMeta from '@/components/opentelemetry/OpenTelemetryCollectorMeta.vue';
import opentelemetryOpenTelemetryCollectorView from '@/components/opentelemetry/OpenTelemetryCollectorView.vue';
import opentelemetryOpenTelemetryCollectorStatus from '@/components/opentelemetry/OpenTelemetryCollectorStatus.vue';
import { useQuery, useMutation, useOpenTelemetryCollector, OpenTelemetryCollectorReadExcludes } from '../../../libs/opentelemetry/OpenTelemetryCollector.js'
const { onErrorHandler, notifySuccess, notifyError, onNotOpenTelemetryCollectorFound, navigation, setNamespacedItemFromRoute } = useOpenTelemetryCollector();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryOpenTelemetryCollectorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OpenTelemetryCollectorReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotOpenTelemetryCollectorFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OpenTelemetryCollectorDelete);
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
      <opentelemetryOpenTelemetryCollectorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=undefined && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]"
       />
      <opentelemetryOpenTelemetryCollectorStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=undefined && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]"
       />
    </div><div class="col-md-6">
      <opentelemetryOpenTelemetryCollectorView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=undefined && result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryOpenTelemetryCollector[0]"
       />
    </div>
  </div>
</template>
