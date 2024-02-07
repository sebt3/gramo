<script setup lang="ts">
import traefikTLSOptionQuery from '@/queries/traefik/TLSOption.details.graphql'
import TLSOptionDelete from '@/queries/traefik/TLSOption.delete.graphql'
import traefikTLSOptionMeta from '@/components/traefik/TLSOptionMeta.vue';
import traefikTLSOptionView from '@/components/traefik/TLSOptionView.vue';
import { useQuery, useMutation, useTLSOption, TLSOptionReadExcludes } from '../../../libs/traefik/TLSOption.js'
const { onErrorHandler, notifySuccess, notifyError, onNotTLSOptionFound, navigation, setNamespacedItemFromRoute } = useTLSOption();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSOptionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TLSOptionReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotTLSOptionFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TLSOptionDelete);
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
      <traefikTLSOptionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSOption[0]!=undefined && result.k8sNamespace[0].traefikTLSOption[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSOption[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikTLSOptionView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSOption[0]!=undefined && result.k8sNamespace[0].traefikTLSOption[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSOption[0]"
        />
    </div>
  </div>
</template>
