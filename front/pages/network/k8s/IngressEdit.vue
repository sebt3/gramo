<script setup lang="ts">
import k8sIngressQuery from '@/queries/k8s/Ingress.read.graphql'
import IngressEdit from '@/queries/k8s/Ingress.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sIngressMeta from '@/components/k8s/IngressMeta.vue';
import k8sIngressEdit from '@/components/k8s/IngressEdit.vue';
import k8sIngressStatus from '@/components/k8s/IngressStatus.vue';
import { useQuery, useMutation, sanitizeData, useIngress, IngressSimpleExcludes } from '../../../libs/k8s/Ingress.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIngressFound, navigation, editor, setNamespacedItemFromRoute } = useIngress();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sIngressQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressSimpleExcludes
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
const { mutate: patchIngress, onDone: onPatchIngress, onError: onPatchError } = useMutation(IngressEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIngress({
    "name": result.k8sNamespace[0].k8sIngress[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sIngress[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIngressFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sIngress[0])});onPatchIngress(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sIngressMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sIngressStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sIngressEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div>
  </div>
</template>

