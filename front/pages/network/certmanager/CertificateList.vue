<script setup lang="ts">
import certmanagerCertificateQuery from '@/queries/certmanager/Certificate.read.graphql'
import CertificateDelete from '@/queries/certmanager/Certificate.delete.graphql'
import certmanagerCertificateList from '@/components/certmanager/CertificateList.vue';
import { useQuery, useMutation, useCertificate, CertificateListExcludes } from '../../../libs/certmanager/Certificate.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useCertificate();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(certmanagerCertificateQuery, {
  "obj": {
    "filters": [],
    "excludes": CertificateListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <certmanagerCertificateList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.certmanagerCertificate).flat()"
  />
</template>