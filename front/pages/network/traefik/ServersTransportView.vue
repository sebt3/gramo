<script setup lang="ts">
import traefikServersTransportQuery from '@/queries/traefik/ServersTransport.details.graphql'
import ServersTransportDelete from '@/queries/traefik/ServersTransport.delete.graphql'
import traefikServersTransportMeta from '@/components/traefik/ServersTransportMeta.vue';
import traefikServersTransportView from '@/components/traefik/ServersTransportView.vue';
import { useQuery, useMutation, useServersTransport, ServersTransportReadExcludes } from '../../../libs/traefik/ServersTransport.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServersTransportFound, navigation, setNamespacedItemFromRoute } = useServersTransport();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikServersTransportQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServersTransportReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotServersTransportFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServersTransportDelete);
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
      <traefikServersTransportMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikServersTransport[0]!=undefined && result.k8sNamespace[0].traefikServersTransport[0]!=null"
        :model="result.k8sNamespace[0].traefikServersTransport[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikServersTransportView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikServersTransport[0]!=undefined && result.k8sNamespace[0].traefikServersTransport[0]!=null"
        :model="result.k8sNamespace[0].traefikServersTransport[0]"
        />
    </div>
  </div>
</template>
