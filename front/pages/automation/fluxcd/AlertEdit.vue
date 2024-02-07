<script setup lang="ts">
import fluxcdAlertQuery from '@/queries/fluxcd/Alert.read.graphql'
import AlertEdit from '@/queries/fluxcd/Alert.patch.graphql'
import fluxcdAlertMeta from '@/components/fluxcd/AlertMeta.vue';
import fluxcdAlertEdit from '@/components/fluxcd/AlertEdit.vue';
import fluxcdAlertStatus from '@/components/fluxcd/AlertStatus.vue';
import { useQuery, useMutation, useAlert, AlertSimpleExcludes } from '../../../libs/fluxcd/Alert.js'
const { onErrorHandler, notifySuccess, notifyError, onNotAlertFound, navigation, setNamespacedItemFromRoute } = useAlert();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdAlertQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": AlertSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotAlertFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(AlertDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdAlertQuery from '@/queries/fluxcd/Alert.read.graphql'
import AlertEdit from '@/queries/fluxcd/Alert.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useAlert, sanitizeData, getProperties } from '../../../libs/fluxcd/Alert.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotAlertFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useAlert();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdAlertQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchAlert, onDone: onPatchAlert, onError: onPatchError } = useMutation(AlertEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchAlert({ "namespace": result.value.fluxcdAlert.metadata.namespace, "name": result.value.fluxcdAlert.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotAlertFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdAlert.metadata.obj.spec})});onPatchAlert(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdAlertMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
      <fluxcdAlertStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div><div class="col-md-6">
      <fluxcdAlertView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdAlert[0]!=undefined && result.k8sNamespace[0].fluxcdAlert[0]!=null"
        :model="result.k8sNamespace[0].fluxcdAlert[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdAlert!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Alert</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdAlert.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdAlert!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdAlert!=null && result.k8sNamespace[0].fluxcdAlert.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdAlert.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdAlert!=null" class="q-ma-sm">
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