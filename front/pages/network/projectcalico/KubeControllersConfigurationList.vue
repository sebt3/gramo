<script setup lang="ts">
import projectcalicoKubeControllersConfigurationQuery from '@/queries/projectcalico/KubeControllersConfiguration.read.graphql'
import KubeControllersConfigurationDelete from '@/queries/projectcalico/KubeControllersConfiguration.delete.graphql'
import projectcalicoKubeControllersConfigurationList from '@/components/projectcalico/KubeControllersConfigurationList.vue';
import { useQuery, useMutation, useKubeControllersConfiguration, KubeControllersConfigurationListExcludes } from '../../../libs/projectcalico/KubeControllersConfiguration.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useKubeControllersConfiguration();
const { result, refetch, onError } = useQuery(projectcalicoKubeControllersConfigurationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KubeControllersConfigurationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoKubeControllersConfigurationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoKubeControllersConfiguration'] !== undefined"
    :model="result.projectcalicoKubeControllersConfiguration"
  />
</template>