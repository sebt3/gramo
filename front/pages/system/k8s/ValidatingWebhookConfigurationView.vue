<script setup lang="ts">
import k8sValidatingWebhookConfigurationQuery from '@/queries/k8s/ValidatingWebhookConfiguration.details.graphql'
import ValidatingWebhookConfigurationDelete from '@/queries/k8s/ValidatingWebhookConfiguration.delete.graphql'
import k8sValidatingWebhookConfigurationMeta from '@/components/k8s/ValidatingWebhookConfigurationMeta.vue';
import k8sValidatingWebhookConfigurationView from '@/components/k8s/ValidatingWebhookConfigurationView.vue';
import { useQuery, useMutation, useValidatingWebhookConfiguration, ValidatingWebhookConfigurationReadExcludes } from '../../../libs/k8s/ValidatingWebhookConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotValidatingWebhookConfigurationFound, navigation, setItemFromRoute } = useValidatingWebhookConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sValidatingWebhookConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ValidatingWebhookConfigurationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotValidatingWebhookConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ValidatingWebhookConfigurationDelete);
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
      <k8sValidatingWebhookConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sValidatingWebhookConfiguration[0]!=undefined && result.k8sValidatingWebhookConfiguration[0]!=null"
        :model="result.k8sValidatingWebhookConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sValidatingWebhookConfigurationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sValidatingWebhookConfiguration[0]!=undefined && result.k8sValidatingWebhookConfiguration[0]!=null"
        :model="result.k8sValidatingWebhookConfiguration[0]"
        />
    </div>
  </div>
</template>
