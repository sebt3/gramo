<script setup lang="ts">
import certmanagerIssuerQuery from '@/queries/certmanager/Issuer.read.graphql'
import IssuerDelete from '@/queries/certmanager/Issuer.delete.graphql'
import certmanagerIssuerList from '@/components/certmanager/IssuerList.vue';
import { useQuery, useMutation, useIssuer, IssuerListExcludes } from '../../../libs/certmanager/Issuer.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useIssuer();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(certmanagerIssuerQuery, {
  "obj": {
    "filters": [],
    "excludes": IssuerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IssuerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <certmanagerIssuerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.certmanagerIssuer).flat()"
  />
</template>