<script setup lang="ts">
import k8sCertificateSigningRequestQuery from '@/queries/k8s/CertificateSigningRequest.details.graphql'
import CertificateSigningRequestDelete from '@/queries/k8s/CertificateSigningRequest.delete.graphql'
import k8sCertificateSigningRequestMeta from '@/components/k8s/CertificateSigningRequestMeta.vue';
import k8sCertificateSigningRequestView from '@/components/k8s/CertificateSigningRequestView.vue';
import k8sCertificateSigningRequestStatus from '@/components/k8s/CertificateSigningRequestStatus.vue';
import { useQuery, useMutation, useCertificateSigningRequest, CertificateSigningRequestReadExcludes } from '../../../libs/k8s/CertificateSigningRequest.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCertificateSigningRequestFound, navigation, setItemFromRoute } = useCertificateSigningRequest();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCertificateSigningRequestQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CertificateSigningRequestReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCertificateSigningRequestFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateSigningRequestDelete);
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
      <k8sCertificateSigningRequestMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sCertificateSigningRequestStatus
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCertificateSigningRequestView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
        />
    </div>
  </div>
</template>
