<script setup lang="ts">
import k8sReplicaSetQuery from '@/queries/k8s/ReplicaSet.details.graphql'
import ReplicaSetDelete from '@/queries/k8s/ReplicaSet.delete.graphql'
import k8sReplicaSetMeta from '@/components/k8s/ReplicaSetMeta.vue';
import k8sReplicaSetView from '@/components/k8s/ReplicaSetView.vue';
import k8sReplicaSetStatus from '@/components/k8s/ReplicaSetStatus.vue';
import { DeploymentListExcludes } from '../../../libs/k8s/custom.js'
import k8sDeploymentMeta from '@/components/k8s/DeploymentMeta.vue';
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
import { useQuery, useMutation, useReplicaSet, ReplicaSetReadExcludes } from '../../../libs/k8s/ReplicaSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotReplicaSetFound, navigation, setNamespacedItemFromRoute } = useReplicaSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sReplicaSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReplicaSetReadExcludes
  },
  "parentDeployment": {"filters": [], "excludes": DeploymentListExcludes},
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotReplicaSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReplicaSetDelete);
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
      <k8sReplicaSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicaSet[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sReplicaSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicaSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null && result.k8sNamespace[0].k8sReplicaSet[0].parentDeployment!=null && result.k8sNamespace[0].k8sReplicaSet[0].parentDeployment.length>0">
      <k8sDeploymentMeta
        :model="result.k8sNamespace[0].k8sReplicaSet[0].parentDeployment[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null && result.k8sNamespace[0].k8sReplicaSet[0].childPod!=null && result.k8sNamespace[0].k8sReplicaSet[0].childPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sReplicaSet[0].childPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null && result.k8sNamespace[0].k8sReplicaSet[0].usePersistentVolumeClaim!=null && result.k8sNamespace[0].k8sReplicaSet[0].usePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sReplicaSet[0].usePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null && result.k8sNamespace[0].k8sReplicaSet[0].useSecret!=null && result.k8sNamespace[0].k8sReplicaSet[0].useSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].k8sReplicaSet[0].useSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null && result.k8sNamespace[0].k8sReplicaSet[0].useConfigMap!=null && result.k8sNamespace[0].k8sReplicaSet[0].useConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].k8sReplicaSet[0].useConfigMap"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null && result.k8sNamespace[0].k8sReplicaSet[0].usedByService!=null && result.k8sNamespace[0].k8sReplicaSet[0].usedByService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].k8sReplicaSet[0].usedByService"
       />
    </div>
    <div class="col-md-12">
      <k8sReplicaSetView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sReplicaSet[0]!=undefined && result.k8sNamespace[0].k8sReplicaSet[0]!=null"
        :model="result.k8sNamespace[0].k8sReplicaSet[0]"
        />
    </div>
  </div>
</template>
