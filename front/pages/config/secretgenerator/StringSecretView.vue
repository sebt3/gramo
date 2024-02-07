<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecret.details.graphql'
import StringSecretDelete from '@/queries/secretgenerator/StringSecret.delete.graphql'
import secretgeneratorStringSecretMeta from '@/components/secretgenerator/StringSecretMeta.vue';
import secretgeneratorStringSecretView from '@/components/secretgenerator/StringSecretView.vue';
import secretgeneratorStringSecretStatus from '@/components/secretgenerator/StringSecretStatus.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { useQuery, useMutation, useStringSecret, StringSecretReadExcludes } from '../../../libs/secretgenerator/StringSecret.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStringSecretFound, navigation, setNamespacedItemFromRoute } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StringSecretReadExcludes
  },
  "childSecret": {"filters": [], "excludes": SecretListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotStringSecretFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StringSecretDelete);
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
      <secretgeneratorStringSecretMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
    </div>
    <div class="col-md-6">
      <secretgeneratorStringSecretStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null && result.k8sNamespace[0].secretgeneratorStringSecret[0].childSecret!=null && result.k8sNamespace[0].secretgeneratorStringSecret[0].childSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0].childSecret"
       />
    </div>
    <div class="col-md-12">
      <secretgeneratorStringSecretView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
        />
    </div>
  </div>
</template>
