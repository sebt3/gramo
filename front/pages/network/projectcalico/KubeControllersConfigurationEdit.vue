<script setup lang="ts">
import projectcalicoKubeControllersConfigurationQuery from '@/queries/projectcalico/KubeControllersConfiguration.read.graphql'
import KubeControllersConfigurationEdit from '@/queries/projectcalico/KubeControllersConfiguration.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoKubeControllersConfigurationMeta from '@/components/projectcalico/KubeControllersConfigurationMeta.vue';
import projectcalicoKubeControllersConfigurationEdit from '@/components/projectcalico/KubeControllersConfigurationEdit.vue';
import projectcalicoKubeControllersConfigurationStatus from '@/components/projectcalico/KubeControllersConfigurationStatus.vue';
import { useQuery, useMutation, sanitizeData, useKubeControllersConfiguration, KubeControllersConfigurationSimpleExcludes } from '../../../libs/projectcalico/KubeControllersConfiguration.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotKubeControllersConfigurationFound, navigation, editor, setItemFromRoute } = useKubeControllersConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoKubeControllersConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KubeControllersConfigurationSimpleExcludes
  },
});
const { mutate: patchKubeControllersConfiguration, onDone: onPatchKubeControllersConfiguration, onError: onPatchError } = useMutation(KubeControllersConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchKubeControllersConfiguration({
    "name": result.projectcalicoKubeControllersConfiguration[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotKubeControllersConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoKubeControllersConfiguration[0])});onPatchKubeControllersConfiguration(patchDone);onPatchError(patchError);
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
      <projectcalicoKubeControllersConfigurationEdit
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
       />
    </div>
  </div>
</template>

