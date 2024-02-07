<script setup lang="ts">
import k8sPodTemplateQuery from '@/queries/k8s/PodTemplate.read.graphql'
import PodTemplateEdit from '@/queries/k8s/PodTemplate.patch.graphql'
import k8sPodTemplateMeta from '@/components/k8s/PodTemplateMeta.vue';
import k8sPodTemplateEdit from '@/components/k8s/PodTemplateEdit.vue';
import { useQuery, useMutation, usePodTemplate, PodTemplateSimpleExcludes } from '../../../libs/k8s/PodTemplate.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodTemplateFound, navigation, setNamespacedItemFromRoute } = usePodTemplate();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodTemplateQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodTemplateSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotPodTemplateFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodTemplateDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sPodTemplateQuery from '@/queries/k8s/PodTemplate.read.graphql'
import PodTemplateEdit from '@/queries/k8s/PodTemplate.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePodTemplate, sanitizeData, getProperties } from '../../../libs/k8s/PodTemplate.js'
const template  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPodTemplateFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePodTemplate();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodTemplateQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPodTemplate, onDone: onPatchPodTemplate, onError: onPatchError } = useMutation(PodTemplateEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPodTemplate({ "namespace": result.value.k8sPodTemplate.metadata.namespace, "name": result.value.k8sPodTemplate.metadata.name, "template": sanitizeData(template.value) });
}
onError(onErrorHandler);onResult(res => {onNotPodTemplateFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sPodTemplate.metadata.obj.spec})});onPatchPodTemplate(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPodTemplateMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null"
        :model="result.k8sNamespace[0].k8sPodTemplate[0]"
       />
    </div><div class="col-md-6">
      <k8sPodTemplateView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null"
        :model="result.k8sNamespace[0].k8sPodTemplate[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPodTemplate!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PodTemplate</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sPodTemplate.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPodTemplate!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sPodTemplate!=null && result.k8sNamespace[0].k8sPodTemplate.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sPodTemplate.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sPodTemplate!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.template).includes('template')?editor.template['template']:{}"
          @update:out="v=>{ template=v;editor.settemplateSpec({ template: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamltemplate" :key="editor.yamltemplate"
          @update:text="v=>editor.settemplateYaml(v)"
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