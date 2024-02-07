<script setup lang="ts">
import projectcalicoIPAMConfigQuery from '@/queries/projectcalico/IPAMConfig.read.graphql'
import IPAMConfigDelete from '@/queries/projectcalico/IPAMConfig.delete.graphql'
import projectcalicoIPAMConfigList from '@/components/projectcalico/IPAMConfigList.vue';
import { useQuery, useMutation, useIPAMConfig, IPAMConfigListExcludes } from '../../../libs/projectcalico/IPAMConfig.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useIPAMConfig();
const { result, refetch, onError } = useQuery(projectcalicoIPAMConfigQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMConfigDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoIPAMConfigList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoIPAMConfig'] !== undefined"
    :model="result.projectcalicoIPAMConfig"
  />
</template>