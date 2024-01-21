<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitorView.graphql'
import serviceMonitorEdit from '@/queries/monitoring/ServiceMonitorEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useServiceMonitor, sanitizeData, getProperties } from './ServiceMonitor.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotServiceMonitorFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useServiceMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringServiceMonitorQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchServiceMonitor, onDone: onPatchServiceMonitor, onError: onPatchError } = useMutation(serviceMonitorEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServiceMonitor({"namespace": result.value.monitoringServiceMonitor.metadata.namespace, "name": result.value.monitoringServiceMonitor.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotServiceMonitorFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.monitoringServiceMonitor.metadata.obj.spec})});onPatchServiceMonitor(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServiceMonitor</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.monitoringServiceMonitor.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.monitoringServiceMonitor!=null && result.monitoringServiceMonitor.status != null">
          <DefaultStatusView :status="result.monitoringServiceMonitor.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.monitoringServiceMonitor!=null" class="q-ma-sm">
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
