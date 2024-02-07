<script setup lang="ts">
import certmanagerIssuerQuery from '@/queries/certmanager/Issuer.details.graphql'
import IssuerDelete from '@/queries/certmanager/Issuer.delete.graphql'
import certmanagerIssuerMeta from '@/components/certmanager/IssuerMeta.vue';
import certmanagerIssuerView from '@/components/certmanager/IssuerView.vue';
import certmanagerIssuerStatus from '@/components/certmanager/IssuerStatus.vue';
import { useQuery, useMutation, useIssuer, IssuerReadExcludes } from '../../../libs/certmanager/Issuer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIssuerFound, navigation, setNamespacedItemFromRoute } = useIssuer();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerIssuerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IssuerReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIssuerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IssuerDelete);
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
    <div class="col-md-6">
      <certmanagerIssuerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerIssuerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerIssuerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
        />
    </div>
  </div>
</template>
