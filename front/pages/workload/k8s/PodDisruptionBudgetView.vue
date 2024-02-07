<script setup lang="ts">
import k8sPodDisruptionBudgetQuery from '@/queries/k8s/PodDisruptionBudget.details.graphql'
import PodDisruptionBudgetDelete from '@/queries/k8s/PodDisruptionBudget.delete.graphql'
import k8sPodDisruptionBudgetMeta from '@/components/k8s/PodDisruptionBudgetMeta.vue';
import k8sPodDisruptionBudgetView from '@/components/k8s/PodDisruptionBudgetView.vue';
import k8sPodDisruptionBudgetStatus from '@/components/k8s/PodDisruptionBudgetStatus.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { useQuery, useMutation, usePodDisruptionBudget, PodDisruptionBudgetReadExcludes } from '../../../libs/k8s/PodDisruptionBudget.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodDisruptionBudgetFound, navigation, setNamespacedItemFromRoute } = usePodDisruptionBudget();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodDisruptionBudgetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodDisruptionBudgetReadExcludes
  },
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPodDisruptionBudgetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodDisruptionBudgetDelete);
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
      <k8sPodDisruptionBudgetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPodDisruptionBudgetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null && result.k8sNamespace[0].k8sPodDisruptionBudget[0].parentCluster!=null && result.k8sNamespace[0].k8sPodDisruptionBudget[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPodDisruptionBudgetView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
        />
    </div>
  </div>
</template>
