<script setup lang="ts">
import k8sConfigMapQuery from '@/queries/k8s/ConfigMap.read.graphql'
import ConfigMapEdit from '@/queries/k8s/ConfigMap.patch.graphql'
import k8sConfigMapMeta from '@/components/k8s/ConfigMapMeta.vue';
import k8sConfigMapEdit from '@/components/k8s/ConfigMapEdit.vue';
import { useQuery, useMutation, useConfigMap, ConfigMapSimpleExcludes } from '../../../libs/k8s/ConfigMap.js'
const { onErrorHandler, notifySuccess, notifyError, onNotConfigMapFound, navigation, setNamespacedItemFromRoute } = useConfigMap();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sConfigMapQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ConfigMapSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotConfigMapFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ConfigMapDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sConfigMapQuery from '@/queries/k8s/ConfigMap.read.graphql'
import ConfigMapEdit from '@/queries/k8s/ConfigMap.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useConfigMap, sanitizeData, getProperties } from '../../../libs/k8s/ConfigMap.js'
const binaryData  = ref({});
const data  = ref({});
const immutable  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotConfigMapFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useConfigMap();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sConfigMapQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchConfigMap, onDone: onPatchConfigMap, onError: onPatchError } = useMutation(ConfigMapEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchConfigMap({ "namespace": result.value.k8sConfigMap.metadata.namespace, "name": result.value.k8sConfigMap.metadata.name, "binaryData": sanitizeData(binaryData.value), "data": sanitizeData(data.value), "immutable": sanitizeData(immutable.value) });
}
onError(onErrorHandler);onResult(res => {onNotConfigMapFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sConfigMap.metadata.obj.spec})});onPatchConfigMap(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sConfigMapMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null"
        :model="result.k8sNamespace[0].k8sConfigMap[0]"
       />
      <monitoringPrometheusMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null && result.k8sNamespace[0].k8sConfigMap[0].parentPrometheus!=null && result.k8sNamespace[0].k8sConfigMap[0].parentPrometheus.length>0"
        :model="result.k8sNamespace[0].k8sConfigMap[0].parentPrometheus[0]"
       />
    </div><div class="col-md-6">
      <k8sConfigMapView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null"
        :model="result.k8sNamespace[0].k8sConfigMap[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sConfigMap!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ConfigMap</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sConfigMap.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sConfigMap!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sConfigMap!=null && result.k8sNamespace[0].k8sConfigMap.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sConfigMap.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sConfigMap!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.binaryData).includes('binaryData')?editor.binaryData['binaryData']:{}"
          @update:out="v=>{ binaryData=v;editor.setbinaryDataSpec({ binaryData: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.data).includes('data')?editor.data['data']:{}"
          @update:out="v=>{ data=v;editor.setdataSpec({ data: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.immutable).includes('immutable')?editor.immutable['immutable']:{}"
          @update:out="v=>{ immutable=v;editor.setimmutableSpec({ immutable: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlbinaryData" :key="editor.yamlbinaryData"
          @update:text="v=>editor.setbinaryDataYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamldata" :key="editor.yamldata"
          @update:text="v=>editor.setdataYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlimmutable" :key="editor.yamlimmutable"
          @update:text="v=>editor.setimmutableYaml(v)"
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