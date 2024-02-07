<script setup lang="ts">
import k8upArchiveQuery from '@/queries/k8up/Archive.details.graphql'
import ArchiveDelete from '@/queries/k8up/Archive.delete.graphql'
import k8upArchiveMeta from '@/components/k8up/ArchiveMeta.vue';
import k8upArchiveView from '@/components/k8up/ArchiveView.vue';
import k8upArchiveStatus from '@/components/k8up/ArchiveStatus.vue';
import { useQuery, useMutation, useArchive, ArchiveReadExcludes } from '../../../libs/k8up/Archive.js'
const { onErrorHandler, notifySuccess, notifyError, onNotArchiveFound, navigation, setNamespacedItemFromRoute } = useArchive();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upArchiveQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ArchiveReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotArchiveFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ArchiveDelete);
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
      <k8upArchiveMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upArchive[0]!=undefined && result.k8sNamespace[0].k8upArchive[0]!=null"
        :model="result.k8sNamespace[0].k8upArchive[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upArchiveStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upArchive[0]!=undefined && result.k8sNamespace[0].k8upArchive[0]!=null"
        :model="result.k8sNamespace[0].k8upArchive[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upArchiveView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upArchive[0]!=undefined && result.k8sNamespace[0].k8upArchive[0]!=null"
        :model="result.k8sNamespace[0].k8upArchive[0]"
        />
    </div>
  </div>
</template>
