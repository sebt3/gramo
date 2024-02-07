<script setup lang="ts">
import k8upPruneQuery from '@/queries/k8up/Prune.read.graphql'
import PruneEdit from '@/queries/k8up/Prune.patch.graphql'
import k8upPruneMeta from '@/components/k8up/PruneMeta.vue';
import k8upPruneEdit from '@/components/k8up/PruneEdit.vue';
import k8upPruneStatus from '@/components/k8up/PruneStatus.vue';
import { useQuery, useMutation, usePrune, PruneSimpleExcludes } from '../../../libs/k8up/Prune.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPruneFound, navigation, setNamespacedItemFromRoute } = usePrune();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPruneQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PruneSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotPruneFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PruneDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8upPruneQuery from '@/queries/k8up/Prune.read.graphql'
import PruneEdit from '@/queries/k8up/Prune.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePrune, sanitizeData, getProperties } from '../../../libs/k8up/Prune.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPruneFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePrune();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPruneQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPrune, onDone: onPatchPrune, onError: onPatchError } = useMutation(PruneEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPrune({ "namespace": result.value.k8upPrune.metadata.namespace, "name": result.value.k8upPrune.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotPruneFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8upPrune.metadata.obj.spec})});onPatchPrune(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upPruneMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
      <k8upPruneStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div><div class="col-md-6">
      <k8upPruneView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upPrune[0]!=undefined && result.k8sNamespace[0].k8upPrune[0]!=null"
        :model="result.k8sNamespace[0].k8upPrune[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upPrune!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Prune</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8upPrune.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upPrune!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8upPrune!=null && result.k8sNamespace[0].k8upPrune.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8upPrune.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8upPrune!=null" class="q-ma-sm">
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