<script setup lang="ts">
import opentelemetryInstrumentationQuery from '@/queries/opentelemetry/Instrumentation.read.graphql'
import InstrumentationDelete from '@/queries/opentelemetry/Instrumentation.delete.graphql'
import opentelemetryInstrumentationList from '@/components/opentelemetry/InstrumentationList.vue';
import { useQuery, useMutation, useInstrumentation, InstrumentationListExcludes } from '../../../libs/opentelemetry/Instrumentation.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useInstrumentation();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(opentelemetryInstrumentationQuery, {
  "obj": {
    "filters": [],
    "excludes": InstrumentationListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InstrumentationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <opentelemetryInstrumentationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.opentelemetryInstrumentation).flat()"
  />
</template>