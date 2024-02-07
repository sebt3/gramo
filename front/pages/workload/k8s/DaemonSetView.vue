<script setup lang="ts">
import k8sDaemonSetQuery from '@/queries/k8s/DaemonSet.details.graphql'
import DaemonSetDelete from '@/queries/k8s/DaemonSet.delete.graphql'
import k8sDaemonSetMeta from '@/components/k8s/DaemonSetMeta.vue';
import k8sDaemonSetView from '@/components/k8s/DaemonSetView.vue';
import k8sDaemonSetStatus from '@/components/k8s/DaemonSetStatus.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { useQuery, useMutation, useDaemonSet, DaemonSetReadExcludes } from '../../../libs/k8s/DaemonSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDaemonSetFound, navigation, setNamespacedItemFromRoute } = useDaemonSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDaemonSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DaemonSetReadExcludes
  },
  "childPod": {"filters": [], "excludes": PodListExcludes},
  "usePersistentVolumeClaim": {"filters": [], "excludes": PersistentVolumeClaimListExcludes},
  "useSecret": {"filters": [], "excludes": SecretListExcludes},
  "useConfigMap": {"filters": [], "excludes": ConfigMapListExcludes},
  "usedByService": {"filters": [], "excludes": ServiceListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotDaemonSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DaemonSetDelete);
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
      <k8sDaemonSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sDaemonSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null && result.k8sNamespace[0].k8sDaemonSet[0].childPod!=null && result.k8sNamespace[0].k8sDaemonSet[0].childPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sDaemonSet[0].childPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null && result.k8sNamespace[0].k8sDaemonSet[0].usePersistentVolumeClaim!=null && result.k8sNamespace[0].k8sDaemonSet[0].usePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sDaemonSet[0].usePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null && result.k8sNamespace[0].k8sDaemonSet[0].useSecret!=null && result.k8sNamespace[0].k8sDaemonSet[0].useSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].k8sDaemonSet[0].useSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null && result.k8sNamespace[0].k8sDaemonSet[0].useConfigMap!=null && result.k8sNamespace[0].k8sDaemonSet[0].useConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].k8sDaemonSet[0].useConfigMap"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null && result.k8sNamespace[0].k8sDaemonSet[0].usedByService!=null && result.k8sNamespace[0].k8sDaemonSet[0].usedByService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].k8sDaemonSet[0].usedByService"
       />
    </div>
    <div class="col-md-12">
      <k8sDaemonSetView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
        />
    </div>
  </div>
</template>
