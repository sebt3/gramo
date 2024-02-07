<script setup lang="ts">
import k8sJobQuery from '@/queries/k8s/Job.details.graphql'
import JobDelete from '@/queries/k8s/Job.delete.graphql'
import k8sJobMeta from '@/components/k8s/JobMeta.vue';
import k8sJobView from '@/components/k8s/JobView.vue';
import k8sJobStatus from '@/components/k8s/JobStatus.vue';
import { CronJobListExcludes } from '../../../libs/k8s/custom.js'
import k8sCronJobMeta from '@/components/k8s/CronJobMeta.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { useQuery, useMutation, useJob, JobReadExcludes } from '../../../libs/k8s/Job.js'
const { onErrorHandler, notifySuccess, notifyError, onNotJobFound, navigation, setNamespacedItemFromRoute } = useJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": JobReadExcludes
  },
  "parentCronJob": {"filters": [], "excludes": CronJobListExcludes},
  "childPod": {"filters": [], "excludes": PodListExcludes},
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotJobFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(JobDelete);
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
      <k8sJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].parentCronJob!=null && result.k8sNamespace[0].k8sJob[0].parentCronJob.length>0">
      <k8sCronJobMeta
        :model="result.k8sNamespace[0].k8sJob[0].parentCronJob[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].childPod!=null && result.k8sNamespace[0].k8sJob[0].childPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sJob[0].childPod"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].usePersistentVolumeClaim!=null && result.k8sNamespace[0].k8sJob[0].usePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sJob[0].usePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].useSecret!=null && result.k8sNamespace[0].k8sJob[0].useSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].k8sJob[0].useSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].useConfigMap!=null && result.k8sNamespace[0].k8sJob[0].useConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].k8sJob[0].useConfigMap"
       />
    </div>
    <div class="col-md-12">
      <k8sJobView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
        />
    </div>
  </div>
</template>
