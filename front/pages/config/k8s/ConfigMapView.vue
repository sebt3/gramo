<script setup lang="ts">
import k8sConfigMapQuery from '@/queries/k8s/ConfigMap.details.graphql'
import ConfigMapDelete from '@/queries/k8s/ConfigMap.delete.graphql'
import k8sConfigMapMeta from '@/components/k8s/ConfigMapMeta.vue';
import k8sConfigMapView from '@/components/k8s/ConfigMapView.vue';
import { PrometheusListExcludes } from '../../../libs/monitoring/custom.js'
import monitoringPrometheusMeta from '@/components/monitoring/PrometheusMeta.vue';
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
import { useQuery, useMutation, useConfigMap, ConfigMapReadExcludes } from '../../../libs/k8s/ConfigMap.js'
const { onErrorHandler, notifySuccess, notifyError, onNotConfigMapFound, navigation, setNamespacedItemFromRoute } = useConfigMap();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sConfigMapQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ConfigMapReadExcludes
  },
  "parentPrometheus": {"filters": [], "excludes": PrometheusListExcludes},
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotConfigMapFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ConfigMapDelete);
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
    <div class="col-md-3">
      <k8sConfigMapMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null"
        :model="result.k8sNamespace[0].k8sConfigMap[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].parentPrometheus!=null && result.k8sNamespace[0].k8sConfigMap[0].parentPrometheus.length>0">
      <monitoringPrometheusMeta
        :model="result.k8sNamespace[0].k8sConfigMap[0].parentPrometheus[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByPod!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByReplicaSet!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByReplicaSet.length>0">
      <k8sReplicaSetList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByReplicaSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByJob!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByJob.length>0">
      <k8sJobList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByCronJob!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByCronJob.length>0">
      <k8sCronJobList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByCronJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByDeployment!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByDeployment.length>0">
      <k8sDeploymentList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByDeployment"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByDaemonSet!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByDaemonSet.length>0">
      <k8sDaemonSetList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByDaemonSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByPodTemplate!=null && result.k8sNamespace[0].k8sConfigMap[0].usedByPodTemplate.length>0">
      <k8sPodTemplateList
        :model="result.k8sNamespace[0].k8sConfigMap[0].usedByPodTemplate"
       />
    </div>
    <div class="col-md-12">
      <k8sConfigMapView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null"
        :model="result.k8sNamespace[0].k8sConfigMap[0]"
        />
    </div>
  </div>
</template>
