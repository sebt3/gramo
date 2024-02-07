<script setup lang="ts">
import secretgeneratorBasicAuthQuery from '@/queries/secretgenerator/BasicAuth.details.graphql'
import BasicAuthDelete from '@/queries/secretgenerator/BasicAuth.delete.graphql'
import secretgeneratorBasicAuthMeta from '@/components/secretgenerator/BasicAuthMeta.vue';
import secretgeneratorBasicAuthView from '@/components/secretgenerator/BasicAuthView.vue';
import secretgeneratorBasicAuthStatus from '@/components/secretgenerator/BasicAuthStatus.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { useQuery, useMutation, useBasicAuth, BasicAuthReadExcludes } from '../../../libs/secretgenerator/BasicAuth.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBasicAuthFound, navigation, setNamespacedItemFromRoute } = useBasicAuth();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorBasicAuthQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BasicAuthReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotBasicAuthFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BasicAuthDelete);
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
      <secretgeneratorBasicAuthMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0]"
       />
    </div>
    <div class="col-md-6">
      <secretgeneratorBasicAuthStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null && result.k8sNamespace[0].secretgeneratorBasicAuth[0].childSecret!=null && result.k8sNamespace[0].secretgeneratorBasicAuth[0].childSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0].childSecret"
       />
    </div>
    <div class="col-md-12">
      <secretgeneratorBasicAuthView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=undefined && result.k8sNamespace[0].secretgeneratorBasicAuth[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorBasicAuth[0]"
        />
    </div>
  </div>
</template>
