<script setup lang="ts">
import k8sCronJobQuery from '@/queries/k8s/CronJob.details.graphql'
import CronJobDelete from '@/queries/k8s/CronJob.delete.graphql'
import k8sCronJobMeta from '@/components/k8s/CronJobMeta.vue';
import k8sCronJobView from '@/components/k8s/CronJobView.vue';
import k8sCronJobStatus from '@/components/k8s/CronJobStatus.vue';
import { JobListExcludes } from '../../../libs/k8s/custom.js'
import k8sJobList from '@/components/k8s/JobList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { useQuery, useMutation, useCronJob, CronJobReadExcludes } from '../../../libs/k8s/CronJob.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCronJobFound, navigation, setNamespacedItemFromRoute } = useCronJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCronJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CronJobReadExcludes
  },
  "childJob": {"filters": [], "excludes": JobListExcludes},
  "usePersistentVolumeClaim": {"filters": [], "excludes": PersistentVolumeClaimListExcludes},
  "useSecret": {"filters": [], "excludes": SecretListExcludes},
  "useConfigMap": {"filters": [], "excludes": ConfigMapListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCronJobFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CronJobDelete);
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
      <k8sCronJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sCronJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null && result.k8sNamespace[0].k8sCronJob[0].childJob!=null && result.k8sNamespace[0].k8sCronJob[0].childJob.length>0">
      <k8sJobList
        :model="result.k8sNamespace[0].k8sCronJob[0].childJob"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null && result.k8sNamespace[0].k8sCronJob[0].usePersistentVolumeClaim!=null && result.k8sNamespace[0].k8sCronJob[0].usePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sCronJob[0].usePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null && result.k8sNamespace[0].k8sCronJob[0].useSecret!=null && result.k8sNamespace[0].k8sCronJob[0].useSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].k8sCronJob[0].useSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null && result.k8sNamespace[0].k8sCronJob[0].useConfigMap!=null && result.k8sNamespace[0].k8sCronJob[0].useConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].k8sCronJob[0].useConfigMap"
       />
    </div>
    <div class="col-md-12">
      <k8sCronJobView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
        />
    </div>
  </div>
</template>
