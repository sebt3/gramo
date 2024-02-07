<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDB.read.graphql'
import MariaDBEdit from '@/queries/mariadb/MariaDB.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbMariaDBMeta from '@/components/mariadb/MariaDBMeta.vue';
import mariadbMariaDBEdit from '@/components/mariadb/MariaDBEdit.vue';
import mariadbMariaDBStatus from '@/components/mariadb/MariaDBStatus.vue';
import { useQuery, useMutation, sanitizeData, useMariaDB, MariaDBSimpleExcludes } from '../../../libs/mariadb/MariaDB.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotMariaDBFound, navigation, editor, setNamespacedItemFromRoute } = useMariaDB();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbMariaDBQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MariaDBSimpleExcludes
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
const { mutate: patchMariaDB, onDone: onPatchMariaDB, onError: onPatchError } = useMutation(MariaDBEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMariaDB({
    "name": result.k8sNamespace[0].mariadbMariaDB[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbMariaDB[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotMariaDBFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbMariaDB[0])});onPatchMariaDB(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbMariaDBMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbMariaDBStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbMariaDBEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div>
  </div>
</template>

