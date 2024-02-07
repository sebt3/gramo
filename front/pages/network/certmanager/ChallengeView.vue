<script setup lang="ts">
import certmanagerChallengeQuery from '@/queries/certmanager/Challenge.details.graphql'
import ChallengeDelete from '@/queries/certmanager/Challenge.delete.graphql'
import certmanagerChallengeMeta from '@/components/certmanager/ChallengeMeta.vue';
import certmanagerChallengeView from '@/components/certmanager/ChallengeView.vue';
import certmanagerChallengeStatus from '@/components/certmanager/ChallengeStatus.vue';
import { useQuery, useMutation, useChallenge, ChallengeReadExcludes } from '../../../libs/certmanager/Challenge.js'
const { onErrorHandler, notifySuccess, notifyError, onNotChallengeFound, navigation, setNamespacedItemFromRoute } = useChallenge();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerChallengeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ChallengeReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotChallengeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ChallengeDelete);
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
      <certmanagerChallengeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerChallenge[0]!=undefined && result.k8sNamespace[0].certmanagerChallenge[0]!=null"
        :model="result.k8sNamespace[0].certmanagerChallenge[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerChallengeStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerChallenge[0]!=undefined && result.k8sNamespace[0].certmanagerChallenge[0]!=null"
        :model="result.k8sNamespace[0].certmanagerChallenge[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerChallengeView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerChallenge[0]!=undefined && result.k8sNamespace[0].certmanagerChallenge[0]!=null"
        :model="result.k8sNamespace[0].certmanagerChallenge[0]"
        />
    </div>
  </div>
</template>
