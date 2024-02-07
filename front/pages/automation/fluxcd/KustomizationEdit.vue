<script setup lang="ts">
import fluxcdKustomizationQuery from '@/queries/fluxcd/Kustomization.read.graphql'
import KustomizationEdit from '@/queries/fluxcd/Kustomization.patch.graphql'
import fluxcdKustomizationMeta from '@/components/fluxcd/KustomizationMeta.vue';
import fluxcdKustomizationEdit from '@/components/fluxcd/KustomizationEdit.vue';
import fluxcdKustomizationStatus from '@/components/fluxcd/KustomizationStatus.vue';
import { useQuery, useMutation, useKustomization, KustomizationSimpleExcludes } from '../../../libs/fluxcd/Kustomization.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKustomizationFound, navigation, setNamespacedItemFromRoute } = useKustomization();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdKustomizationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KustomizationSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotKustomizationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KustomizationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdKustomizationQuery from '@/queries/fluxcd/Kustomization.read.graphql'
import KustomizationEdit from '@/queries/fluxcd/Kustomization.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useKustomization, sanitizeData, getProperties } from '../../../libs/fluxcd/Kustomization.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotKustomizationFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useKustomization();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdKustomizationQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchKustomization, onDone: onPatchKustomization, onError: onPatchError } = useMutation(KustomizationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchKustomization({ "namespace": result.value.fluxcdKustomization.metadata.namespace, "name": result.value.fluxcdKustomization.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotKustomizationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdKustomization.metadata.obj.spec})});onPatchKustomization(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdKustomizationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
      <fluxcdKustomizationStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div><div class="col-md-6">
      <fluxcdKustomizationView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdKustomization[0]!=undefined && result.k8sNamespace[0].fluxcdKustomization[0]!=null"
        :model="result.k8sNamespace[0].fluxcdKustomization[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdKustomization!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Kustomization</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdKustomization.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdKustomization!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdKustomization!=null && result.k8sNamespace[0].fluxcdKustomization.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdKustomization.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdKustomization!=null" class="q-ma-sm">
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