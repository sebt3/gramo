<script setup lang="ts">
import k8sPriorityClassQuery from '@/queries/k8s/PriorityClass.read.graphql'
import PriorityClassEdit from '@/queries/k8s/PriorityClass.patch.graphql'
import k8sPriorityClassMeta from '@/components/k8s/PriorityClassMeta.vue';
import k8sPriorityClassEdit from '@/components/k8s/PriorityClassEdit.vue';
import { useQuery, useMutation, usePriorityClass, PriorityClassSimpleExcludes } from '../../../libs/k8s/PriorityClass.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPriorityClassFound, navigation, setItemFromRoute } = usePriorityClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPriorityClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PriorityClassSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotPriorityClassFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PriorityClassDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sPriorityClassQuery from '@/queries/k8s/PriorityClass.read.graphql'
import PriorityClassEdit from '@/queries/k8s/PriorityClass.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePriorityClass, sanitizeData, getProperties } from '../../../libs/k8s/PriorityClass.js'
const description  = ref({});
const globalDefault  = ref({});
const preemptionPolicy  = ref({});
const value  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPriorityClassFound, setItemFromRoute, navigation, onErrorHandler } = usePriorityClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPriorityClassQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPriorityClass, onDone: onPatchPriorityClass, onError: onPatchError } = useMutation(PriorityClassEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPriorityClass({ "name": result.value.k8sPriorityClass.metadata.name, "description": sanitizeData(description.value), "globalDefault": sanitizeData(globalDefault.value), "preemptionPolicy": sanitizeData(preemptionPolicy.value), "value": sanitizeData(value.value) });
}
onError(onErrorHandler);onResult(res => {onNotPriorityClassFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sPriorityClass.metadata.obj.spec})});onPatchPriorityClass(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPriorityClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sPriorityClass[0]!=undefined && result.k8sPriorityClass[0]!=null"
        :model="result.k8sPriorityClass[0]"
       />
    </div><div class="col-md-6">
      <k8sPriorityClassView
        v-if="!loading && result!=undefined && result.k8sPriorityClass[0]!=undefined && result.k8sPriorityClass[0]!=null"
        :model="result.k8sPriorityClass[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sPriorityClass!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PriorityClass</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sPriorityClass.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sPriorityClass!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sPriorityClass!=null && result.k8sPriorityClass.status != null">
          <DefaultStatusView :status="result.k8sPriorityClass.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sPriorityClass!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.description).includes('description')?editor.description['description']:{}"
          @update:out="v=>{ description=v;editor.setdescriptionSpec({ description: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.globalDefault).includes('globalDefault')?editor.globalDefault['globalDefault']:{}"
          @update:out="v=>{ globalDefault=v;editor.setglobalDefaultSpec({ globalDefault: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.preemptionPolicy).includes('preemptionPolicy')?editor.preemptionPolicy['preemptionPolicy']:{}"
          @update:out="v=>{ preemptionPolicy=v;editor.setpreemptionPolicySpec({ preemptionPolicy: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.value).includes('value')?editor.value['value']:{}"
          @update:out="v=>{ value=v;editor.setvalueSpec({ value: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamldescription" :key="editor.yamldescription"
          @update:text="v=>editor.setdescriptionYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlglobalDefault" :key="editor.yamlglobalDefault"
          @update:text="v=>editor.setglobalDefaultYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlpreemptionPolicy" :key="editor.yamlpreemptionPolicy"
          @update:text="v=>editor.setpreemptionPolicyYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlvalue" :key="editor.yamlvalue"
          @update:text="v=>editor.setvalueYaml(v)"
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