<script setup lang="ts">
import k8sAPIServiceQuery from '@/queries/k8s/APIService.details.graphql'
import APIServiceDelete from '@/queries/k8s/APIService.delete.graphql'
import k8sAPIServiceMeta from '@/components/k8s/APIServiceMeta.vue';
import k8sAPIServiceView from '@/components/k8s/APIServiceView.vue';
import k8sAPIServiceStatus from '@/components/k8s/APIServiceStatus.vue';
import { CustomResourceDefinitionListExcludes } from '../../../libs/k8s/custom.js'
import k8sCustomResourceDefinitionList from '@/components/k8s/CustomResourceDefinitionList.vue';
import { useQuery, useMutation, useAPIService, APIServiceReadExcludes } from '../../../libs/k8s/APIService.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAPIServiceFound, navigation, setItemFromRoute } = useAPIService();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sAPIServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": APIServiceReadExcludes
  },
  "provideCustomResourceDefinition": {"filters": [], "excludes": CustomResourceDefinitionListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotAPIServiceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(APIServiceDelete);
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
      <k8sAPIServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sAPIServiceStatus
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null && result.k8sAPIService[0].provideCustomResourceDefinition!=null && result.k8sAPIService[0].provideCustomResourceDefinition.length>0">
      <k8sCustomResourceDefinitionList
        :model="result.k8sAPIService[0].provideCustomResourceDefinition"
       />
    </div>
    <div class="col-md-12">
      <k8sAPIServiceView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
        />
    </div>
  </div>
</template>
