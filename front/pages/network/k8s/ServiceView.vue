<script setup lang="ts">
import k8sServiceQuery from '@/queries/k8s/Service.details.graphql'
import ServiceDelete from '@/queries/k8s/Service.delete.graphql'
import k8sServiceMeta from '@/components/k8s/ServiceMeta.vue';
import k8sServiceView from '@/components/k8s/ServiceView.vue';
import k8sServiceStatus from '@/components/k8s/ServiceStatus.vue';
import { MongoDBCommunityListExcludes } from '../../../libs/mongodb/custom.js'
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import { RedisListExcludes } from '../../../libs/redis/custom.js'
import redisRedisMeta from '@/components/redis/RedisMeta.vue';
import { PoolerListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { PrometheusListExcludes } from '../../../libs/monitoring/custom.js'
import monitoringPrometheusMeta from '@/components/monitoring/PrometheusMeta.vue';
import { AlertmanagerListExcludes } from '../../../libs/monitoring/custom.js'
import monitoringAlertmanagerMeta from '@/components/monitoring/AlertmanagerMeta.vue';
import { EndpointSliceListExcludes } from '../../../libs/k8s/custom.js'
import k8sEndpointSliceList from '@/components/k8s/EndpointSliceList.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { ReplicaSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sReplicaSetList from '@/components/k8s/ReplicaSetList.vue';
import { DeploymentListExcludes } from '../../../libs/k8s/custom.js'
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import { DaemonSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sDaemonSetList from '@/components/k8s/DaemonSetList.vue';
import { PodTemplateListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodTemplateList from '@/components/k8s/PodTemplateList.vue';
import { IngressListExcludes } from '../../../libs/k8s/custom.js'
import k8sIngressList from '@/components/k8s/IngressList.vue';
import { useQuery, useMutation, useService, ServiceReadExcludes } from '../../../libs/k8s/Service.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceFound, navigation, setNamespacedItemFromRoute } = useService();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceReadExcludes
  },
  "parentMongoDBCommunity": {"filters": [], "excludes": MongoDBCommunityListExcludes},
  "parentRedis": {"filters": [], "excludes": RedisListExcludes},
  "parentPooler": {"filters": [], "excludes": PoolerListExcludes},
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "parentPrometheus": {"filters": [], "excludes": PrometheusListExcludes},
  "parentAlertmanager": {"filters": [], "excludes": AlertmanagerListExcludes},
  "childEndpointSlice": {"filters": [], "excludes": EndpointSliceListExcludes},
  "usePod": {"filters": [], "excludes": PodListExcludes},
  "useReplicaSet": {"filters": [], "excludes": ReplicaSetListExcludes},
  "useDeployment": {"filters": [], "excludes": DeploymentListExcludes},
  "useDaemonSet": {"filters": [], "excludes": DaemonSetListExcludes},
  "usePodTemplate": {"filters": [], "excludes": PodTemplateListExcludes},
  "usedByIngress": {"filters": [], "excludes": IngressListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotServiceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceDelete);
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
      <k8sServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sServiceStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentMongoDBCommunity!=null && result.k8sNamespace[0].k8sService[0].parentMongoDBCommunity.length>0">
      <mongodbMongoDBCommunityMeta
        :model="result.k8sNamespace[0].k8sService[0].parentMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentRedis!=null && result.k8sNamespace[0].k8sService[0].parentRedis.length>0">
      <redisRedisMeta
        :model="result.k8sNamespace[0].k8sService[0].parentRedis[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentPooler!=null && result.k8sNamespace[0].k8sService[0].parentPooler.length>0">
      <cnpgPoolerMeta
        :model="result.k8sNamespace[0].k8sService[0].parentPooler[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentCluster!=null && result.k8sNamespace[0].k8sService[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sService[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentPrometheus!=null && result.k8sNamespace[0].k8sService[0].parentPrometheus.length>0">
      <monitoringPrometheusMeta
        :model="result.k8sNamespace[0].k8sService[0].parentPrometheus[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentAlertmanager!=null && result.k8sNamespace[0].k8sService[0].parentAlertmanager.length>0">
      <monitoringAlertmanagerMeta
        :model="result.k8sNamespace[0].k8sService[0].parentAlertmanager[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].childEndpointSlice!=null && result.k8sNamespace[0].k8sService[0].childEndpointSlice.length>0">
      <k8sEndpointSliceList
        :model="result.k8sNamespace[0].k8sService[0].childEndpointSlice"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].usePod!=null && result.k8sNamespace[0].k8sService[0].usePod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sService[0].usePod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].useReplicaSet!=null && result.k8sNamespace[0].k8sService[0].useReplicaSet.length>0">
      <k8sReplicaSetList
        :model="result.k8sNamespace[0].k8sService[0].useReplicaSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].useDeployment!=null && result.k8sNamespace[0].k8sService[0].useDeployment.length>0">
      <k8sDeploymentList
        :model="result.k8sNamespace[0].k8sService[0].useDeployment"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].useDaemonSet!=null && result.k8sNamespace[0].k8sService[0].useDaemonSet.length>0">
      <k8sDaemonSetList
        :model="result.k8sNamespace[0].k8sService[0].useDaemonSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].usePodTemplate!=null && result.k8sNamespace[0].k8sService[0].usePodTemplate.length>0">
      <k8sPodTemplateList
        :model="result.k8sNamespace[0].k8sService[0].usePodTemplate"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].usedByIngress!=null && result.k8sNamespace[0].k8sService[0].usedByIngress.length>0">
      <k8sIngressList
        :model="result.k8sNamespace[0].k8sService[0].usedByIngress"
       />
    </div>
    <div class="col-md-12">
      <k8sServiceView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
        />
    </div>
  </div>
</template>
