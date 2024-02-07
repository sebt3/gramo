<script setup lang="ts">
import k8sRuntimeClassQuery from '@/queries/k8s/RuntimeClass.read.graphql'
import RuntimeClassEdit from '@/queries/k8s/RuntimeClass.patch.graphql'
import k8sRuntimeClassMeta from '@/components/k8s/RuntimeClassMeta.vue';
import k8sRuntimeClassEdit from '@/components/k8s/RuntimeClassEdit.vue';
import { useQuery, useMutation, useRuntimeClass, RuntimeClassSimpleExcludes } from '../../../libs/k8s/RuntimeClass.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRuntimeClassFound, navigation, setItemFromRoute } = useRuntimeClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRuntimeClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RuntimeClassSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotRuntimeClassFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RuntimeClassDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sRuntimeClassQuery from '@/queries/k8s/RuntimeClass.read.graphql'
import RuntimeClassEdit from '@/queries/k8s/RuntimeClass.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRuntimeClass, sanitizeData, getProperties } from '../../../libs/k8s/RuntimeClass.js'
const handler  = ref({});
const overhead  = ref({});
const scheduling  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRuntimeClassFound, setItemFromRoute, navigation, onErrorHandler } = useRuntimeClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRuntimeClassQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRuntimeClass, onDone: onPatchRuntimeClass, onError: onPatchError } = useMutation(RuntimeClassEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRuntimeClass({ "name": result.value.k8sRuntimeClass.metadata.name, "handler": sanitizeData(handler.value), "overhead": sanitizeData(overhead.value), "scheduling": sanitizeData(scheduling.value) });
}
onError(onErrorHandler);onResult(res => {onNotRuntimeClassFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sRuntimeClass.metadata.obj.spec})});onPatchRuntimeClass(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sRuntimeClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sRuntimeClass[0]!=undefined && result.k8sRuntimeClass[0]!=null"
        :model="result.k8sRuntimeClass[0]"
       />
    </div><div class="col-md-6">
      <k8sRuntimeClassView
        v-if="!loading && result!=undefined && result.k8sRuntimeClass[0]!=undefined && result.k8sRuntimeClass[0]!=null"
        :model="result.k8sRuntimeClass[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sRuntimeClass!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RuntimeClass</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sRuntimeClass.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sRuntimeClass!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sRuntimeClass!=null && result.k8sRuntimeClass.status != null">
          <DefaultStatusView :status="result.k8sRuntimeClass.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sRuntimeClass!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.handler).includes('handler')?editor.handler['handler']:{}"
          @update:out="v=>{ handler=v;editor.sethandlerSpec({ handler: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.overhead).includes('overhead')?editor.overhead['overhead']:{}"
          @update:out="v=>{ overhead=v;editor.setoverheadSpec({ overhead: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.scheduling).includes('scheduling')?editor.scheduling['scheduling']:{}"
          @update:out="v=>{ scheduling=v;editor.setschedulingSpec({ scheduling: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlhandler" :key="editor.yamlhandler"
          @update:text="v=>editor.sethandlerYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamloverhead" :key="editor.yamloverhead"
          @update:text="v=>editor.setoverheadYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlscheduling" :key="editor.yamlscheduling"
          @update:text="v=>editor.setschedulingYaml(v)"
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