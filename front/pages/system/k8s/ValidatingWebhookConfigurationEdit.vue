<script setup lang="ts">
import k8sValidatingWebhookConfigurationQuery from '@/queries/k8s/ValidatingWebhookConfiguration.read.graphql'
import ValidatingWebhookConfigurationEdit from '@/queries/k8s/ValidatingWebhookConfiguration.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sValidatingWebhookConfigurationMeta from '@/components/k8s/ValidatingWebhookConfigurationMeta.vue';
import k8sValidatingWebhookConfigurationEdit from '@/components/k8s/ValidatingWebhookConfigurationEdit.vue';
import { useQuery, useMutation, sanitizeData, useValidatingWebhookConfiguration, ValidatingWebhookConfigurationSimpleExcludes } from '../../../libs/k8s/ValidatingWebhookConfiguration.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotValidatingWebhookConfigurationFound, navigation, editor, setItemFromRoute } = useValidatingWebhookConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sValidatingWebhookConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ValidatingWebhookConfigurationSimpleExcludes
  },
});
const { mutate: patchValidatingWebhookConfiguration, onDone: onPatchValidatingWebhookConfiguration, onError: onPatchError } = useMutation(ValidatingWebhookConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchValidatingWebhookConfiguration({
    "name": result.k8sValidatingWebhookConfiguration[0].metadata.name,
    "webhooks": sanitizeData(editor.value.obj['webhooks']),
  });
}
onError(onErrorHandler);onResult(res => {onNotValidatingWebhookConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sValidatingWebhookConfiguration[0])});onPatchValidatingWebhookConfiguration(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sValidatingWebhookConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sValidatingWebhookConfiguration[0]!=undefined && result.k8sValidatingWebhookConfiguration[0]!=null"
        :model="result.k8sValidatingWebhookConfiguration[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sValidatingWebhookConfigurationEdit
        v-if="!loading && result!=undefined && result.k8sValidatingWebhookConfiguration[0]!=undefined && result.k8sValidatingWebhookConfiguration[0]!=null"
        :model="result.k8sValidatingWebhookConfiguration[0]"
       />
    </div>
  </div>
</template>

