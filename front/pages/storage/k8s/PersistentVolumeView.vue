<script setup lang="ts">
import k8sPersistentVolumeQuery from '@/queries/k8s/PersistentVolume.details.graphql'
import PersistentVolumeDelete from '@/queries/k8s/PersistentVolume.delete.graphql'
import k8sPersistentVolumeMeta from '@/components/k8s/PersistentVolumeMeta.vue';
import k8sPersistentVolumeView from '@/components/k8s/PersistentVolumeView.vue';
import k8sPersistentVolumeStatus from '@/components/k8s/PersistentVolumeStatus.vue';
import { StorageClassListExcludes } from '../../../libs/k8s/custom.js'
import k8sStorageClassList from '@/components/k8s/StorageClassList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { useQuery, useMutation, usePersistentVolume, PersistentVolumeReadExcludes } from '../../../libs/k8s/PersistentVolume.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPersistentVolumeFound, navigation, setItemFromRoute } = usePersistentVolume();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PersistentVolumeReadExcludes
  },
  "providedToStorageClass": {"filters": [], "excludes": StorageClassListExcludes},
  "usedByPersistentVolumeClaim": {"filters": [], "excludes": PersistentVolumeClaimListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPersistentVolumeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PersistentVolumeDelete);
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
      <k8sPersistentVolumeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sPersistentVolumeStatus
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null && result.k8sPersistentVolume[0].providedToStorageClass!=null && result.k8sPersistentVolume[0].providedToStorageClass.length>0">
      <k8sStorageClassList
        :model="result.k8sPersistentVolume[0].providedToStorageClass"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null && result.k8sPersistentVolume[0].usedByPersistentVolumeClaim!=null && result.k8sPersistentVolume[0].usedByPersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sPersistentVolume[0].usedByPersistentVolumeClaim"
       />
    </div>
    <div class="col-md-12">
      <k8sPersistentVolumeView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
        />
    </div>
  </div>
</template>
