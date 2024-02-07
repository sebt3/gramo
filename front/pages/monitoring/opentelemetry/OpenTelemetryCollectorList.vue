<script setup lang="ts">
import opentelemetryOpenTelemetryCollectorQuery from '@/queries/opentelemetry/OpenTelemetryCollector.read.graphql'
import OpenTelemetryCollectorDelete from '@/queries/opentelemetry/OpenTelemetryCollector.delete.graphql'
import opentelemetryOpenTelemetryCollectorList from '@/components/opentelemetry/OpenTelemetryCollectorList.vue';
import { useQuery, useMutation, useOpenTelemetryCollector, OpenTelemetryCollectorListExcludes } from '../../../libs/opentelemetry/OpenTelemetryCollector.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useOpenTelemetryCollector();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(opentelemetryOpenTelemetryCollectorQuery, {
  "obj": {
    "filters": [],
    "excludes": OpenTelemetryCollectorListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OpenTelemetryCollectorDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <opentelemetryOpenTelemetryCollectorList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.opentelemetryOpenTelemetryCollector).flat()"
  />
</template>