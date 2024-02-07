<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJob.read.graphql'
import SqlJobEdit from '@/queries/mariadb/SqlJob.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import mariadbSqlJobMeta from '@/components/mariadb/SqlJobMeta.vue';
import mariadbSqlJobEdit from '@/components/mariadb/SqlJobEdit.vue';
import mariadbSqlJobStatus from '@/components/mariadb/SqlJobStatus.vue';
import { useQuery, useMutation, sanitizeData, useSqlJob, SqlJobSimpleExcludes } from '../../../libs/mariadb/SqlJob.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotSqlJobFound, navigation, editor, setNamespacedItemFromRoute } = useSqlJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbSqlJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SqlJobSimpleExcludes
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
const { mutate: patchSqlJob, onDone: onPatchSqlJob, onError: onPatchError } = useMutation(SqlJobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSqlJob({
    "name": result.k8sNamespace[0].mariadbSqlJob[0].metadata.name,
    "namespace": result.k8sNamespace[0].mariadbSqlJob[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotSqlJobFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].mariadbSqlJob[0])});onPatchSqlJob(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbSqlJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbSqlJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbSqlJobEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div>
  </div>
</template>

