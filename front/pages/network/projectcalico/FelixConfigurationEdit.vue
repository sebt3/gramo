<script setup lang="ts">
import projectcalicoFelixConfigurationQuery from '@/queries/projectcalico/FelixConfiguration.read.graphql'
import FelixConfigurationEdit from '@/queries/projectcalico/FelixConfiguration.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoFelixConfigurationMeta from '@/components/projectcalico/FelixConfigurationMeta.vue';
import projectcalicoFelixConfigurationEdit from '@/components/projectcalico/FelixConfigurationEdit.vue';
import { useQuery, useMutation, sanitizeData, useFelixConfiguration, FelixConfigurationSimpleExcludes } from '../../../libs/projectcalico/FelixConfiguration.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotFelixConfigurationFound, navigation, editor, setItemFromRoute } = useFelixConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoFelixConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": FelixConfigurationSimpleExcludes
  },
});
const { mutate: patchFelixConfiguration, onDone: onPatchFelixConfiguration, onError: onPatchError } = useMutation(FelixConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchFelixConfiguration({
    "name": result.projectcalicoFelixConfiguration[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotFelixConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoFelixConfiguration[0])});onPatchFelixConfiguration(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoFelixConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoFelixConfiguration[0]!=undefined && result.projectcalicoFelixConfiguration[0]!=null"
        :model="result.projectcalicoFelixConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoFelixConfigurationEdit
        v-if="!loading && result!=undefined && result.projectcalicoFelixConfiguration[0]!=undefined && result.projectcalicoFelixConfiguration[0]!=null"
        :model="result.projectcalicoFelixConfiguration[0]"
       />
    </div>
  </div>
</template>

