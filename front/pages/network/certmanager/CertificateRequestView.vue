<script setup lang="ts">
import certmanagerCertificateRequestQuery from '@/queries/certmanager/CertificateRequest.details.graphql'
import CertificateRequestDelete from '@/queries/certmanager/CertificateRequest.delete.graphql'
import certmanagerCertificateRequestMeta from '@/components/certmanager/CertificateRequestMeta.vue';
import certmanagerCertificateRequestView from '@/components/certmanager/CertificateRequestView.vue';
import certmanagerCertificateRequestStatus from '@/components/certmanager/CertificateRequestStatus.vue';
import { useQuery, useMutation, useCertificateRequest, CertificateRequestReadExcludes } from '../../../libs/certmanager/CertificateRequest.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCertificateRequestFound, navigation, setNamespacedItemFromRoute } = useCertificateRequest();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerCertificateRequestQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CertificateRequestReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCertificateRequestFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateRequestDelete);
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
      <certmanagerCertificateRequestMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=undefined && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificateRequest[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerCertificateRequestStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=undefined && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificateRequest[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerCertificateRequestView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=undefined && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificateRequest[0]"
        />
    </div>
  </div>
</template>
