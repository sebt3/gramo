<script setup lang="ts">
import k8sValidatingWebhookConfigurationQuery from '@/queries/k8s/ValidatingWebhookConfiguration.read.graphql'
import ValidatingWebhookConfigurationDelete from '@/queries/k8s/ValidatingWebhookConfiguration.delete.graphql'
import k8sValidatingWebhookConfigurationList from '@/components/k8s/ValidatingWebhookConfigurationList.vue';
import { useQuery, useMutation, useValidatingWebhookConfiguration, ValidatingWebhookConfigurationListExcludes } from '../../../libs/k8s/ValidatingWebhookConfiguration.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useValidatingWebhookConfiguration();
const { result, refetch, onError } = useQuery(k8sValidatingWebhookConfigurationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ValidatingWebhookConfigurationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sValidatingWebhookConfigurationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sValidatingWebhookConfiguration'] !== undefined"
    :model="result.k8sValidatingWebhookConfiguration"
  />
</template>