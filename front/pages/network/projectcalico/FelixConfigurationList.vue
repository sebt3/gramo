<script setup lang="ts">
import projectcalicoFelixConfigurationQuery from '@/queries/projectcalico/FelixConfiguration.read.graphql'
import FelixConfigurationDelete from '@/queries/projectcalico/FelixConfiguration.delete.graphql'
import projectcalicoFelixConfigurationList from '@/components/projectcalico/FelixConfigurationList.vue';
import { useQuery, useMutation, useFelixConfiguration, FelixConfigurationListExcludes } from '../../../libs/projectcalico/FelixConfiguration.js'
const { actionNew, toEdit, actionDelete, pagination, deleteDone, deleteError, onErrorHandler } = useFelixConfiguration();
const { result, refetch, onError } = useQuery(projectcalicoFelixConfigurationQuery, {
  "obj": {}
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(FelixConfigurationDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <projectcalicoFelixConfigurationList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['projectcalicoFelixConfiguration'] !== undefined"
    :model="result.projectcalicoFelixConfiguration"
  />
</template>