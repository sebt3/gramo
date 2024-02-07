<script setup lang="ts">
import k8sPersistentVolumeQuery from '@/queries/k8s/PersistentVolume.read.graphql'
import PersistentVolumeEdit from '@/queries/k8s/PersistentVolume.patch.graphql'
import k8sPersistentVolumeMeta from '@/components/k8s/PersistentVolumeMeta.vue';
import k8sPersistentVolumeEdit from '@/components/k8s/PersistentVolumeEdit.vue';
import k8sPersistentVolumeStatus from '@/components/k8s/PersistentVolumeStatus.vue';
import { useQuery, useMutation, usePersistentVolume, PersistentVolumeSimpleExcludes } from '../../../libs/k8s/PersistentVolume.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPersistentVolumeFound, navigation, setItemFromRoute } = usePersistentVolume();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PersistentVolumeSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotPersistentVolumeFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PersistentVolumeDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sPersistentVolumeQuery from '@/queries/k8s/PersistentVolume.read.graphql'
import PersistentVolumeEdit from '@/queries/k8s/PersistentVolume.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePersistentVolume, sanitizeData, getProperties } from '../../../libs/k8s/PersistentVolume.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPersistentVolumeFound, setItemFromRoute, navigation, onErrorHandler } = usePersistentVolume();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPersistentVolumeQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPersistentVolume, onDone: onPatchPersistentVolume, onError: onPatchError } = useMutation(PersistentVolumeEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPersistentVolume({ "name": result.value.k8sPersistentVolume.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotPersistentVolumeFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sPersistentVolume.metadata.obj.spec})});onPatchPersistentVolume(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPersistentVolumeMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
      <k8sPersistentVolumeStatus
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div><div class="col-md-6">
      <k8sPersistentVolumeView
        v-if="!loading && result!=undefined && result.k8sPersistentVolume[0]!=undefined && result.k8sPersistentVolume[0]!=null"
        :model="result.k8sPersistentVolume[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sPersistentVolume!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PersistentVolume</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sPersistentVolume.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sPersistentVolume!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sPersistentVolume!=null && result.k8sPersistentVolume.status != null">
          <DefaultStatusView :status="result.k8sPersistentVolume.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sPersistentVolume!=null" class="q-ma-sm">
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