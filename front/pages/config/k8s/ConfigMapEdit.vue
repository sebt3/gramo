<script setup lang="ts">
import k8sConfigMapQuery from '@/queries/k8s/ConfigMap.read.graphql'
import ConfigMapEdit from '@/queries/k8s/ConfigMap.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sConfigMapMeta from '@/components/k8s/ConfigMapMeta.vue';
import k8sConfigMapEdit from '@/components/k8s/ConfigMapEdit.vue';
import { useQuery, useMutation, sanitizeData, useConfigMap, ConfigMapSimpleExcludes } from '../../../libs/k8s/ConfigMap.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotConfigMapFound, navigation, editor, setNamespacedItemFromRoute } = useConfigMap();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sConfigMapQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ConfigMapSimpleExcludes
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
const { mutate: patchConfigMap, onDone: onPatchConfigMap, onError: onPatchError } = useMutation(ConfigMapEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchConfigMap({
    "name": result.k8sNamespace[0].k8sConfigMap[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sConfigMap[0].metadata.namespace,
    "binaryData": sanitizeData(editor.value.obj['binaryData']),
    "data": sanitizeData(editor.value.obj['data']),
    "immutable": sanitizeData(editor.value.obj['immutable']),
  });
}
onError(onErrorHandler);onResult(res => {onNotConfigMapFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sConfigMap[0])});onPatchConfigMap(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sConfigMapMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null"
        :model="result.k8sNamespace[0].k8sConfigMap[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sConfigMapEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sConfigMap[0]!=undefined && result.k8sNamespace[0].k8sConfigMap[0]!=null"
        :model="result.k8sNamespace[0].k8sConfigMap[0]"
       />
    </div>
  </div>
</template>

