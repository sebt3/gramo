<script setup lang="ts">
import mariadbRestoreQuery from '@/queries/mariadb/Restore.read.graphql'
import RestoreEdit from '@/queries/mariadb/Restore.patch.graphql'
import mariadbRestoreMeta from '@/components/mariadb/RestoreMeta.vue';
import mariadbRestoreEdit from '@/components/mariadb/RestoreEdit.vue';
import mariadbRestoreStatus from '@/components/mariadb/RestoreStatus.vue';
import { useQuery, useMutation, useRestore, RestoreSimpleExcludes } from '../../../libs/mariadb/Restore.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRestoreFound, navigation, setNamespacedItemFromRoute } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbRestoreQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RestoreSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotRestoreFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RestoreDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbRestoreQuery from '@/queries/mariadb/Restore.read.graphql'
import RestoreEdit from '@/queries/mariadb/Restore.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRestore, sanitizeData, getProperties } from '../../../libs/mariadb/Restore.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRestoreFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRestore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbRestoreQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRestore, onDone: onPatchRestore, onError: onPatchError } = useMutation(RestoreEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRestore({ "namespace": result.value.mariadbRestore.metadata.namespace, "name": result.value.mariadbRestore.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotRestoreFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbRestore.metadata.obj.spec})});onPatchRestore(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbRestoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
      <mariadbRestoreStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div><div class="col-md-6">
      <mariadbRestoreView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbRestore[0]!=undefined && result.k8sNamespace[0].mariadbRestore[0]!=null"
        :model="result.k8sNamespace[0].mariadbRestore[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbRestore!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Restore</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbRestore.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbRestore!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbRestore!=null && result.k8sNamespace[0].mariadbRestore.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbRestore.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbRestore!=null" class="q-ma-sm">
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