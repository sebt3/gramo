<script setup lang="ts">
import k8upSnapshotQuery from '@/queries/k8up/Snapshot.read.graphql'
import SnapshotEdit from '@/queries/k8up/Snapshot.patch.graphql'
import k8upSnapshotMeta from '@/components/k8up/SnapshotMeta.vue';
import k8upSnapshotEdit from '@/components/k8up/SnapshotEdit.vue';
import k8upSnapshotStatus from '@/components/k8up/SnapshotStatus.vue';
import { useQuery, useMutation, useSnapshot, SnapshotSimpleExcludes } from '../../../libs/k8up/Snapshot.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSnapshotFound, navigation, setNamespacedItemFromRoute } = useSnapshot();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upSnapshotQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SnapshotSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotSnapshotFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SnapshotDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8upSnapshotQuery from '@/queries/k8up/Snapshot.read.graphql'
import SnapshotEdit from '@/queries/k8up/Snapshot.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useSnapshot, sanitizeData, getProperties } from '../../../libs/k8up/Snapshot.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotSnapshotFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSnapshot();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upSnapshotQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSnapshot, onDone: onPatchSnapshot, onError: onPatchError } = useMutation(SnapshotEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSnapshot({ "namespace": result.value.k8upSnapshot.metadata.namespace, "name": result.value.k8upSnapshot.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotSnapshotFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8upSnapshot.metadata.obj.spec})});onPatchSnapshot(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upSnapshotMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
      <k8upSnapshotStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div><div class="col-md-6">
      <k8upSnapshotView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSnapshot[0]!=undefined && result.k8sNamespace[0].k8upSnapshot[0]!=null"
        :model="result.k8sNamespace[0].k8upSnapshot[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upSnapshot!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Snapshot</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8upSnapshot.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upSnapshot!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8upSnapshot!=null && result.k8sNamespace[0].k8upSnapshot.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8upSnapshot.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8upSnapshot!=null" class="q-ma-sm">
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