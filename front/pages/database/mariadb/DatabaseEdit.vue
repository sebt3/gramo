<script setup lang="ts">
import mariadbDatabaseQuery from '@/queries/mariadb/Database.read.graphql'
import DatabaseEdit from '@/queries/mariadb/Database.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbDatabaseMeta from '@/components/mariadb/DatabaseMeta.vue';
import mariadbDatabaseEdit from '@/components/mariadb/DatabaseEdit.vue';
import mariadbDatabaseStatus from '@/components/mariadb/DatabaseStatus.vue';
import { useQuery, useMutation, sanitizeData, useDatabase, DatabaseSimpleExcludes } from '../../../libs/mariadb/Database.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotDatabaseFound, navigation, editor, setNamespacedItemFromRoute } = useDatabase();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbDatabaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DatabaseSimpleExcludes
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
const { mutate: patchDatabase, onDone: onPatchDatabase, onError: onPatchError } = useMutation(DatabaseEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDatabase({
    "name": result.k8sNamespace[0].mariadbDatabase[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbDatabase[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotDatabaseFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbDatabase[0])});onPatchDatabase(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbDatabaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbDatabaseStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbDatabaseEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div>
  </div>
</template>

