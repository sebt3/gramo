<script setup lang="ts">
import cnpgClusterQuery from '@/queries/cnpg/Cluster.details.graphql'
import ClusterDelete from '@/queries/cnpg/Cluster.delete.graphql'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import cnpgClusterView from '@/components/cnpg/ClusterView.vue';
import cnpgClusterStatus from '@/components/cnpg/ClusterStatus.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { ServiceAccountListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import { PodDisruptionBudgetListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodDisruptionBudgetList from '@/components/k8s/PodDisruptionBudgetList.vue';
import { RoleListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleList from '@/components/k8s/RoleList.vue';
import { RoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleBindingList from '@/components/k8s/RoleBindingList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { useQuery, useMutation, useCluster, ClusterReadExcludes } from '../../../libs/cnpg/Cluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterFound, navigation, setNamespacedItemFromRoute } = useCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterReadExcludes
  },
  "childPod": {"filters": [], "excludes": PodListExcludes},
  "childSecret": {"filters": [], "excludes": SecretListExcludes},
  "childService": {"filters": [], "excludes": ServiceListExcludes},
  "childServiceAccount": {"filters": [], "excludes": ServiceAccountListExcludes},
  "childPodDisruptionBudget": {"filters": [], "excludes": PodDisruptionBudgetListExcludes},
  "childRole": {"filters": [], "excludes": RoleListExcludes},
  "childRoleBinding": {"filters": [], "excludes": RoleBindingListExcludes},
  "childPersistentVolumeClaim": {"filters": [], "excludes": PersistentVolumeClaimListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotClusterFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterDelete);
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
      <cnpgClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <cnpgClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childServiceAccount!=null && result.k8sNamespace[0].cnpgCluster[0].childServiceAccount.length>0">
      <k8sServiceAccountMeta
        :model="result.k8sNamespace[0].cnpgCluster[0].childServiceAccount[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childPod!=null && result.k8sNamespace[0].cnpgCluster[0].childPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].cnpgCluster[0].childPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childSecret!=null && result.k8sNamespace[0].cnpgCluster[0].childSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].cnpgCluster[0].childSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childService!=null && result.k8sNamespace[0].cnpgCluster[0].childService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].cnpgCluster[0].childService"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childPodDisruptionBudget!=null && result.k8sNamespace[0].cnpgCluster[0].childPodDisruptionBudget.length>0">
      <k8sPodDisruptionBudgetList
        :model="result.k8sNamespace[0].cnpgCluster[0].childPodDisruptionBudget"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childRole!=null && result.k8sNamespace[0].cnpgCluster[0].childRole.length>0">
      <k8sRoleList
        :model="result.k8sNamespace[0].cnpgCluster[0].childRole"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childRoleBinding!=null && result.k8sNamespace[0].cnpgCluster[0].childRoleBinding.length>0">
      <k8sRoleBindingList
        :model="result.k8sNamespace[0].cnpgCluster[0].childRoleBinding"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childPersistentVolumeClaim!=null && result.k8sNamespace[0].cnpgCluster[0].childPersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].cnpgCluster[0].childPersistentVolumeClaim"
       />
    </div>
    <div class="col-md-12">
      <cnpgClusterView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
        />
    </div>
  </div>
</template>
