<script setup lang="ts">
import projectcalicoKubeControllersConfigurationQuery from '@/queries/projectcalico/KubeControllersConfiguration.details.graphql'
import KubeControllersConfigurationDelete from '@/queries/projectcalico/KubeControllersConfiguration.delete.graphql'
import projectcalicoKubeControllersConfigurationMeta from '@/components/projectcalico/KubeControllersConfigurationMeta.vue';
import projectcalicoKubeControllersConfigurationView from '@/components/projectcalico/KubeControllersConfigurationView.vue';
import projectcalicoKubeControllersConfigurationStatus from '@/components/projectcalico/KubeControllersConfigurationStatus.vue';
import { useQuery, useMutation, useKubeControllersConfiguration, KubeControllersConfigurationReadExcludes } from '../../../libs/projectcalico/KubeControllersConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKubeControllersConfigurationFound, navigation, setItemFromRoute } = useKubeControllersConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoKubeControllersConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KubeControllersConfigurationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotKubeControllersConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KubeControllersConfigurationDelete);
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
      <projectcalicoKubeControllersConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
       />
    </div>
    <div class="col-md-6">
      <projectcalicoKubeControllersConfigurationStatus
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoKubeControllersConfigurationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
        />
    </div>
  </div>
</template>
