<script setup lang="ts">
import projectcalicoIPAMConfigQuery from '@/queries/projectcalico/IPAMConfig.read.graphql'
import IPAMConfigEdit from '@/queries/projectcalico/IPAMConfig.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import projectcalicoIPAMConfigMeta from '@/components/projectcalico/IPAMConfigMeta.vue';
import projectcalicoIPAMConfigEdit from '@/components/projectcalico/IPAMConfigEdit.vue';
import { useQuery, useMutation, sanitizeData, useIPAMConfig, IPAMConfigSimpleExcludes } from '../../../libs/projectcalico/IPAMConfig.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIPAMConfigFound, navigation, editor, setItemFromRoute } = useIPAMConfig();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMConfigQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMConfigSimpleExcludes
  },
});
const { mutate: patchIPAMConfig, onDone: onPatchIPAMConfig, onError: onPatchError } = useMutation(IPAMConfigEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMConfig({
    "name": result.projectcalicoIPAMConfig[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIPAMConfigFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.projectcalicoIPAMConfig[0])});onPatchIPAMConfig(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPAMConfigMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMConfig[0]!=undefined && result.projectcalicoIPAMConfig[0]!=null"
        :model="result.projectcalicoIPAMConfig[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoIPAMConfigEdit
        v-if="!loading && result!=undefined && result.projectcalicoIPAMConfig[0]!=undefined && result.projectcalicoIPAMConfig[0]!=null"
        :model="result.projectcalicoIPAMConfig[0]"
       />
    </div>
  </div>
</template>

