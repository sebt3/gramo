<script setup lang="ts">
import k8sPersistentVolumeClaimQuery from '@/queries/k8s/PersistentVolumeClaim.details.graphql'
import PersistentVolumeClaimDelete from '@/queries/k8s/PersistentVolumeClaim.delete.graphql'
import k8sPersistentVolumeClaimMeta from '@/components/k8s/PersistentVolumeClaimMeta.vue';
import k8sPersistentVolumeClaimView from '@/components/k8s/PersistentVolumeClaimView.vue';
import k8sPersistentVolumeClaimStatus from '@/components/k8s/PersistentVolumeClaimStatus.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetMeta from '@/components/k8s/StatefulSetMeta.vue';
import { StorageClassListExcludes } from '../../../libs/k8s/custom.js'
import k8sStorageClassList from '@/components/k8s/StorageClassList.vue';
import { PersistentVolumeListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeList from '@/components/k8s/PersistentVolumeList.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { ReplicaSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sReplicaSetList from '@/components/k8s/ReplicaSetList.vue';
import { JobListExcludes } from '../../../libs/k8s/custom.js'
import k8sJobList from '@/components/k8s/JobList.vue';
import { CronJobListExcludes } from '../../../libs/k8s/custom.js'
import k8sCronJobList from '@/components/k8s/CronJobList.vue';
import { DeploymentListExcludes } from '../../../libs/k8s/custom.js'
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import { DaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import { PodTemplateListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import { useQuery, useMutation, usePersistentVolumeClaim, PersistentVolumeClaimReadExcludes } from '../../../libs/k8s/PersistentVolumeClaim.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPersistentVolumeClaimFound, navigation, setNamespacedItemFromRoute } = usePersistentVolumeClaim();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeClaimQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PersistentVolumeClaimReadExcludes
  },
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "parentStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "providedToStorageClass": {"filters": [], "excludes": StorageClassListExcludes},
  "usePersistentVolume": {"filters": [], "excludes": PersistentVolumeListExcludes},
  "usedByPod": {"filters": [], "excludes": PodListExcludes},
  "usedByReplicaSet": {"filters": [], "excludes": ReplicaSetListExcludes},
  "usedByJob": {"filters": [], "excludes": JobListExcludes},
  "usedByCronJob": {"filters": [], "excludes": CronJobListExcludes},
  "usedByDeployment": {"filters": [], "excludes": DeploymentListExcludes},
  "usedByDaemonSet": {"filters": [], "excludes": DaemonSetListExcludes},
  "usedByPodTemplate": {"filters": [], "excludes": PodTemplateListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPersistentVolumeClaimFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PersistentVolumeClaimDelete);
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
      <k8sPersistentVolumeClaimMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPersistentVolumeClaimStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentCluster!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentStatefulSet!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentStatefulSet.length>0">
      <k8sStatefulSetMeta
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].parentStatefulSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].providedToStorageClass!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].providedToStorageClass.length>0">
      <k8sStorageClassList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].providedToStorageClass"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usePersistentVolume!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usePersistentVolume.length>0">
      <k8sPersistentVolumeList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usePersistentVolume"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByPod!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByReplicaSet!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByReplicaSet.length>0">
      <k8sReplicaSetList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByReplicaSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByJob!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByJob.length>0">
      <k8sJobList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByCronJob!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByCronJob.length>0">
      <k8sCronJobList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByCronJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByDeployment!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByDeployment.length>0">
      <k8sDeploymentList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByDeployment"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByDaemonSet!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByDaemonSet.length>0">
      <k8sDaemonSetList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByDaemonSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByPodTemplate!=null && result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByPodTemplate.length>0">
      <k8sPodTemplateList
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0].usedByPodTemplate"
       />
    </div>
    <div class="col-md-12">
      <k8sPersistentVolumeClaimView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=undefined && result.k8sNamespace[0].k8sPersistentVolumeClaim[0]!=null"
        :model="result.k8sNamespace[0].k8sPersistentVolumeClaim[0]"
        />
    </div>
  </div>
</template>
