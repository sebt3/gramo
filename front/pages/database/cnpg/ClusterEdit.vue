<script setup lang="ts">
import cnpgClusterQuery from '@/queries/cnpg/Cluster.read.graphql'
import ClusterEdit from '@/queries/cnpg/Cluster.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import cnpgClusterEdit from '@/components/cnpg/ClusterEdit.vue';
import cnpgClusterStatus from '@/components/cnpg/ClusterStatus.vue';
import { useQuery, useMutation, sanitizeData, useCluster, ClusterSimpleExcludes } from '../../../libs/cnpg/Cluster.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotClusterFound, navigation, editor, setNamespacedItemFromRoute } = useCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterSimpleExcludes
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
const { mutate: patchCluster, onDone: onPatchCluster, onError: onPatchError } = useMutation(ClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCluster({
    "name": result.k8sNamespace[0].cnpgCluster[0].metadata.name,
    "namespace": result.k8sNamespace[0].cnpgCluster[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].cnpgCluster[0])});onPatchCluster(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <cnpgClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <cnpgClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <cnpgClusterEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
    </div>
  </div>
</template>

