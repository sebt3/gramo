<script setup lang="ts">
import k8sMutatingWebhookConfigurationQuery from '@/queries/k8s/MutatingWebhookConfiguration.read.graphql'
import MutatingWebhookConfigurationDelete from '@/queries/k8s/MutatingWebhookConfiguration.delete.graphql'
import k8sMutatingWebhookConfigurationList from '@/components/k8s/MutatingWebhookConfigurationList.vue';
import { useQuery, useMutation, useMutatingWebhookConfiguration, MutatingWebhookConfigurationListExcludes } from '../../../libs/k8s/MutatingWebhookConfiguration.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useMutatingWebhookConfiguration();
const { result, refetch, onError } = useQuery(k8sMutatingWebhookConfigurationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MutatingWebhookConfigurationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sMutatingWebhookConfigurationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sMutatingWebhookConfiguration'] !== undefined"
    :model="result.k8sMutatingWebhookConfiguration"
  />
</template>