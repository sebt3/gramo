<script setup lang="ts">
import opentelemetryOpAMPBridgeQuery from '@/queries/opentelemetry/OpAMPBridge.read.graphql'
import OpAMPBridgeDelete from '@/queries/opentelemetry/OpAMPBridge.delete.graphql'
import opentelemetryOpAMPBridgeList from '@/components/opentelemetry/OpAMPBridgeList.vue';
import { useQuery, useMutation, useOpAMPBridge, OpAMPBridgeListExcludes } from '../../../libs/opentelemetry/OpAMPBridge.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useOpAMPBridge();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(opentelemetryOpAMPBridgeQuery, {
  "obj": {
    "filters": [],
    "excludes": OpAMPBridgeListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(OpAMPBridgeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <opentelemetryOpAMPBridgeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.opentelemetryOpAMPBridge).flat()"
  />
</template>