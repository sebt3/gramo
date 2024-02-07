<script setup lang="ts">
import traefikTraefikServiceQuery from '@/queries/traefik/TraefikService.details.graphql'
import TraefikServiceDelete from '@/queries/traefik/TraefikService.delete.graphql'
import traefikTraefikServiceMeta from '@/components/traefik/TraefikServiceMeta.vue';
import traefikTraefikServiceView from '@/components/traefik/TraefikServiceView.vue';
import { useQuery, useMutation, useTraefikService, TraefikServiceReadExcludes } from '../../../libs/traefik/TraefikService.js'
const { onErrorHandler, notifySuccess, notifyError, onNotTraefikServiceFound, navigation, setNamespacedItemFromRoute } = useTraefikService();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTraefikServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TraefikServiceReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotTraefikServiceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TraefikServiceDelete);
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
      <traefikTraefikServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTraefikService[0]!=undefined && result.k8sNamespace[0].traefikTraefikService[0]!=null"
        :model="result.k8sNamespace[0].traefikTraefikService[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikTraefikServiceView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTraefikService[0]!=undefined && result.k8sNamespace[0].traefikTraefikService[0]!=null"
        :model="result.k8sNamespace[0].traefikTraefikService[0]"
        />
    </div>
  </div>
</template>
