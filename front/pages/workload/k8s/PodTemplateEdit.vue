<script setup lang="ts">
import k8sPodTemplateQuery from '@/queries/k8s/PodTemplate.read.graphql'
import PodTemplateEdit from '@/queries/k8s/PodTemplate.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sPodTemplateMeta from '@/components/k8s/PodTemplateMeta.vue';
import k8sPodTemplateEdit from '@/components/k8s/PodTemplateEdit.vue';
import { useQuery, useMutation, sanitizeData, usePodTemplate, PodTemplateSimpleExcludes } from '../../../libs/k8s/PodTemplate.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPodTemplateFound, navigation, editor, setNamespacedItemFromRoute } = usePodTemplate();setNamespacedItemFromRoute();
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
});
const { mutate: patchPodTemplate, onDone: onPatchPodTemplate, onError: onPatchError } = useMutation(PodTemplateEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPodTemplate({
    "name": result.k8sNamespace[0].k8sPodTemplate[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sPodTemplate[0].metadata.namespace,
    "template": sanitizeData(editor.value.obj['template']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPodTemplateFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sPodTemplate[0])});onPatchPodTemplate(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPodTemplateMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null"
        :model="result.k8sNamespace[0].k8sPodTemplate[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sPodTemplateEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPodTemplate[0]!=undefined && result.k8sNamespace[0].k8sPodTemplate[0]!=null"
        :model="result.k8sNamespace[0].k8sPodTemplate[0]"
       />
    </div>
  </div>
</template>

