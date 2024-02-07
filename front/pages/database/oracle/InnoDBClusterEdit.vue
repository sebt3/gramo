<script setup lang="ts">
import oracleInnoDBClusterQuery from '@/queries/oracle/InnoDBCluster.read.graphql'
import InnoDBClusterEdit from '@/queries/oracle/InnoDBCluster.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import oracleInnoDBClusterMeta from '@/components/oracle/InnoDBClusterMeta.vue';
import oracleInnoDBClusterEdit from '@/components/oracle/InnoDBClusterEdit.vue';
import oracleInnoDBClusterStatus from '@/components/oracle/InnoDBClusterStatus.vue';
import { useQuery, useMutation, sanitizeData, useInnoDBCluster, InnoDBClusterSimpleExcludes } from '../../../libs/oracle/InnoDBCluster.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotInnoDBClusterFound, navigation, editor, setNamespacedItemFromRoute } = useInnoDBCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(oracleInnoDBClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InnoDBClusterSimpleExcludes
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
const { mutate: patchInnoDBCluster, onDone: onPatchInnoDBCluster, onError: onPatchError } = useMutation(InnoDBClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchInnoDBCluster({
    "name": result.k8sNamespace[0].oracleInnoDBCluster[0].metadata.name,
    "namespace": result.k8sNamespace[0].oracleInnoDBCluster[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotInnoDBClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].oracleInnoDBCluster[0])});onPatchInnoDBCluster(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <oracleInnoDBClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleInnoDBCluster[0]!=undefined && result.k8sNamespace[0].oracleInnoDBCluster[0]!=null"
        :model="result.k8sNamespace[0].oracleInnoDBCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <oracleInnoDBClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleInnoDBCluster[0]!=undefined && result.k8sNamespace[0].oracleInnoDBCluster[0]!=null"
        :model="result.k8sNamespace[0].oracleInnoDBCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <oracleInnoDBClusterEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].oracleInnoDBCluster[0]!=undefined && result.k8sNamespace[0].oracleInnoDBCluster[0]!=null"
        :model="result.k8sNamespace[0].oracleInnoDBCluster[0]"
       />
    </div>
  </div>
</template>

