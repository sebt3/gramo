<script setup lang="ts">
import k8sCertificateSigningRequestQuery from '@/queries/k8s/CertificateSigningRequest.read.graphql'
import CertificateSigningRequestDelete from '@/queries/k8s/CertificateSigningRequest.delete.graphql'
import k8sCertificateSigningRequestList from '@/components/k8s/CertificateSigningRequestList.vue';
import { useQuery, useMutation, useCertificateSigningRequest, CertificateSigningRequestListExcludes } from '../../../libs/k8s/CertificateSigningRequest.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useCertificateSigningRequest();
const { result, refetch, onError } = useQuery(k8sCertificateSigningRequestQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateSigningRequestDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sCertificateSigningRequestList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sCertificateSigningRequest'] !== undefined"
    :model="result.k8sCertificateSigningRequest"
  />
</template>