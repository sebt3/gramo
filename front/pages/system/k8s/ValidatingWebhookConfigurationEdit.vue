<script setup lang="ts">
import k8sValidatingWebhookConfigurationQuery from '@/queries/k8s/ValidatingWebhookConfiguration.read.graphql'
import ValidatingWebhookConfigurationEdit from '@/queries/k8s/ValidatingWebhookConfiguration.patch.graphql'
import k8sValidatingWebhookConfigurationMeta from '@/components/k8s/ValidatingWebhookConfigurationMeta.vue';
import k8sValidatingWebhookConfigurationEdit from '@/components/k8s/ValidatingWebhookConfigurationEdit.vue';
import { useQuery, useMutation, useValidatingWebhookConfiguration, ValidatingWebhookConfigurationSimpleExcludes } from '../../../libs/k8s/ValidatingWebhookConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotValidatingWebhookConfigurationFound, navigation, setItemFromRoute } = useValidatingWebhookConfiguration();setItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotValidatingWebhookConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ValidatingWebhookConfigurationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sValidatingWebhookConfigurationQuery from '@/queries/k8s/ValidatingWebhookConfiguration.read.graphql'
import ValidatingWebhookConfigurationEdit from '@/queries/k8s/ValidatingWebhookConfiguration.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useValidatingWebhookConfiguration, sanitizeData, getProperties } from '../../../libs/k8s/ValidatingWebhookConfiguration.js'
const webhooks  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotValidatingWebhookConfigurationFound, setItemFromRoute, navigation, onErrorHandler } = useValidatingWebhookConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sValidatingWebhookConfigurationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchValidatingWebhookConfiguration, onDone: onPatchValidatingWebhookConfiguration, onError: onPatchError } = useMutation(ValidatingWebhookConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchValidatingWebhookConfiguration({ "name": result.value.k8sValidatingWebhookConfiguration.metadata.name, "webhooks": sanitizeData(webhooks.value) });
}
onError(onErrorHandler);onResult(res => {onNotValidatingWebhookConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sValidatingWebhookConfiguration.metadata.obj.spec})});onPatchValidatingWebhookConfiguration(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sValidatingWebhookConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sValidatingWebhookConfiguration[0]!=undefined && result.k8sValidatingWebhookConfiguration[0]!=null"
        :model="result.k8sValidatingWebhookConfiguration[0]"
       />
    </div><div class="col-md-6">
      <k8sValidatingWebhookConfigurationView
        v-if="!loading && result!=undefined && result.k8sValidatingWebhookConfiguration[0]!=undefined && result.k8sValidatingWebhookConfiguration[0]!=null"
        :model="result.k8sValidatingWebhookConfiguration[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sValidatingWebhookConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ValidatingWebhookConfiguration</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sValidatingWebhookConfiguration.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sValidatingWebhookConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sValidatingWebhookConfiguration!=null && result.k8sValidatingWebhookConfiguration.status != null">
          <DefaultStatusView :status="result.k8sValidatingWebhookConfiguration.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sValidatingWebhookConfiguration!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.webhooks).includes('webhooks')?editor.webhooks['webhooks']:{}"
          @update:out="v=>{ webhooks=v;editor.setwebhooksSpec({ webhooks: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlwebhooks" :key="editor.yamlwebhooks"
          @update:text="v=>editor.setwebhooksYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>