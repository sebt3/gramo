<script setup lang="ts">
import k8sStatefulSetQuery from '@/queries/k8s/StatefulSet.details.graphql'
import StatefulSetDelete from '@/queries/k8s/StatefulSet.delete.graphql'
import k8sStatefulSetMeta from '@/components/k8s/StatefulSetMeta.vue';
import k8sStatefulSetView from '@/components/k8s/StatefulSetView.vue';
import k8sStatefulSetStatus from '@/components/k8s/StatefulSetStatus.vue';
import { MongoDBCommunityListExcludes } from '../../../libs/mongodb/custom.js'
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import { RedisListExcludes } from '../../../libs/redis/custom.js'
import redisRedisMeta from '@/components/redis/RedisMeta.vue';
import { PrometheusListExcludes } from '../../../libs/monitoring/custom.js'
import monitoringPrometheusMeta from '@/components/monitoring/PrometheusMeta.vue';
import { AlertmanagerListExcludes } from '../../../libs/monitoring/custom.js'
import monitoringAlertmanagerMeta from '@/components/monitoring/AlertmanagerMeta.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { useQuery, useMutation, useStatefulSet, StatefulSetReadExcludes } from '../../../libs/k8s/StatefulSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStatefulSetFound, navigation, setNamespacedItemFromRoute } = useStatefulSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStatefulSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StatefulSetReadExcludes
  },
  "parentMongoDBCommunity": {"filters": [], "excludes": MongoDBCommunityListExcludes},
  "parentRedis": {"filters": [], "excludes": RedisListExcludes},
  "parentPrometheus": {"filters": [], "excludes": PrometheusListExcludes},
  "parentAlertmanager": {"filters": [], "excludes": AlertmanagerListExcludes},
  "childPod": {"filters": [], "excludes": PodListExcludes},
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotStatefulSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StatefulSetDelete);
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
      <k8sStatefulSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sStatefulSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentMongoDBCommunity!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentMongoDBCommunity.length>0">
      <mongodbMongoDBCommunityMeta
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentRedis!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentRedis.length>0">
      <redisRedisMeta
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentRedis[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentPrometheus!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentPrometheus.length>0">
      <monitoringPrometheusMeta
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentPrometheus[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentAlertmanager!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentAlertmanager.length>0">
      <monitoringAlertmanagerMeta
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentAlertmanager[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPod!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sStatefulSet[0].childPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPersistentVolumeClaim!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sStatefulSet[0].childPersistentVolumeClaim"
       />
    </div>
    <div class="col-md-12">
      <k8sStatefulSetView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
        />
    </div>
  </div>
</template>
