<script setup lang="ts">
import k8sAPIServiceQuery from '@/queries/k8s/APIService.read.graphql'
import APIServiceEdit from '@/queries/k8s/APIService.patch.graphql'
import k8sAPIServiceMeta from '@/components/k8s/APIServiceMeta.vue';
import k8sAPIServiceEdit from '@/components/k8s/APIServiceEdit.vue';
import k8sAPIServiceStatus from '@/components/k8s/APIServiceStatus.vue';
import { useQuery, useMutation, useAPIService, APIServiceSimpleExcludes } from '../../../libs/k8s/APIService.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAPIServiceFound, navigation, setItemFromRoute } = useAPIService();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sAPIServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": APIServiceSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotAPIServiceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(APIServiceDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sAPIServiceQuery from '@/queries/k8s/APIService.read.graphql'
import APIServiceEdit from '@/queries/k8s/APIService.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useAPIService, sanitizeData, getProperties } from '../../../libs/k8s/APIService.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotAPIServiceFound, setItemFromRoute, navigation, onErrorHandler } = useAPIService();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sAPIServiceQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchAPIService, onDone: onPatchAPIService, onError: onPatchError } = useMutation(APIServiceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAPIService({ "name": result.value.k8sAPIService.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotAPIServiceFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sAPIService.metadata.obj.spec})});onPatchAPIService(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sAPIServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
      <k8sAPIServiceStatus
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div><div class="col-md-6">
      <k8sAPIServiceView
        v-if="!loading && result!=undefined && result.k8sAPIService[0]!=undefined && result.k8sAPIService[0]!=null"
        :model="result.k8sAPIService[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sAPIService!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">APIService</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sAPIService.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sAPIService!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sAPIService!=null && result.k8sAPIService.status != null">
          <DefaultStatusView :status="result.k8sAPIService.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sAPIService!=null" class="q-ma-sm">
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