<script setup lang="ts">
import certmanagerCertificateQuery from '@/queries/certmanager/Certificate.details.graphql'
import CertificateDelete from '@/queries/certmanager/Certificate.delete.graphql'
import certmanagerCertificateMeta from '@/components/certmanager/CertificateMeta.vue';
import certmanagerCertificateView from '@/components/certmanager/CertificateView.vue';
import certmanagerCertificateStatus from '@/components/certmanager/CertificateStatus.vue';
import { useQuery, useMutation, useCertificate, CertificateReadExcludes } from '../../../libs/certmanager/Certificate.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCertificateFound, navigation, setNamespacedItemFromRoute } = useCertificate();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerCertificateQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CertificateReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCertificateFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateDelete);
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
      <certmanagerCertificateMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificate[0]!=undefined && result.k8sNamespace[0].certmanagerCertificate[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificate[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerCertificateStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificate[0]!=undefined && result.k8sNamespace[0].certmanagerCertificate[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificate[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerCertificateView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificate[0]!=undefined && result.k8sNamespace[0].certmanagerCertificate[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificate[0]"
        />
    </div>
  </div>
</template>
