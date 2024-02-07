<script setup lang="ts">
import monitoringPrometheusQuery from '@/queries/monitoring/Prometheus.details.graphql'
import PrometheusDelete from '@/queries/monitoring/Prometheus.delete.graphql'
import monitoringPrometheusMeta from '@/components/monitoring/PrometheusMeta.vue';
import monitoringPrometheusView from '@/components/monitoring/PrometheusView.vue';
import monitoringPrometheusStatus from '@/components/monitoring/PrometheusStatus.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { useQuery, useMutation, usePrometheus, PrometheusReadExcludes } from '../../../libs/monitoring/Prometheus.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPrometheusFound, navigation, setNamespacedItemFromRoute } = usePrometheus();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringPrometheusQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PrometheusReadExcludes
  },
  "childService": {"filters": [], "excludes": ServiceListExcludes},
  "childStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "childConfigMap": {"filters": [], "excludes": ConfigMapListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPrometheusFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PrometheusDelete);
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
      <monitoringPrometheusMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheus[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringPrometheusStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheus[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null && result.k8sNamespace[0].monitoringPrometheus[0].childService!=null && result.k8sNamespace[0].monitoringPrometheus[0].childService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].monitoringPrometheus[0].childService"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null && result.k8sNamespace[0].monitoringPrometheus[0].childStatefulSet!=null && result.k8sNamespace[0].monitoringPrometheus[0].childStatefulSet.length>0">
      <k8sStatefulSetList
        :model="result.k8sNamespace[0].monitoringPrometheus[0].childStatefulSet"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null && result.k8sNamespace[0].monitoringPrometheus[0].childConfigMap!=null && result.k8sNamespace[0].monitoringPrometheus[0].childConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].monitoringPrometheus[0].childConfigMap"
       />
    </div>
    <div class="col-md-12">
      <monitoringPrometheusView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringPrometheus[0]!=undefined && result.k8sNamespace[0].monitoringPrometheus[0]!=null"
        :model="result.k8sNamespace[0].monitoringPrometheus[0]"
        />
    </div>
  </div>
</template>
