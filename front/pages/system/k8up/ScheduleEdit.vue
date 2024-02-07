<script setup lang="ts">
import k8upScheduleQuery from '@/queries/k8up/Schedule.read.graphql'
import ScheduleEdit from '@/queries/k8up/Schedule.patch.graphql'
import k8upScheduleMeta from '@/components/k8up/ScheduleMeta.vue';
import k8upScheduleEdit from '@/components/k8up/ScheduleEdit.vue';
import k8upScheduleStatus from '@/components/k8up/ScheduleStatus.vue';
import { useQuery, useMutation, useSchedule, ScheduleSimpleExcludes } from '../../../libs/k8up/Schedule.js'
const { onErrorHandler, notifySuccess, notifyError, onNotScheduleFound, navigation, setNamespacedItemFromRoute } = useSchedule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upScheduleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ScheduleSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotScheduleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ScheduleDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8upScheduleQuery from '@/queries/k8up/Schedule.read.graphql'
import ScheduleEdit from '@/queries/k8up/Schedule.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useSchedule, sanitizeData, getProperties } from '../../../libs/k8up/Schedule.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotScheduleFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSchedule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upScheduleQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSchedule, onDone: onPatchSchedule, onError: onPatchError } = useMutation(ScheduleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSchedule({ "namespace": result.value.k8upSchedule.metadata.namespace, "name": result.value.k8upSchedule.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotScheduleFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8upSchedule.metadata.obj.spec})});onPatchSchedule(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upScheduleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
      <k8upScheduleStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div><div class="col-md-6">
      <k8upScheduleView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upSchedule!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Schedule</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8upSchedule.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upSchedule!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8upSchedule!=null && result.k8sNamespace[0].k8upSchedule.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8upSchedule.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8upSchedule!=null" class="q-ma-sm">
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