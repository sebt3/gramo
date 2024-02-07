<script setup lang="ts">
import projectcalicoBGPConfigurationQuery from '@/queries/projectcalico/BGPConfiguration.details.graphql'
import BGPConfigurationDelete from '@/queries/projectcalico/BGPConfiguration.delete.graphql'
import projectcalicoBGPConfigurationMeta from '@/components/projectcalico/BGPConfigurationMeta.vue';
import projectcalicoBGPConfigurationView from '@/components/projectcalico/BGPConfigurationView.vue';
import { useQuery, useMutation, useBGPConfiguration, BGPConfigurationReadExcludes } from '../../../libs/projectcalico/BGPConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBGPConfigurationFound, navigation, setItemFromRoute } = useBGPConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BGPConfigurationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotBGPConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BGPConfigurationDelete);
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
      <projectcalicoBGPConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBGPConfiguration[0]!=undefined && result.projectcalicoBGPConfiguration[0]!=null"
        :model="result.projectcalicoBGPConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoBGPConfigurationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoBGPConfiguration[0]!=undefined && result.projectcalicoBGPConfiguration[0]!=null"
        :model="result.projectcalicoBGPConfiguration[0]"
        />
    </div>
  </div>
</template>
