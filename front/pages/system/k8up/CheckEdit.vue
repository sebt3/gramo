<script setup lang="ts">
import k8upCheckQuery from '@/queries/k8up/Check.read.graphql'
import CheckEdit from '@/queries/k8up/Check.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upCheckMeta from '@/components/k8up/CheckMeta.vue';
import k8upCheckEdit from '@/components/k8up/CheckEdit.vue';
import k8upCheckStatus from '@/components/k8up/CheckStatus.vue';
import { useQuery, useMutation, sanitizeData, useCheck, CheckSimpleExcludes } from '../../../libs/k8up/Check.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCheckFound, navigation, editor, setNamespacedItemFromRoute } = useCheck();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upCheckQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CheckSimpleExcludes
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
const { mutate: patchCheck, onDone: onPatchCheck, onError: onPatchError } = useMutation(CheckEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCheck({
    "name": result.k8sNamespace[0].k8upCheck[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upCheck[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCheckFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upCheck[0])});onPatchCheck(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upCheckMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upCheckStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upCheckEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div>
  </div>
</template>

