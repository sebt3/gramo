<script setup lang="ts">
import k8sIngressQuery from '@/queries/k8s/Ingress.details.graphql'
import IngressDelete from '@/queries/k8s/Ingress.delete.graphql'
import k8sIngressMeta from '@/components/k8s/IngressMeta.vue';
import k8sIngressView from '@/components/k8s/IngressView.vue';
import k8sIngressStatus from '@/components/k8s/IngressStatus.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { useQuery, useMutation, useIngress, IngressReadExcludes } from '../../../libs/k8s/Ingress.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIngressFound, navigation, setNamespacedItemFromRoute } = useIngress();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sIngressQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressReadExcludes
  },
  "useService": {"filters": [], "excludes": ServiceListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotIngressFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressDelete);
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
      <k8sIngressMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sIngressStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null && result.k8sNamespace[0].k8sIngress[0].useService!=null && result.k8sNamespace[0].k8sIngress[0].useService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].k8sIngress[0].useService"
       />
    </div>
    <div class="col-md-12">
      <k8sIngressView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
        />
    </div>
  </div>
</template>
