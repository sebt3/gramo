<script setup lang="ts">
import k8sMutatingWebhookConfigurationQuery from '@/queries/k8s/MutatingWebhookConfiguration.read.graphql'
import MutatingWebhookConfigurationEdit from '@/queries/k8s/MutatingWebhookConfiguration.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sMutatingWebhookConfigurationMeta from '@/components/k8s/MutatingWebhookConfigurationMeta.vue';
import k8sMutatingWebhookConfigurationEdit from '@/components/k8s/MutatingWebhookConfigurationEdit.vue';
import { useQuery, useMutation, sanitizeData, useMutatingWebhookConfiguration, MutatingWebhookConfigurationSimpleExcludes } from '../../../libs/k8s/MutatingWebhookConfiguration.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotMutatingWebhookConfigurationFound, navigation, editor, setItemFromRoute } = useMutatingWebhookConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sMutatingWebhookConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MutatingWebhookConfigurationSimpleExcludes
  },
});
const { mutate: patchMutatingWebhookConfiguration, onDone: onPatchMutatingWebhookConfiguration, onError: onPatchError } = useMutation(MutatingWebhookConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMutatingWebhookConfiguration({
    "name": result.k8sMutatingWebhookConfiguration[0].metadata.name,
    "webhooks": sanitizeData(editor.value.obj['webhooks']),
  });
}
onError(onErrorHandler);onResult(res => {onNotMutatingWebhookConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sMutatingWebhookConfiguration[0])});onPatchMutatingWebhookConfiguration(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sMutatingWebhookConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sMutatingWebhookConfiguration[0]!=undefined && result.k8sMutatingWebhookConfiguration[0]!=null"
        :model="result.k8sMutatingWebhookConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sMutatingWebhookConfigurationEdit
        v-if="!loading && result!=undefined && result.k8sMutatingWebhookConfiguration[0]!=undefined && result.k8sMutatingWebhookConfiguration[0]!=null"
        :model="result.k8sMutatingWebhookConfiguration[0]"
       />
    </div>
  </div>
</template>

