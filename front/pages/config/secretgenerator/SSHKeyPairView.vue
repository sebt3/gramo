<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPair.details.graphql'
import SSHKeyPairDelete from '@/queries/secretgenerator/SSHKeyPair.delete.graphql'
import secretgeneratorSSHKeyPairMeta from '@/components/secretgenerator/SSHKeyPairMeta.vue';
import secretgeneratorSSHKeyPairView from '@/components/secretgenerator/SSHKeyPairView.vue';
import secretgeneratorSSHKeyPairStatus from '@/components/secretgenerator/SSHKeyPairStatus.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { useQuery, useMutation, useSSHKeyPair, SSHKeyPairReadExcludes } from '../../../libs/secretgenerator/SSHKeyPair.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSSHKeyPairFound, navigation, setNamespacedItemFromRoute } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SSHKeyPairReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotSSHKeyPairFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SSHKeyPairDelete);
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
      <secretgeneratorSSHKeyPairMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
    </div>
    <div class="col-md-6">
      <secretgeneratorSSHKeyPairStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].childSecret!=null && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].childSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].childSecret"
       />
    </div>
    <div class="col-md-12">
      <secretgeneratorSSHKeyPairView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
        />
    </div>
  </div>
</template>
