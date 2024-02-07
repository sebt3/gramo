<script setup lang="ts">
import k8sCustomResourceDefinitionQuery from '@/queries/k8s/CustomResourceDefinition.details.graphql'
import CustomResourceDefinitionDelete from '@/queries/k8s/CustomResourceDefinition.delete.graphql'
import k8sCustomResourceDefinitionMeta from '@/components/k8s/CustomResourceDefinitionMeta.vue';
import k8sCustomResourceDefinitionView from '@/components/k8s/CustomResourceDefinitionView.vue';
import k8sCustomResourceDefinitionStatus from '@/components/k8s/CustomResourceDefinitionStatus.vue';
import { APIServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sAPIServiceList from '@/components/k8s/APIServiceList.vue';
import { useQuery, useMutation, useCustomResourceDefinition, CustomResourceDefinitionReadExcludes } from '../../../libs/k8s/CustomResourceDefinition.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCustomResourceDefinitionFound, navigation, setItemFromRoute } = useCustomResourceDefinition();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCustomResourceDefinitionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CustomResourceDefinitionReadExcludes
  },
  "providedToAPIService": {"filters": [], "excludes": APIServiceListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotCustomResourceDefinitionFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CustomResourceDefinitionDelete);
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
      <k8sCustomResourceDefinitionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null"
        :model="result.k8sCustomResourceDefinition[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sCustomResourceDefinitionStatus
        v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null"
        :model="result.k8sCustomResourceDefinition[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null && result.k8sCustomResourceDefinition[0].providedToAPIService!=null && result.k8sCustomResourceDefinition[0].providedToAPIService.length>0">
      <k8sAPIServiceList
        :model="result.k8sCustomResourceDefinition[0].providedToAPIService"
       />
    </div>
    <div class="col-md-12">
      <k8sCustomResourceDefinitionView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null"
        :model="result.k8sCustomResourceDefinition[0]"
        />
    </div>
  </div>
</template>
