<script setup lang="ts">
import certmanagerChallengeQuery from '@/queries/certmanager/Challenge.read.graphql'
import ChallengeEdit from '@/queries/certmanager/Challenge.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import certmanagerChallengeMeta from '@/components/certmanager/ChallengeMeta.vue';
import certmanagerChallengeEdit from '@/components/certmanager/ChallengeEdit.vue';
import certmanagerChallengeStatus from '@/components/certmanager/ChallengeStatus.vue';
import { useQuery, useMutation, sanitizeData, useChallenge, ChallengeSimpleExcludes } from '../../../libs/certmanager/Challenge.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotChallengeFound, navigation, editor, setNamespacedItemFromRoute } = useChallenge();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerChallengeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ChallengeSimpleExcludes
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
});
const { mutate: patchChallenge, onDone: onPatchChallenge, onError: onPatchError } = useMutation(ChallengeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchChallenge({
    "name": result.k8sNamespace[0].certmanagerChallenge[0].metadata.name,
    "namespace": result.k8sNamespace[0].certmanagerChallenge[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotChallengeFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].certmanagerChallenge[0])});onPatchChallenge(patchDone);onPatchError(patchError);
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
      <certmanagerChallengeEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerChallenge[0]!=undefined && result.k8sNamespace[0].certmanagerChallenge[0]!=null"
        :model="result.k8sNamespace[0].certmanagerChallenge[0]"
       />
    </div>
  </div>
</template>

