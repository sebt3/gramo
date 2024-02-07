<script setup lang="ts">
import k8sDeploymentQuery from '@/queries/k8s/Deployment.read.graphql'
import DeploymentEdit from '@/queries/k8s/Deployment.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sDeploymentMeta from '@/components/k8s/DeploymentMeta.vue';
import k8sDeploymentEdit from '@/components/k8s/DeploymentEdit.vue';
import k8sDeploymentStatus from '@/components/k8s/DeploymentStatus.vue';
import { useQuery, useMutation, sanitizeData, useDeployment, DeploymentSimpleExcludes } from '../../../libs/k8s/Deployment.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotDeploymentFound, navigation, editor, setNamespacedItemFromRoute } = useDeployment();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDeploymentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DeploymentSimpleExcludes
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
const { mutate: patchDeployment, onDone: onPatchDeployment, onError: onPatchError } = useMutation(DeploymentEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDeployment({
    "name": result.k8sNamespace[0].k8sDeployment[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sDeployment[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotDeploymentFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sDeployment[0])});onPatchDeployment(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sDeploymentMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null"
        :model="result.k8sNamespace[0].k8sDeployment[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sDeploymentStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null"
        :model="result.k8sNamespace[0].k8sDeployment[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sDeploymentEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null"
        :model="result.k8sNamespace[0].k8sDeployment[0]"
       />
    </div>
  </div>
</template>

