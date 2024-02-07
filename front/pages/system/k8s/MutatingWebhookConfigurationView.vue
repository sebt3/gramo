<script setup lang="ts">
import k8sMutatingWebhookConfigurationQuery from '@/queries/k8s/MutatingWebhookConfiguration.details.graphql'
import MutatingWebhookConfigurationDelete from '@/queries/k8s/MutatingWebhookConfiguration.delete.graphql'
import k8sMutatingWebhookConfigurationMeta from '@/components/k8s/MutatingWebhookConfigurationMeta.vue';
import k8sMutatingWebhookConfigurationView from '@/components/k8s/MutatingWebhookConfigurationView.vue';
import { useQuery, useMutation, useMutatingWebhookConfiguration, MutatingWebhookConfigurationReadExcludes } from '../../../libs/k8s/MutatingWebhookConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMutatingWebhookConfigurationFound, navigation, setItemFromRoute } = useMutatingWebhookConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sMutatingWebhookConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MutatingWebhookConfigurationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotMutatingWebhookConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MutatingWebhookConfigurationDelete);
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
      <k8sMutatingWebhookConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sMutatingWebhookConfiguration[0]!=undefined && result.k8sMutatingWebhookConfiguration[0]!=null"
        :model="result.k8sMutatingWebhookConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sMutatingWebhookConfigurationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sMutatingWebhookConfiguration[0]!=undefined && result.k8sMutatingWebhookConfiguration[0]!=null"
        :model="result.k8sMutatingWebhookConfiguration[0]"
        />
    </div>
  </div>
</template>
