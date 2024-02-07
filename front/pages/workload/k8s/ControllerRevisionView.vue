<script setup lang="ts">
import k8sControllerRevisionQuery from '@/queries/k8s/ControllerRevision.details.graphql'
import ControllerRevisionDelete from '@/queries/k8s/ControllerRevision.delete.graphql'
import k8sControllerRevisionMeta from '@/components/k8s/ControllerRevisionMeta.vue';
import k8sControllerRevisionView from '@/components/k8s/ControllerRevisionView.vue';
import k8sDaemonSetMeta from '@/components/k8s/DaemonSetMeta.vue';
import k8sStatefulSetMeta from '@/components/k8s/StatefulSetMeta.vue';
import { useQuery, useMutation, useControllerRevision, ControllerRevisionReadExcludes } from '../../../libs/k8s/ControllerRevision.js'
const { onErrorHandler, notifySuccess, notifyError, onNotControllerRevisionFound, navigation, setNamespacedItemFromRoute } = useControllerRevision();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sControllerRevisionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ControllerRevisionReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotControllerRevisionFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ControllerRevisionDelete);
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
      <k8sControllerRevisionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sControllerRevision[0]!=undefined && result.k8sNamespace[0].k8sControllerRevision[0]!=null"
        :model="result.k8sNamespace[0].k8sControllerRevision[0]"
       />
      <k8sDaemonSetMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sControllerRevision[0]!=undefined && result.k8sNamespace[0].k8sControllerRevision[0]!=null && result.k8sNamespace[0].k8sControllerRevision[0].parentDaemonSet!=null && result.k8sNamespace[0].k8sControllerRevision[0].parentDaemonSet.length>0"
        :model="result.k8sNamespace[0].k8sControllerRevision[0].parentDaemonSet[0]"
       />
      <k8sStatefulSetMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sControllerRevision[0]!=undefined && result.k8sNamespace[0].k8sControllerRevision[0]!=null && result.k8sNamespace[0].k8sControllerRevision[0].parentStatefulSet!=null && result.k8sNamespace[0].k8sControllerRevision[0].parentStatefulSet.length>0"
        :model="result.k8sNamespace[0].k8sControllerRevision[0].parentStatefulSet[0]"
       />
    </div><div class="col-md-6">
      <k8sControllerRevisionView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sControllerRevision[0]!=undefined && result.k8sNamespace[0].k8sControllerRevision[0]!=null"
        :model="result.k8sNamespace[0].k8sControllerRevision[0]"
       />
    </div>
  </div>
</template>
