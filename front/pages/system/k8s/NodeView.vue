<script setup lang="ts">
import k8sNodeQuery from '@/queries/k8s/Node.details.graphql'
import NodeDelete from '@/queries/k8s/Node.delete.graphql'
import k8sNodeMeta from '@/components/k8s/NodeMeta.vue';
import k8sNodeView from '@/components/k8s/NodeView.vue';
import k8sNodeStatus from '@/components/k8s/NodeStatus.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { useQuery, useMutation, useNode, NodeReadExcludes } from '../../../libs/k8s/Node.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNodeFound, navigation, setItemFromRoute } = useNode();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNodeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NodeReadExcludes
  },
  "usedByPod": {"filters": [], "excludes": PodListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotNodeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NodeDelete);
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
      <k8sNodeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sNodeStatus
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null && result.k8sNode[0].usedByPod!=null && result.k8sNode[0].usedByPod.length>0">
      <k8sPodList
        :model="result.k8sNode[0].usedByPod"
       />
    </div>
    <div class="col-md-12">
      <k8sNodeView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNode[0]!=undefined && result.k8sNode[0]!=null"
        :model="result.k8sNode[0]"
        />
    </div>
  </div>
</template>
