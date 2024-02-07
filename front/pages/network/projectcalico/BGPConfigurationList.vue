<script setup lang="ts">
import projectcalicoBGPConfigurationQuery from '@/queries/projectcalico/BGPConfiguration.read.graphql'
import BGPConfigurationDelete from '@/queries/projectcalico/BGPConfiguration.delete.graphql'
import projectcalicoBGPConfigurationList from '@/components/projectcalico/BGPConfigurationList.vue';
import { useQuery, useMutation, useBGPConfiguration, BGPConfigurationListExcludes } from '../../../libs/projectcalico/BGPConfiguration.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useBGPConfiguration();
const { result, refetch, onError } = useQuery(projectcalicoBGPConfigurationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BGPConfigurationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoBGPConfigurationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoBGPConfiguration'] !== undefined"
    :model="result.projectcalicoBGPConfiguration"
  />
</template>