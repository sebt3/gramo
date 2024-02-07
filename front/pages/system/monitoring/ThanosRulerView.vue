<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRuler.details.graphql'
import ThanosRulerDelete from '@/queries/monitoring/ThanosRuler.delete.graphql'
import monitoringThanosRulerMeta from '@/components/monitoring/ThanosRulerMeta.vue';
import monitoringThanosRulerView from '@/components/monitoring/ThanosRulerView.vue';
import monitoringThanosRulerStatus from '@/components/monitoring/ThanosRulerStatus.vue';
import { useQuery, useMutation, useThanosRuler, ThanosRulerReadExcludes } from '../../../libs/monitoring/ThanosRuler.js'
const { onErrorHandler, notifySuccess, notifyError, onNotThanosRulerFound, navigation, setNamespacedItemFromRoute } = useThanosRuler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringThanosRulerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ThanosRulerReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotThanosRulerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ThanosRulerDelete);
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
      <monitoringThanosRulerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div>
    <div class="col-md-6">
      <monitoringThanosRulerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div>
    <div class="col-md-12">
      <monitoringThanosRulerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
        />
    </div>
  </div>
</template>
