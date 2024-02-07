<script setup lang="ts">
import cnpgPoolerQuery from '@/queries/cnpg/Pooler.read.graphql'
import PoolerEdit from '@/queries/cnpg/Pooler.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import cnpgPoolerEdit from '@/components/cnpg/PoolerEdit.vue';
import cnpgPoolerStatus from '@/components/cnpg/PoolerStatus.vue';
import { useQuery, useMutation, sanitizeData, usePooler, PoolerSimpleExcludes } from '../../../libs/cnpg/Pooler.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotPoolerFound, navigation, editor, setNamespacedItemFromRoute } = usePooler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgPoolerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PoolerSimpleExcludes
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
const { mutate: patchPooler, onDone: onPatchPooler, onError: onPatchError } = useMutation(PoolerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPooler({
    "name": result.k8sNamespace[0].cnpgPooler[0].metadata.name,
    "namespace": result.k8sNamespace[0].cnpgPooler[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotPoolerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].cnpgPooler[0])});onPatchPooler(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <cnpgPoolerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
    </div>
    <div class="col-md-6">
      <cnpgPoolerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
    </div>
    <div class="col-md-12">
      <cnpgPoolerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
    </div>
  </div>
</template>

