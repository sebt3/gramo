<script setup lang="ts">
import mariadbConnectionQuery from '@/queries/mariadb/Connection.read.graphql'
import ConnectionEdit from '@/queries/mariadb/Connection.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbConnectionMeta from '@/components/mariadb/ConnectionMeta.vue';
import mariadbConnectionEdit from '@/components/mariadb/ConnectionEdit.vue';
import mariadbConnectionStatus from '@/components/mariadb/ConnectionStatus.vue';
import { useQuery, useMutation, sanitizeData, useConnection, ConnectionSimpleExcludes } from '../../../libs/mariadb/Connection.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotConnectionFound, navigation, editor, setNamespacedItemFromRoute } = useConnection();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbConnectionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ConnectionSimpleExcludes
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
const { mutate: patchConnection, onDone: onPatchConnection, onError: onPatchError } = useMutation(ConnectionEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchConnection({
    "name": result.k8sNamespace[0].mariadbConnection[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbConnection[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotConnectionFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbConnection[0])});onPatchConnection(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbConnectionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbConnectionStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbConnectionEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div>
  </div>
</template>

