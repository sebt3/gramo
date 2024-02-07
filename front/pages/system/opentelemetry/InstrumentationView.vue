<script setup lang="ts">
import opentelemetryInstrumentationQuery from '@/queries/opentelemetry/Instrumentation.details.graphql'
import InstrumentationDelete from '@/queries/opentelemetry/Instrumentation.delete.graphql'
import opentelemetryInstrumentationMeta from '@/components/opentelemetry/InstrumentationMeta.vue';
import opentelemetryInstrumentationView from '@/components/opentelemetry/InstrumentationView.vue';
import opentelemetryInstrumentationStatus from '@/components/opentelemetry/InstrumentationStatus.vue';
import { useQuery, useMutation, useInstrumentation, InstrumentationReadExcludes } from '../../../libs/opentelemetry/Instrumentation.js'
const { onErrorHandler, notifySuccess, notifyError, onNotInstrumentationFound, navigation, setNamespacedItemFromRoute } = useInstrumentation();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(opentelemetryInstrumentationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InstrumentationReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotInstrumentationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InstrumentationDelete);
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
      <opentelemetryInstrumentationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=undefined && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryInstrumentation[0]"
       />
    </div>
    <div class="col-md-6">
      <opentelemetryInstrumentationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=undefined && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryInstrumentation[0]"
       />
    </div>
    <div class="col-md-12">
      <opentelemetryInstrumentationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=undefined && result.k8sNamespace[0].opentelemetryInstrumentation[0]!=null"
        :model="result.k8sNamespace[0].opentelemetryInstrumentation[0]"
        />
    </div>
  </div>
</template>
