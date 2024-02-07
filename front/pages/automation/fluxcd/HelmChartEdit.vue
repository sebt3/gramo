<script setup lang="ts">
import fluxcdHelmChartQuery from '@/queries/fluxcd/HelmChart.read.graphql'
import HelmChartEdit from '@/queries/fluxcd/HelmChart.patch.graphql'
import fluxcdHelmChartMeta from '@/components/fluxcd/HelmChartMeta.vue';
import fluxcdHelmChartEdit from '@/components/fluxcd/HelmChartEdit.vue';
import fluxcdHelmChartStatus from '@/components/fluxcd/HelmChartStatus.vue';
import { useQuery, useMutation, useHelmChart, HelmChartSimpleExcludes } from '../../../libs/fluxcd/HelmChart.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHelmChartFound, navigation, setNamespacedItemFromRoute } = useHelmChart();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmChartQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmChartSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotHelmChartFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmChartDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdHelmChartQuery from '@/queries/fluxcd/HelmChart.read.graphql'
import HelmChartEdit from '@/queries/fluxcd/HelmChart.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useHelmChart, sanitizeData, getProperties } from '../../../libs/fluxcd/HelmChart.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotHelmChartFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useHelmChart();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmChartQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHelmChart, onDone: onPatchHelmChart, onError: onPatchError } = useMutation(HelmChartEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmChart({ "namespace": result.value.fluxcdHelmChart.metadata.namespace, "name": result.value.fluxcdHelmChart.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotHelmChartFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdHelmChart.metadata.obj.spec})});onPatchHelmChart(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdHelmChartMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
       />
      <fluxcdHelmChartStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
       />
    </div><div class="col-md-6">
      <fluxcdHelmChartView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmChart[0]!=undefined && result.k8sNamespace[0].fluxcdHelmChart[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmChart[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdHelmChart!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmChart</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdHelmChart.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdHelmChart!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdHelmChart!=null && result.k8sNamespace[0].fluxcdHelmChart.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdHelmChart.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdHelmChart!=null" class="q-ma-sm">
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