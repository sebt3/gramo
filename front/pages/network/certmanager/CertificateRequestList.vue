<script setup lang="ts">
import certmanagerCertificateRequestQuery from '@/queries/certmanager/CertificateRequest.read.graphql'
import CertificateRequestDelete from '@/queries/certmanager/CertificateRequest.delete.graphql'
import certmanagerCertificateRequestList from '@/components/certmanager/CertificateRequestList.vue';
import { useQuery, useMutation, useCertificateRequest, CertificateRequestListExcludes } from '../../../libs/certmanager/CertificateRequest.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useCertificateRequest();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(certmanagerCertificateRequestQuery, {
  "obj": {
    "filters": [],
    "excludes": CertificateRequestListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateRequestDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <certmanagerCertificateRequestList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.certmanagerCertificateRequest).flat()"
  />
</template>