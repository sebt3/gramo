<script setup lang="ts">
import fluxcdHelmRepositoryQuery from '@/queries/fluxcd/HelmRepository.read.graphql'
import HelmRepositoryEdit from '@/queries/fluxcd/HelmRepository.patch.graphql'
import fluxcdHelmRepositoryMeta from '@/components/fluxcd/HelmRepositoryMeta.vue';
import fluxcdHelmRepositoryEdit from '@/components/fluxcd/HelmRepositoryEdit.vue';
import fluxcdHelmRepositoryStatus from '@/components/fluxcd/HelmRepositoryStatus.vue';
import { useQuery, useMutation, useHelmRepository, HelmRepositorySimpleExcludes } from '../../../libs/fluxcd/HelmRepository.js'
const { onErrorHandler, notifySuccess, notifyError, onNotHelmRepositoryFound, navigation, setNamespacedItemFromRoute } = useHelmRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": HelmRepositorySimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotHelmRepositoryFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(HelmRepositoryDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdHelmRepositoryQuery from '@/queries/fluxcd/HelmRepository.read.graphql'
import HelmRepositoryEdit from '@/queries/fluxcd/HelmRepository.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useHelmRepository, sanitizeData, getProperties } from '../../../libs/fluxcd/HelmRepository.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotHelmRepositoryFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useHelmRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdHelmRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchHelmRepository, onDone: onPatchHelmRepository, onError: onPatchError } = useMutation(HelmRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchHelmRepository({ "namespace": result.value.fluxcdHelmRepository.metadata.namespace, "name": result.value.fluxcdHelmRepository.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotHelmRepositoryFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdHelmRepository.metadata.obj.spec})});onPatchHelmRepository(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdHelmRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
      <fluxcdHelmRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div><div class="col-md-6">
      <fluxcdHelmRepositoryView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdHelmRepository[0]!=undefined && result.k8sNamespace[0].fluxcdHelmRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdHelmRepository[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdHelmRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmRepository</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdHelmRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdHelmRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdHelmRepository!=null && result.k8sNamespace[0].fluxcdHelmRepository.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdHelmRepository.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdHelmRepository!=null" class="q-ma-sm">
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