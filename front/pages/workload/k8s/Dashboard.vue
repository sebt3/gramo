<script setup lang="ts">
import workloadQuery from '@/queries/k8s/workload.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8sLimitRangeList from '@/components/k8s/LimitRangeList.vue';
import { LimitRangeListExcludes } from '../../../libs/k8s/LimitRange.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { PodListExcludes } from '../../../libs/k8s/Pod.js'
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import { PodTemplateListExcludes } from '../../../libs/k8s/PodTemplate.js'
import k8sReplicationControllerList from '@/components/k8s/ReplicationControllerList.vue';
import { ReplicationControllerListExcludes } from '../../../libs/k8s/ReplicationController.js'
import k8sResourceQuotaList from '@/components/k8s/ResourceQuotaList.vue';
import { ResourceQuotaListExcludes } from '../../../libs/k8s/ResourceQuota.js'
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import { DaemonSetListExcludes } from '../../../libs/k8s/DaemonSet.js'
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import { DeploymentListExcludes } from '../../../libs/k8s/Deployment.js'
import k8sReplicaSetList from '@/components/k8s/ReplicaSetList.vue';
import { ReplicaSetListExcludes } from '../../../libs/k8s/ReplicaSet.js'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/StatefulSet.js'
import k8sHorizontalPodAutoscalerList from '@/components/k8s/HorizontalPodAutoscalerList.vue';
import { HorizontalPodAutoscalerListExcludes } from '../../../libs/k8s/HorizontalPodAutoscaler.js'
import k8sJobList from '@/components/k8s/JobList.vue';
import { JobListExcludes } from '../../../libs/k8s/Job.js'
import k8sCronJobList from '@/components/k8s/CronJobList.vue';
import { CronJobListExcludes } from '../../../libs/k8s/CronJob.js'
import k8sPodDisruptionBudgetList from '@/components/k8s/PodDisruptionBudgetList.vue';
import { PodDisruptionBudgetListExcludes } from '../../../libs/k8s/PodDisruptionBudget.js'
import k8sPriorityClassList from '@/components/k8s/PriorityClassList.vue';
import { PriorityClassListExcludes } from '../../../libs/k8s/PriorityClass.js'
import k8sRuntimeClassList from '@/components/k8s/RuntimeClassList.vue';
import { RuntimeClassListExcludes } from '../../../libs/k8s/RuntimeClass.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const LimitRangeByTs = ref([]);
const PodByTs = ref([]);
const PodTemplateByTs = ref([]);
const ReplicationControllerByTs = ref([]);
const ResourceQuotaByTs = ref([]);
const DaemonSetByTs = ref([]);
const DeploymentByTs = ref([]);
const ReplicaSetByTs = ref([]);
const StatefulSetByTs = ref([]);
const HorizontalPodAutoscalerByTs = ref([]);
const JobByTs = ref([]);
const CronJobByTs = ref([]);
const PodDisruptionBudgetByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(workloadQuery, {
  "LimitRange": {
    "filters": [],
    "excludes": LimitRangeListExcludes
  },
  "Pod": {
    "filters": [],
    "excludes": PodListExcludes
  },
  "PodTemplate": {
    "filters": [],
    "excludes": PodTemplateListExcludes
  },
  "ReplicationController": {
    "filters": [],
    "excludes": ReplicationControllerListExcludes
  },
  "ResourceQuota": {
    "filters": [],
    "excludes": ResourceQuotaListExcludes
  },
  "DaemonSet": {
    "filters": [],
    "excludes": DaemonSetListExcludes
  },
  "Deployment": {
    "filters": [],
    "excludes": DeploymentListExcludes
  },
  "ReplicaSet": {
    "filters": [],
    "excludes": ReplicaSetListExcludes
  },
  "StatefulSet": {
    "filters": [],
    "excludes": StatefulSetListExcludes
  },
  "HorizontalPodAutoscaler": {
    "filters": [],
    "excludes": HorizontalPodAutoscalerListExcludes
  },
  "Job": {
    "filters": [],
    "excludes": JobListExcludes
  },
  "CronJob": {
    "filters": [],
    "excludes": CronJobListExcludes
  },
  "PodDisruptionBudget": {
    "filters": [],
    "excludes": PodDisruptionBudgetListExcludes
  },
  "PriorityClass": {
    "filters": [],
    "excludes": PriorityClassListExcludes
  },
  "RuntimeClass": {
    "filters": [],
    "excludes": RuntimeClassListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    LimitRangeByTs.value.length = 0;
    LimitRangeByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sLimitRange.length}}).filter(n => n.value>0))
    PodByTs.value.length = 0;
    PodByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sPod.length}}).filter(n => n.value>0))
    PodTemplateByTs.value.length = 0;
    PodTemplateByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sPodTemplate.length}}).filter(n => n.value>0))
    ReplicationControllerByTs.value.length = 0;
    ReplicationControllerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sReplicationController.length}}).filter(n => n.value>0))
    ResourceQuotaByTs.value.length = 0;
    ResourceQuotaByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sResourceQuota.length}}).filter(n => n.value>0))
    DaemonSetByTs.value.length = 0;
    DaemonSetByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sDaemonSet.length}}).filter(n => n.value>0))
    DeploymentByTs.value.length = 0;
    DeploymentByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sDeployment.length}}).filter(n => n.value>0))
    ReplicaSetByTs.value.length = 0;
    ReplicaSetByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sReplicaSet.length}}).filter(n => n.value>0))
    StatefulSetByTs.value.length = 0;
    StatefulSetByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sStatefulSet.length}}).filter(n => n.value>0))
    HorizontalPodAutoscalerByTs.value.length = 0;
    HorizontalPodAutoscalerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sHorizontalPodAutoscaler.length}}).filter(n => n.value>0))
    JobByTs.value.length = 0;
    JobByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sJob.length}}).filter(n => n.value>0))
    CronJobByTs.value.length = 0;
    CronJobByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sCronJob.length}}).filter(n => n.value>0))
    PodDisruptionBudgetByTs.value.length = 0;
    PodDisruptionBudgetByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sPodDisruptionBudget.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && LimitRangeByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">LimitRange per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="LimitRangeByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PodByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Pod per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PodByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PodTemplateByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodTemplate per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PodTemplateByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ReplicationControllerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ReplicationController per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ReplicationControllerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ResourceQuotaByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ResourceQuota per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ResourceQuotaByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && DaemonSetByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">DaemonSet per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="DaemonSetByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && DeploymentByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Deployment per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="DeploymentByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ReplicaSetByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ReplicaSet per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ReplicaSetByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && StatefulSetByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StatefulSet per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="StatefulSetByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && HorizontalPodAutoscalerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HorizontalPodAutoscaler per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="HorizontalPodAutoscalerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && JobByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Job per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="JobByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && CronJobByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CronJob per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="CronJobByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PodDisruptionBudgetByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodDisruptionBudget per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PodDisruptionBudgetByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8sLimitRangeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sLimitRange']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sLimitRange).flat()"
  />
  <k8sPodList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sPod']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sPod).flat()"
  />
  <k8sPodTemplateList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sPodTemplate']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sPodTemplate).flat()"
  />
  <k8sReplicationControllerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sReplicationController']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sReplicationController).flat()"
  />
  <k8sResourceQuotaList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sResourceQuota']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sResourceQuota).flat()"
  />
  <k8sDaemonSetList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sDaemonSet']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sDaemonSet).flat()"
  />
  <k8sDeploymentList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sDeployment']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sDeployment).flat()"
  />
  <k8sReplicaSetList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sReplicaSet']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sReplicaSet).flat()"
  />
  <k8sStatefulSetList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sStatefulSet']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sStatefulSet).flat()"
  />
  <k8sHorizontalPodAutoscalerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sHorizontalPodAutoscaler']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sHorizontalPodAutoscaler).flat()"
  />
  <k8sJobList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sJob']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sJob).flat()"
  />
  <k8sCronJobList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sCronJob']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sCronJob).flat()"
  />
  <k8sPodDisruptionBudgetList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sPodDisruptionBudget']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sPodDisruptionBudget).flat()"
  />
  <k8sPriorityClassList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sPriorityClass']) && result['k8sPriorityClass'].length>0"
    :model="result.k8sPriorityClass"
  />
  <k8sRuntimeClassList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sRuntimeClass']) && result['k8sRuntimeClass'].length>0"
    :model="result.k8sRuntimeClass"
  />
</template>