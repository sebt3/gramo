<script setup lang="ts">
import k8sPodQuery from '@/queries/k8s/Pod.details.graphql'
import PodDelete from '@/queries/k8s/Pod.delete.graphql'
import k8sPodMeta from '@/components/k8s/PodMeta.vue';
import k8sPodView from '@/components/k8s/PodView.vue';
import k8sPodStatus from '@/components/k8s/PodStatus.vue';
import { ReplicaSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sReplicaSetMeta from '@/components/k8s/ReplicaSetMeta.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetMeta from '@/components/k8s/StatefulSetMeta.vue';
import { DaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sDaemonSetMeta from '@/components/k8s/DaemonSetMeta.vue';
import { JobListExcludes } from '../../../libs/k8s/custom.js'
import k8sJobMeta from '@/components/k8s/JobMeta.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { NodeListExcludes } from '../../../libs/k8s/custom.js'
import k8sNodeMeta from '@/components/k8s/NodeMeta.vue';
import { ServiceAccountListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { useQuery, useMutation, usePod, PodReadExcludes } from '../../../libs/k8s/Pod.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodFound, navigation, setNamespacedItemFromRoute } = usePod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodReadExcludes
  },
  "parentReplicaSet": {"filters": [], "excludes": ReplicaSetListExcludes},
  "parentStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "parentDaemonSet": {"filters": [], "excludes": DaemonSetListExcludes},
  "parentJob": {"filters": [], "excludes": JobListExcludes},
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "useNode": {"filters": [], "excludes": NodeListExcludes},
  "useServiceAccount": {"filters": [], "excludes": ServiceAccountListExcludes},
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPodFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodDelete);
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
      <k8sPodMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPodStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentReplicaSet!=null && result.k8sNamespace[0].k8sPod[0].parentReplicaSet.length>0">
      <k8sReplicaSetMeta
        :model="result.k8sNamespace[0].k8sPod[0].parentReplicaSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentStatefulSet!=null && result.k8sNamespace[0].k8sPod[0].parentStatefulSet.length>0">
      <k8sStatefulSetMeta
        :model="result.k8sNamespace[0].k8sPod[0].parentStatefulSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentDaemonSet!=null && result.k8sNamespace[0].k8sPod[0].parentDaemonSet.length>0">
      <k8sDaemonSetMeta
        :model="result.k8sNamespace[0].k8sPod[0].parentDaemonSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentJob!=null && result.k8sNamespace[0].k8sPod[0].parentJob.length>0">
      <k8sJobMeta
        :model="result.k8sNamespace[0].k8sPod[0].parentJob[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentCluster!=null && result.k8sNamespace[0].k8sPod[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sPod[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].useNode!=null && result.k8sNamespace[0].k8sPod[0].useNode.length>0">
      <k8sNodeMeta
        :model="result.k8sNamespace[0].k8sPod[0].useNode[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].useServiceAccount!=null && result.k8sNamespace[0].k8sPod[0].useServiceAccount.length>0">
      <k8sServiceAccountMeta
        :model="result.k8sNamespace[0].k8sPod[0].useServiceAccount[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].usePersistentVolumeClaim!=null && result.k8sNamespace[0].k8sPod[0].usePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sPod[0].usePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].useSecret!=null && result.k8sNamespace[0].k8sPod[0].useSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].k8sPod[0].useSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].useConfigMap!=null && result.k8sNamespace[0].k8sPod[0].useConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].k8sPod[0].useConfigMap"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].usedByService!=null && result.k8sNamespace[0].k8sPod[0].usedByService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].k8sPod[0].usedByService"
       />
    </div>
    <div class="col-md-12">
      <k8sPodView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
        />
    </div>
  </div>
</template>
