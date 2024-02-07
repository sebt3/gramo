<script setup lang="ts">
import traefikIngressRouteTCPQuery from '@/queries/traefik/IngressRouteTCP.details.graphql'
import IngressRouteTCPDelete from '@/queries/traefik/IngressRouteTCP.delete.graphql'
import traefikIngressRouteTCPMeta from '@/components/traefik/IngressRouteTCPMeta.vue';
import traefikIngressRouteTCPView from '@/components/traefik/IngressRouteTCPView.vue';
import { useQuery, useMutation, useIngressRouteTCP, IngressRouteTCPReadExcludes } from '../../../libs/traefik/IngressRouteTCP.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIngressRouteTCPFound, navigation, setNamespacedItemFromRoute } = useIngressRouteTCP();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikIngressRouteTCPQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressRouteTCPReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIngressRouteTCPFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressRouteTCPDelete);
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
      <traefikIngressRouteTCPMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteTCP[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikIngressRouteTCPView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=undefined && result.k8sNamespace[0].traefikIngressRouteTCP[0]!=null"
        :model="result.k8sNamespace[0].traefikIngressRouteTCP[0]"
        />
    </div>
  </div>
</template>
