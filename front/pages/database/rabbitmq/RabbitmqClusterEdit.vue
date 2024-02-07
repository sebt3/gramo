<script setup lang="ts">
import rabbitmqRabbitmqClusterQuery from '@/queries/rabbitmq/RabbitmqCluster.read.graphql'
import RabbitmqClusterEdit from '@/queries/rabbitmq/RabbitmqCluster.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import rabbitmqRabbitmqClusterMeta from '@/components/rabbitmq/RabbitmqClusterMeta.vue';
import rabbitmqRabbitmqClusterEdit from '@/components/rabbitmq/RabbitmqClusterEdit.vue';
import rabbitmqRabbitmqClusterStatus from '@/components/rabbitmq/RabbitmqClusterStatus.vue';
import { useQuery, useMutation, sanitizeData, useRabbitmqCluster, RabbitmqClusterSimpleExcludes } from '../../../libs/rabbitmq/RabbitmqCluster.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotRabbitmqClusterFound, navigation, editor, setNamespacedItemFromRoute } = useRabbitmqCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(rabbitmqRabbitmqClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RabbitmqClusterSimpleExcludes
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
const { mutate: patchRabbitmqCluster, onDone: onPatchRabbitmqCluster, onError: onPatchError } = useMutation(RabbitmqClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRabbitmqCluster({
    "name": result.k8sNamespace[0].rabbitmqRabbitmqCluster[0].metadata.name,
    "namespace": result.k8sNamespace[0].rabbitmqRabbitmqCluster[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotRabbitmqClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].rabbitmqRabbitmqCluster[0])});onPatchRabbitmqCluster(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <rabbitmqRabbitmqClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=undefined && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=null"
        :model="result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]"
       />
    </div>
    <div class="col-md-6">
      <rabbitmqRabbitmqClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=undefined && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=null"
        :model="result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]"
       />
    </div>
    <div class="col-md-12">
      <rabbitmqRabbitmqClusterEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=undefined && result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]!=null"
        :model="result.k8sNamespace[0].rabbitmqRabbitmqCluster[0]"
       />
    </div>
  </div>
</template>

