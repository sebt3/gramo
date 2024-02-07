<script setup lang="ts">
import monitoringAlertmanagerConfigQuery from '@/queries/monitoring/AlertmanagerConfig.read.graphql'
import AlertmanagerConfigEdit from '@/queries/monitoring/AlertmanagerConfig.patch.graphql'
import monitoringAlertmanagerConfigMeta from '@/components/monitoring/AlertmanagerConfigMeta.vue';
import monitoringAlertmanagerConfigEdit from '@/components/monitoring/AlertmanagerConfigEdit.vue';
import { useQuery, useMutation, useAlertmanagerConfig, AlertmanagerConfigSimpleExcludes } from '../../../libs/monitoring/AlertmanagerConfig.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAlertmanagerConfigFound, navigation, setNamespacedItemFromRoute } = useAlertmanagerConfig();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerConfigQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertmanagerConfigSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotAlertmanagerConfigFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertmanagerConfigDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import monitoringAlertmanagerConfigQuery from '@/queries/monitoring/AlertmanagerConfig.read.graphql'
import AlertmanagerConfigEdit from '@/queries/monitoring/AlertmanagerConfig.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useAlertmanagerConfig, sanitizeData, getProperties } from '../../../libs/monitoring/AlertmanagerConfig.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotAlertmanagerConfigFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useAlertmanagerConfig();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringAlertmanagerConfigQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchAlertmanagerConfig, onDone: onPatchAlertmanagerConfig, onError: onPatchError } = useMutation(AlertmanagerConfigEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlertmanagerConfig({ "namespace": result.value.monitoringAlertmanagerConfig.metadata.namespace, "name": result.value.monitoringAlertmanagerConfig.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotAlertmanagerConfigFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.monitoringAlertmanagerConfig.metadata.obj.spec})});onPatchAlertmanagerConfig(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringAlertmanagerConfigMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanagerConfig[0]"
       />
    </div><div class="col-md-6">
      <monitoringAlertmanagerConfigView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=undefined && result.k8sNamespace[0].monitoringAlertmanagerConfig[0]!=null"
        :model="result.k8sNamespace[0].monitoringAlertmanagerConfig[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].monitoringAlertmanagerConfig!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">AlertmanagerConfig</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].monitoringAlertmanagerConfig.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].monitoringAlertmanagerConfig!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].monitoringAlertmanagerConfig!=null && result.k8sNamespace[0].monitoringAlertmanagerConfig.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].monitoringAlertmanagerConfig.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].monitoringAlertmanagerConfig!=null" class="q-ma-sm">
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