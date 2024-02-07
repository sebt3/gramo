<script setup lang="ts">
import k8sCSIDriverQuery from '@/queries/k8s/CSIDriver.read.graphql'
import CSIDriverEdit from '@/queries/k8s/CSIDriver.patch.graphql'
import k8sCSIDriverMeta from '@/components/k8s/CSIDriverMeta.vue';
import k8sCSIDriverEdit from '@/components/k8s/CSIDriverEdit.vue';
import { useQuery, useMutation, useCSIDriver, CSIDriverSimpleExcludes } from '../../../libs/k8s/CSIDriver.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCSIDriverFound, navigation, setItemFromRoute } = useCSIDriver();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIDriverQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSIDriverSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotCSIDriverFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSIDriverDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sCSIDriverQuery from '@/queries/k8s/CSIDriver.read.graphql'
import CSIDriverEdit from '@/queries/k8s/CSIDriver.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCSIDriver, sanitizeData, getProperties } from '../../../libs/k8s/CSIDriver.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotCSIDriverFound, setItemFromRoute, navigation, onErrorHandler } = useCSIDriver();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIDriverQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCSIDriver, onDone: onPatchCSIDriver, onError: onPatchError } = useMutation(CSIDriverEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCSIDriver({ "name": result.value.k8sCSIDriver.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotCSIDriverFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sCSIDriver.metadata.obj.spec})});onPatchCSIDriver(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCSIDriverMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCSIDriver[0]!=undefined && result.k8sCSIDriver[0]!=null"
        :model="result.k8sCSIDriver[0]"
       />
    </div><div class="col-md-6">
      <k8sCSIDriverView
        v-if="!loading && result!=undefined && result.k8sCSIDriver[0]!=undefined && result.k8sCSIDriver[0]!=null"
        :model="result.k8sCSIDriver[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sCSIDriver!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CSIDriver</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sCSIDriver.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sCSIDriver!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sCSIDriver!=null && result.k8sCSIDriver.status != null">
          <DefaultStatusView :status="result.k8sCSIDriver.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sCSIDriver!=null" class="q-ma-sm">
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