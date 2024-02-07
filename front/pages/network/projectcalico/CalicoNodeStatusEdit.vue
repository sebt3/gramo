<script setup lang="ts">
import projectcalicoCalicoNodeStatusQuery from '@/queries/projectcalico/CalicoNodeStatus.read.graphql'
import CalicoNodeStatusEdit from '@/queries/projectcalico/CalicoNodeStatus.patch.graphql'
import projectcalicoCalicoNodeStatusMeta from '@/components/projectcalico/CalicoNodeStatusMeta.vue';
import projectcalicoCalicoNodeStatusEdit from '@/components/projectcalico/CalicoNodeStatusEdit.vue';
import projectcalicoCalicoNodeStatusStatus from '@/components/projectcalico/CalicoNodeStatusStatus.vue';
import { useQuery, useMutation, useCalicoNodeStatus, CalicoNodeStatusSimpleExcludes } from '../../../libs/projectcalico/CalicoNodeStatus.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCalicoNodeStatusFound, navigation, setItemFromRoute } = useCalicoNodeStatus();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoCalicoNodeStatusQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CalicoNodeStatusSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotCalicoNodeStatusFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CalicoNodeStatusDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoCalicoNodeStatusQuery from '@/queries/projectcalico/CalicoNodeStatus.read.graphql'
import CalicoNodeStatusEdit from '@/queries/projectcalico/CalicoNodeStatus.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCalicoNodeStatus, sanitizeData, getProperties } from '../../../libs/projectcalico/CalicoNodeStatus.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotCalicoNodeStatusFound, setItemFromRoute, navigation, onErrorHandler } = useCalicoNodeStatus();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoCalicoNodeStatusQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCalicoNodeStatus, onDone: onPatchCalicoNodeStatus, onError: onPatchError } = useMutation(CalicoNodeStatusEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCalicoNodeStatus({ "name": result.value.projectcalicoCalicoNodeStatus.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotCalicoNodeStatusFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoCalicoNodeStatus.metadata.obj.spec})});onPatchCalicoNodeStatus(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoCalicoNodeStatusMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
      <projectcalicoCalicoNodeStatusStatus
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoCalicoNodeStatusView
        v-if="!loading && result!=undefined && result.projectcalicoCalicoNodeStatus[0]!=undefined && result.projectcalicoCalicoNodeStatus[0]!=null"
        :model="result.projectcalicoCalicoNodeStatus[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoCalicoNodeStatus!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CalicoNodeStatus</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoCalicoNodeStatus.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoCalicoNodeStatus!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoCalicoNodeStatus!=null && result.projectcalicoCalicoNodeStatus.status != null">
          <DefaultStatusView :status="result.projectcalicoCalicoNodeStatus.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoCalicoNodeStatus!=null" class="q-ma-sm">
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