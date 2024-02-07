<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitor.read.graphql'
import ServiceMonitorEdit from '@/queries/monitoring/ServiceMonitor.patch.graphql'
import monitoringServiceMonitorMeta from '@/components/monitoring/ServiceMonitorMeta.vue';
import monitoringServiceMonitorEdit from '@/components/monitoring/ServiceMonitorEdit.vue';
import { useQuery, useMutation, useServiceMonitor, ServiceMonitorSimpleExcludes } from '../../../libs/monitoring/ServiceMonitor.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceMonitorFound, navigation, setNamespacedItemFromRoute } = useServiceMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringServiceMonitorQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceMonitorSimpleExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
});onError(onErrorHandler); onResult(res => {onNotServiceMonitorFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceMonitorDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import monitoringServiceMonitorQuery from '@/queries/monitoring/ServiceMonitor.read.graphql'
import ServiceMonitorEdit from '@/queries/monitoring/ServiceMonitor.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useServiceMonitor, sanitizeData, getProperties } from '../../../libs/monitoring/ServiceMonitor.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotServiceMonitorFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useServiceMonitor();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringServiceMonitorQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchServiceMonitor, onDone: onPatchServiceMonitor, onError: onPatchError } = useMutation(ServiceMonitorEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServiceMonitor({ "namespace": result.value.monitoringServiceMonitor.metadata.namespace, "name": result.value.monitoringServiceMonitor.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotServiceMonitorFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.monitoringServiceMonitor.metadata.obj.spec})});onPatchServiceMonitor(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringServiceMonitorMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringServiceMonitor[0]!=undefined && result.k8sNamespace[0].monitoringServiceMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringServiceMonitor[0]"
       />
    </div><div class="col-md-6">
      <monitoringServiceMonitorView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringServiceMonitor[0]!=undefined && result.k8sNamespace[0].monitoringServiceMonitor[0]!=null"
        :model="result.k8sNamespace[0].monitoringServiceMonitor[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServiceMonitor</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].monitoringServiceMonitor.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].monitoringServiceMonitor!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].monitoringServiceMonitor!=null && result.k8sNamespace[0].monitoringServiceMonitor.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].monitoringServiceMonitor.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].monitoringServiceMonitor!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{ spec=v;editor.setspecSpec({ spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlspec" :key="editor.yamlspec"
          @update:text="v=>editor.setspecYaml(v)"
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