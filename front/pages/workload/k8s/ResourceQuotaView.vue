<script setup lang="ts">
import k8sResourceQuotaQuery from '@/queries/k8s/ResourceQuota.details.graphql'
import ResourceQuotaDelete from '@/queries/k8s/ResourceQuota.delete.graphql'
import k8sResourceQuotaMeta from '@/components/k8s/ResourceQuotaMeta.vue';
import k8sResourceQuotaView from '@/components/k8s/ResourceQuotaView.vue';
import k8sResourceQuotaStatus from '@/components/k8s/ResourceQuotaStatus.vue';
import { useQuery, useMutation, useResourceQuota, ResourceQuotaReadExcludes } from '../../../libs/k8s/ResourceQuota.js'
const { onErrorHandler, notifySuccess, notifyError, onNotResourceQuotaFound, navigation, setNamespacedItemFromRoute } = useResourceQuota();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sResourceQuotaQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ResourceQuotaReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotResourceQuotaFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ResourceQuotaDelete);
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
      <k8sResourceQuotaMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sResourceQuotaStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sResourceQuotaView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
        />
    </div>
  </div>
</template>
