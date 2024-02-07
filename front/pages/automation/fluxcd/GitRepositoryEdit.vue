<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepository.read.graphql'
import GitRepositoryEdit from '@/queries/fluxcd/GitRepository.patch.graphql'
import fluxcdGitRepositoryMeta from '@/components/fluxcd/GitRepositoryMeta.vue';
import fluxcdGitRepositoryEdit from '@/components/fluxcd/GitRepositoryEdit.vue';
import fluxcdGitRepositoryStatus from '@/components/fluxcd/GitRepositoryStatus.vue';
import { useQuery, useMutation, useGitRepository, GitRepositorySimpleExcludes } from '../../../libs/fluxcd/GitRepository.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGitRepositoryFound, navigation, setNamespacedItemFromRoute } = useGitRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdGitRepositoryQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GitRepositorySimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotGitRepositoryFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GitRepositoryDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdGitRepositoryQuery from '@/queries/fluxcd/GitRepository.read.graphql'
import GitRepositoryEdit from '@/queries/fluxcd/GitRepository.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useGitRepository, sanitizeData, getProperties } from '../../../libs/fluxcd/GitRepository.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotGitRepositoryFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useGitRepository();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdGitRepositoryQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGitRepository, onDone: onPatchGitRepository, onError: onPatchError } = useMutation(GitRepositoryEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGitRepository({ "namespace": result.value.fluxcdGitRepository.metadata.namespace, "name": result.value.fluxcdGitRepository.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotGitRepositoryFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdGitRepository.metadata.obj.spec})});onPatchGitRepository(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdGitRepositoryMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
       />
      <fluxcdGitRepositoryStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
       />
    </div><div class="col-md-6">
      <fluxcdGitRepositoryView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdGitRepository[0]!=undefined && result.k8sNamespace[0].fluxcdGitRepository[0]!=null"
        :model="result.k8sNamespace[0].fluxcdGitRepository[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdGitRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GitRepository</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdGitRepository.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdGitRepository!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdGitRepository!=null && result.k8sNamespace[0].fluxcdGitRepository.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdGitRepository.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdGitRepository!=null" class="q-ma-sm">
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