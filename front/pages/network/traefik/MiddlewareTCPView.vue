<script setup lang="ts">
import traefikMiddlewareTCPQuery from '@/queries/traefik/MiddlewareTCP.details.graphql'
import MiddlewareTCPDelete from '@/queries/traefik/MiddlewareTCP.delete.graphql'
import traefikMiddlewareTCPMeta from '@/components/traefik/MiddlewareTCPMeta.vue';
import traefikMiddlewareTCPView from '@/components/traefik/MiddlewareTCPView.vue';
import { useQuery, useMutation, useMiddlewareTCP, MiddlewareTCPReadExcludes } from '../../../libs/traefik/MiddlewareTCP.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMiddlewareTCPFound, navigation, setNamespacedItemFromRoute } = useMiddlewareTCP();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikMiddlewareTCPQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MiddlewareTCPReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotMiddlewareTCPFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MiddlewareTCPDelete);
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
      <traefikMiddlewareTCPMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=undefined && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddlewareTCP[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikMiddlewareTCPView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=undefined && result.k8sNamespace[0].traefikMiddlewareTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikMiddlewareTCP[0]"
        />
    </div>
  </div>
</template>
