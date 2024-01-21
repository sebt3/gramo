<script setup lang="ts">
import monitoringAlertmanagerConfigQuery from '@/queries/monitoring/AlertmanagerConfigView.graphql'
import alertmanagerConfigEdit from '@/queries/monitoring/AlertmanagerConfigEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useAlertmanagerConfig, sanitizeData, getProperties } from './AlertmanagerConfig.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotAlertmanagerConfigFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useAlertmanagerConfig();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerConfigQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchAlertmanagerConfig, onDone: onPatchAlertmanagerConfig, onError: onPatchError } = useMutation(alertmanagerConfigEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlertmanagerConfig({"namespace": result.value.monitoringAlertmanagerConfig.metadata.namespace, "name": result.value.monitoringAlertmanagerConfig.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotAlertmanagerConfigFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.monitoringAlertmanagerConfig.metadata.obj.spec})});onPatchAlertmanagerConfig(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringAlertmanagerConfig!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">AlertmanagerConfig</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringAlertmanagerConfig.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringAlertmanagerConfig!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringAlertmanagerConfig!=null && result.monitoringAlertmanagerConfig.status != null">
          <DefaultStatusView :status="result.monitoringAlertmanagerConfig.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.monitoringAlertmanagerConfig!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{data=v;editor.setSpec({spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yaml" :key="editor.yaml"
          @update:text="v=>editor.setYaml(v)"
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
