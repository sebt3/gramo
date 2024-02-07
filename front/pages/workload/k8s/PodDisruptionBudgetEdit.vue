<script setup lang="ts">
import k8sPodDisruptionBudgetQuery from '@/queries/k8s/PodDisruptionBudget.read.graphql'
import PodDisruptionBudgetEdit from '@/queries/k8s/PodDisruptionBudget.patch.graphql'
import k8sPodDisruptionBudgetMeta from '@/components/k8s/PodDisruptionBudgetMeta.vue';
import k8sPodDisruptionBudgetEdit from '@/components/k8s/PodDisruptionBudgetEdit.vue';
import k8sPodDisruptionBudgetStatus from '@/components/k8s/PodDisruptionBudgetStatus.vue';
import { useQuery, useMutation, usePodDisruptionBudget, PodDisruptionBudgetSimpleExcludes } from '../../../libs/k8s/PodDisruptionBudget.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodDisruptionBudgetFound, navigation, setNamespacedItemFromRoute } = usePodDisruptionBudget();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodDisruptionBudgetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodDisruptionBudgetSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotPodDisruptionBudgetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodDisruptionBudgetDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sPodDisruptionBudgetQuery from '@/queries/k8s/PodDisruptionBudget.read.graphql'
import PodDisruptionBudgetEdit from '@/queries/k8s/PodDisruptionBudget.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePodDisruptionBudget, sanitizeData, getProperties } from '../../../libs/k8s/PodDisruptionBudget.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPodDisruptionBudgetFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePodDisruptionBudget();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodDisruptionBudgetQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPodDisruptionBudget, onDone: onPatchPodDisruptionBudget, onError: onPatchError } = useMutation(PodDisruptionBudgetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPodDisruptionBudget({ "namespace": result.value.k8sPodDisruptionBudget.metadata.namespace, "name": result.value.k8sPodDisruptionBudget.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotPodDisruptionBudgetFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sPodDisruptionBudget.metadata.obj.spec})});onPatchPodDisruptionBudget(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPodDisruptionBudgetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
      <k8sPodDisruptionBudgetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null && result.k8sNamespace[0].k8sPodDisruptionBudget[0].parentCluster!=null && result.k8sNamespace[0].k8sPodDisruptionBudget[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0].parentCluster[0]"
       />
    </div><div class="col-md-6">
      <k8sPodDisruptionBudgetView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=undefined && result.k8sNamespace[0].k8sPodDisruptionBudget[0]!=null"
        :model="result.k8sNamespace[0].k8sPodDisruptionBudget[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPodDisruptionBudget!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodDisruptionBudget</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sPodDisruptionBudget.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPodDisruptionBudget!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sPodDisruptionBudget!=null && result.k8sNamespace[0].k8sPodDisruptionBudget.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sPodDisruptionBudget.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sPodDisruptionBudget!=null" class="q-ma-sm">
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