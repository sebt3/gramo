<script setup lang="ts">
import projectcalicoFelixConfigurationQuery from '@/queries/projectcalico/FelixConfiguration.details.graphql'
import FelixConfigurationDelete from '@/queries/projectcalico/FelixConfiguration.delete.graphql'
import projectcalicoFelixConfigurationMeta from '@/components/projectcalico/FelixConfigurationMeta.vue';
import projectcalicoFelixConfigurationView from '@/components/projectcalico/FelixConfigurationView.vue';
import { useQuery, useMutation, useFelixConfiguration, FelixConfigurationReadExcludes } from '../../../libs/projectcalico/FelixConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotFelixConfigurationFound, navigation, setItemFromRoute } = useFelixConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoFelixConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": FelixConfigurationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotFelixConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(FelixConfigurationDelete);
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
      <projectcalicoFelixConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoFelixConfiguration[0]!=undefined && result.projectcalicoFelixConfiguration[0]!=null"
        :model="result.projectcalicoFelixConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoFelixConfigurationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoFelixConfiguration[0]!=undefined && result.projectcalicoFelixConfiguration[0]!=null"
        :model="result.projectcalicoFelixConfiguration[0]"
        />
    </div>
  </div>
</template>
