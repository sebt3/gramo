<script setup lang="ts">
import k8sCustomResourceDefinitionQuery from '@/queries/k8s/CustomResourceDefinition.read.graphql'
import CustomResourceDefinitionEdit from '@/queries/k8s/CustomResourceDefinition.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sCustomResourceDefinitionMeta from '@/components/k8s/CustomResourceDefinitionMeta.vue';
import k8sCustomResourceDefinitionEdit from '@/components/k8s/CustomResourceDefinitionEdit.vue';
import k8sCustomResourceDefinitionStatus from '@/components/k8s/CustomResourceDefinitionStatus.vue';
import { useQuery, useMutation, sanitizeData, useCustomResourceDefinition, CustomResourceDefinitionSimpleExcludes } from '../../../libs/k8s/CustomResourceDefinition.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCustomResourceDefinitionFound, navigation, editor, setItemFromRoute } = useCustomResourceDefinition();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCustomResourceDefinitionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CustomResourceDefinitionSimpleExcludes
  },
});
const { mutate: patchCustomResourceDefinition, onDone: onPatchCustomResourceDefinition, onError: onPatchError } = useMutation(CustomResourceDefinitionEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCustomResourceDefinition({
    "name": result.k8sCustomResourceDefinition[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCustomResourceDefinitionFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sCustomResourceDefinition[0])});onPatchCustomResourceDefinition(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCustomResourceDefinitionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null"
        :model="result.k8sCustomResourceDefinition[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sCustomResourceDefinitionStatus
        v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null"
        :model="result.k8sCustomResourceDefinition[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCustomResourceDefinitionEdit
        v-if="!loading && result!=undefined && result.k8sCustomResourceDefinition[0]!=undefined && result.k8sCustomResourceDefinition[0]!=null"
        :model="result.k8sCustomResourceDefinition[0]"
       />
    </div>
  </div>
</template>

