<script setup lang="ts">
import fluxcdReceiverQuery from '@/queries/fluxcd/Receiver.read.graphql'
import ReceiverDelete from '@/queries/fluxcd/Receiver.delete.graphql'
import fluxcdReceiverList from '@/components/fluxcd/ReceiverList.vue';
import { useQuery, useMutation, useReceiver, ReceiverListExcludes } from '../../../libs/fluxcd/Receiver.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useReceiver();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdReceiverQuery, {
  "obj": {
    "filters": [],
    "excludes": ReceiverListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReceiverDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdReceiverList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdReceiver).flat()"
  />
</template>