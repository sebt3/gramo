<script setup lang="ts">
import k8sStorageClassQuery from '@/queries/k8s/StorageClass.details.graphql'
import StorageClassDelete from '@/queries/k8s/StorageClass.delete.graphql'
import k8sStorageClassMeta from '@/components/k8s/StorageClassMeta.vue';
import k8sStorageClassView from '@/components/k8s/StorageClassView.vue';
import { PersistentVolumeListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeList from '@/components/k8s/PersistentVolumeList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { useQuery, useMutation, useStorageClass, StorageClassReadExcludes } from '../../../libs/k8s/StorageClass.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStorageClassFound, navigation, setItemFromRoute } = useStorageClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStorageClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StorageClassReadExcludes
  },
  "providePersistentVolume": {"filters": [], "excludes": PersistentVolumeListExcludes},
  "providePersistentVolumeClaim": {"filters": [], "excludes": PersistentVolumeClaimListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotStorageClassFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StorageClassDelete);
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
    <div class="col-md-3">
      <k8sStorageClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null"
        :model="result.k8sStorageClass[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null && result.k8sStorageClass[0].providePersistentVolume!=null && result.k8sStorageClass[0].providePersistentVolume.length>0">
      <k8sPersistentVolumeList
        :model="result.k8sStorageClass[0].providePersistentVolume"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null && result.k8sStorageClass[0].providePersistentVolumeClaim!=null && result.k8sStorageClass[0].providePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sStorageClass[0].providePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-12">
      <k8sStorageClassView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null"
        :model="result.k8sStorageClass[0]"
        />
    </div>
  </div>
</template>
