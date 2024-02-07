<script setup lang="ts">
import k8sResourceQuotaQuery from '@/queries/k8s/ResourceQuota.read.graphql'
import ResourceQuotaEdit from '@/queries/k8s/ResourceQuota.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sResourceQuotaMeta from '@/components/k8s/ResourceQuotaMeta.vue';
import k8sResourceQuotaEdit from '@/components/k8s/ResourceQuotaEdit.vue';
import k8sResourceQuotaStatus from '@/components/k8s/ResourceQuotaStatus.vue';
import { useQuery, useMutation, sanitizeData, useResourceQuota, ResourceQuotaSimpleExcludes } from '../../../libs/k8s/ResourceQuota.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotResourceQuotaFound, navigation, editor, setNamespacedItemFromRoute } = useResourceQuota();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sResourceQuotaQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ResourceQuotaSimpleExcludes
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
const { mutate: patchResourceQuota, onDone: onPatchResourceQuota, onError: onPatchError } = useMutation(ResourceQuotaEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchResourceQuota({
    "name": result.k8sNamespace[0].k8sResourceQuota[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sResourceQuota[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotResourceQuotaFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sResourceQuota[0])});onPatchResourceQuota(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sResourceQuotaMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sResourceQuotaStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sResourceQuotaEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div>
  </div>
</template>

