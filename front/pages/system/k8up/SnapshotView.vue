<script setup lang="ts">
import k8upSnapshotQuery from '@/queries/k8up/Snapshot.details.graphql'
import SnapshotDelete from '@/queries/k8up/Snapshot.delete.graphql'
import k8upSnapshotMeta from '@/components/k8up/SnapshotMeta.vue';
import k8upSnapshotView from '@/components/k8up/SnapshotView.vue';
import k8upSnapshotStatus from '@/components/k8up/SnapshotStatus.vue';
import { useQuery, useMutation, useSnapshot, SnapshotReadExcludes } from '../../../libs/k8up/Snapshot.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSnapshotFound, navigation, setNamespacedItemFromRoute } = useSnapshot();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upSnapshotQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SnapshotReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotSnapshotFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SnapshotDelete);
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
      <k8upSnapshotMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upSnapshotStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upSnapshotView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
        />
    </div>
  </div>
</template>
