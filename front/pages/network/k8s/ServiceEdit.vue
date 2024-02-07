<script setup lang="ts">
import k8sServiceQuery from '@/queries/k8s/Service.read.graphql'
import ServiceEdit from '@/queries/k8s/Service.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sServiceMeta from '@/components/k8s/ServiceMeta.vue';
import k8sServiceEdit from '@/components/k8s/ServiceEdit.vue';
import k8sServiceStatus from '@/components/k8s/ServiceStatus.vue';
import { useQuery, useMutation, sanitizeData, useService, ServiceSimpleExcludes } from '../../../libs/k8s/Service.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotServiceFound, navigation, editor, setNamespacedItemFromRoute } = useService();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceSimpleExcludes
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
const { mutate: patchService, onDone: onPatchService, onError: onPatchError } = useMutation(ServiceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchService({
    "name": result.k8sNamespace[0].k8sService[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sService[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotServiceFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sService[0])});onPatchService(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sServiceStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sServiceEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
    </div>
  </div>
</template>

