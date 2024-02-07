<script setup lang="ts">
import certmanagerChallengeQuery from '@/queries/certmanager/Challenge.read.graphql'
import ChallengeDelete from '@/queries/certmanager/Challenge.delete.graphql'
import certmanagerChallengeList from '@/components/certmanager/ChallengeList.vue';
import { useQuery, useMutation, useChallenge, ChallengeListExcludes } from '../../../libs/certmanager/Challenge.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useChallenge();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(certmanagerChallengeQuery, {
  "obj": {
    "filters": [],
    "excludes": ChallengeListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ChallengeDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <certmanagerChallengeList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.certmanagerChallenge).flat()"
  />
</template>