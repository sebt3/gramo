<script setup lang="ts">
import monitoringAlertmanagerQuery from '@/queries/monitoring/Alertmanager.details.graphql'
import AlertmanagerDelete from '@/queries/monitoring/Alertmanager.delete.graphql'
import monitoringAlertmanagerMeta from '@/components/monitoring/AlertmanagerMeta.vue';
import monitoringAlertmanagerView from '@/components/monitoring/AlertmanagerView.vue';
import monitoringAlertmanagerStatus from '@/components/monitoring/AlertmanagerStatus.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { useQuery, useMutation, useAlertmanager, AlertmanagerReadExcludes } from '../../../libs/monitoring/Alertmanager.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAlertmanagerFound, navigation, setNamespacedItemFromRoute } = useAlertmanager();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertmanagerReadExcludes
  },
  "childService": {"filters": [], "excludes": ServiceListExcludes},
  "childStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotAlertmanagerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertmanagerDelete);
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
      <monitoringAlertmanagerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanager[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringAlertmanagerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanager[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null && result.k8sNamespace[0].monitoringAlertmanager[0].childService!=null && result.k8sNamespace[0].monitoringAlertmanager[0].childService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].monitoringAlertmanager[0].childService"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null && result.k8sNamespace[0].monitoringAlertmanager[0].childStatefulSet!=null && result.k8sNamespace[0].monitoringAlertmanager[0].childStatefulSet.length>0">
      <k8sStatefulSetList
        :model="result.k8sNamespace[0].monitoringAlertmanager[0].childStatefulSet"
       />
    </div>
    <div class="col-md-12">
      <monitoringAlertmanagerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanager[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanager[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanager[0]"
        />
    </div>
  </div>
</template>
