<script setup lang="ts">
import traefikTLSStoreQuery from '@/queries/traefik/TLSStore.details.graphql'
import TLSStoreDelete from '@/queries/traefik/TLSStore.delete.graphql'
import traefikTLSStoreMeta from '@/components/traefik/TLSStoreMeta.vue';
import traefikTLSStoreView from '@/components/traefik/TLSStoreView.vue';
import { useQuery, useMutation, useTLSStore, TLSStoreReadExcludes } from '../../../libs/traefik/TLSStore.js'
const { onErrorHandler, notifySuccess, notifyError, onNotTLSStoreFound, navigation, setNamespacedItemFromRoute } = useTLSStore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSStoreQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TLSStoreReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotTLSStoreFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TLSStoreDelete);
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
      <traefikTLSStoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSStore[0]!=undefined && result.k8sNamespace[0].traefikTLSStore[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSStore[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikTLSStoreView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSStore[0]!=undefined && result.k8sNamespace[0].traefikTLSStore[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSStore[0]"
        />
    </div>
  </div>
</template>
