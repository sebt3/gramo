<script setup lang="ts">
import k8sPodTemplateQuery from '@/queries/k8s/PodTemplate.details.graphql'
import PodTemplateDelete from '@/queries/k8s/PodTemplate.delete.graphql'
import k8sPodTemplateMeta from '@/components/k8s/PodTemplateMeta.vue';
import k8sPodTemplateView from '@/components/k8s/PodTemplateView.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/custom.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ConfigMapListExcludes } from '../../../libs/k8s/custom.js'
import k8sConfigMapList from '@/components/k8s/ConfigMapList.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { useQuery, useMutation, usePodTemplate, PodTemplateReadExcludes } from '../../../libs/k8s/PodTemplate.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodTemplateFound, navigation, setNamespacedItemFromRoute } = usePodTemplate();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodTemplateQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodTemplateReadExcludes
  },
  "usePersistentVolumeClaim": {"filters": [], "excludes": PersistentVolumeClaimListExcludes},
  "useSecret": {"filters": [], "excludes": SecretListExcludes},
  "useConfigMap": {"filters": [], "excludes": ConfigMapListExcludes},
  "usedByService": {"filters": [], "excludes": ServiceListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPodTemplateFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodTemplateDelete);
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
      <k8sPodTemplateMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null"
        :model="result.k8sNamespace[0].k8sPodTemplate[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null && result.k8sNamespace[0].k8sPodTemplate[0].usePersistentVolumeClaim!=null && result.k8sNamespace[0].k8sPodTemplate[0].usePersistentVolumeClaim.length>0">
      <k8sPersistentVolumeClaimList
        :model="result.k8sNamespace[0].k8sPodTemplate[0].usePersistentVolumeClaim"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null && result.k8sNamespace[0].k8sPodTemplate[0].useSecret!=null && result.k8sNamespace[0].k8sPodTemplate[0].useSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].k8sPodTemplate[0].useSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null && result.k8sNamespace[0].k8sPodTemplate[0].useConfigMap!=null && result.k8sNamespace[0].k8sPodTemplate[0].useConfigMap.length>0">
      <k8sConfigMapList
        :model="result.k8sNamespace[0].k8sPodTemplate[0].useConfigMap"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null && result.k8sNamespace[0].k8sPodTemplate[0].usedByService!=null && result.k8sNamespace[0].k8sPodTemplate[0].usedByService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].k8sPodTemplate[0].usedByService"
       />
    </div>
    <div class="col-md-12">
      <k8sPodTemplateView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null"
        :model="result.k8sNamespace[0].k8sPodTemplate[0]"
        />
    </div>
  </div>
</template>
