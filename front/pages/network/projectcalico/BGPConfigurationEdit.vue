<script setup lang="ts">
import projectcalicoBGPConfigurationQuery from '@/queries/projectcalico/BGPConfiguration.read.graphql'
import BGPConfigurationEdit from '@/queries/projectcalico/BGPConfiguration.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoBGPConfigurationMeta from '@/components/projectcalico/BGPConfigurationMeta.vue';
import projectcalicoBGPConfigurationEdit from '@/components/projectcalico/BGPConfigurationEdit.vue';
import { useQuery, useMutation, sanitizeData, useBGPConfiguration, BGPConfigurationSimpleExcludes } from '../../../libs/projectcalico/BGPConfiguration.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotBGPConfigurationFound, navigation, editor, setItemFromRoute } = useBGPConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BGPConfigurationSimpleExcludes
  },
});
const { mutate: patchBGPConfiguration, onDone: onPatchBGPConfiguration, onError: onPatchError } = useMutation(BGPConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBGPConfiguration({
    "name": result.projectcalicoBGPConfiguration[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotBGPConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoBGPConfiguration[0])});onPatchBGPConfiguration(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoBGPConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBGPConfiguration[0]!=undefined && result.projectcalicoBGPConfiguration[0]!=null"
        :model="result.projectcalicoBGPConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoBGPConfigurationEdit
        v-if="!loading && result!=undefined && result.projectcalicoBGPConfiguration[0]!=undefined && result.projectcalicoBGPConfiguration[0]!=null"
        :model="result.projectcalicoBGPConfiguration[0]"
       />
    </div>
  </div>
</template>

