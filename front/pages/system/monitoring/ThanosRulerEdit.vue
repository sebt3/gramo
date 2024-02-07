<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRuler.read.graphql'
import ThanosRulerEdit from '@/queries/monitoring/ThanosRuler.patch.graphql'
import monitoringThanosRulerMeta from '@/components/monitoring/ThanosRulerMeta.vue';
import monitoringThanosRulerEdit from '@/components/monitoring/ThanosRulerEdit.vue';
import monitoringThanosRulerStatus from '@/components/monitoring/ThanosRulerStatus.vue';
import { useQuery, useMutation, useThanosRuler, ThanosRulerSimpleExcludes } from '../../../libs/monitoring/ThanosRuler.js'
const { onErrorHandler, notifySuccess, notifyError, onNotThanosRulerFound, navigation, setNamespacedItemFromRoute } = useThanosRuler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringThanosRulerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ThanosRulerSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotThanosRulerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ThanosRulerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import monitoringThanosRulerQuery from '@/queries/monitoring/ThanosRuler.read.graphql'
import ThanosRulerEdit from '@/queries/monitoring/ThanosRuler.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useThanosRuler, sanitizeData, getProperties } from '../../../libs/monitoring/ThanosRuler.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotThanosRulerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useThanosRuler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(monitoringThanosRulerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchThanosRuler, onDone: onPatchThanosRuler, onError: onPatchError } = useMutation(ThanosRulerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchThanosRuler({ "namespace": result.value.monitoringThanosRuler.metadata.namespace, "name": result.value.monitoringThanosRuler.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotThanosRulerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.monitoringThanosRuler.metadata.obj.spec})});onPatchThanosRuler(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <monitoringThanosRulerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
      <monitoringThanosRulerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div><div class="col-md-6">
      <monitoringThanosRulerView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].monitoringThanosRuler[0]!=undefined && result.k8sNamespace[0].monitoringThanosRuler[0]!=null"
        :model="result.k8sNamespace[0].monitoringThanosRuler[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ThanosRuler</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].monitoringThanosRuler.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].monitoringThanosRuler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].monitoringThanosRuler!=null && result.k8sNamespace[0].monitoringThanosRuler.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].monitoringThanosRuler.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].monitoringThanosRuler!=null" class="q-ma-sm">
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