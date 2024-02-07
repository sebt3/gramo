<script setup lang="ts">
import k8sNamespaceQuery from '@/queries/k8s/Namespace.read.graphql'
import NamespaceEdit from '@/queries/k8s/Namespace.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sNamespaceMeta from '@/components/k8s/NamespaceMeta.vue';
import k8sNamespaceEdit from '@/components/k8s/NamespaceEdit.vue';
import k8sNamespaceStatus from '@/components/k8s/NamespaceStatus.vue';
import { useQuery, useMutation, sanitizeData, useNamespace, NamespaceSimpleExcludes } from '../../../libs/k8s/Namespace.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotNamespaceFound, navigation, editor, setItemFromRoute } = useNamespace();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNamespaceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NamespaceSimpleExcludes
  },
});
const { mutate: patchNamespace, onDone: onPatchNamespace, onError: onPatchError } = useMutation(NamespaceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNamespace({
    "name": result.k8sNamespace[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotNamespaceFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0])});onPatchNamespace(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sNamespaceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace[0]!=undefined && result.k8sNamespace[0]!=null"
        :model="result.k8sNamespace[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sNamespaceStatus
        v-if="!loading && result!=undefined && result.k8sNamespace[0]!=undefined && result.k8sNamespace[0]!=null"
        :model="result.k8sNamespace[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sNamespaceEdit
        v-if="!loading && result!=undefined && result.k8sNamespace[0]!=undefined && result.k8sNamespace[0]!=null"
        :model="result.k8sNamespace[0]"
       />
    </div>
  </div>
</template>

