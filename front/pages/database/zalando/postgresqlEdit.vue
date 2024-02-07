<script setup lang="ts">
import zalandopostgresqlQuery from '@/queries/zalando/postgresql.read.graphql'
import postgresqlEdit from '@/queries/zalando/postgresql.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import zalandopostgresqlMeta from '@/components/zalando/postgresqlMeta.vue';
import zalandopostgresqlEdit from '@/components/zalando/postgresqlEdit.vue';
import zalandopostgresqlStatus from '@/components/zalando/postgresqlStatus.vue';
import { useQuery, useMutation, sanitizeData, usepostgresql, postgresqlSimpleExcludes } from '../../../libs/zalando/postgresql.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotpostgresqlFound, navigation, editor, setNamespacedItemFromRoute } = usepostgresql();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandopostgresqlQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": postgresqlSimpleExcludes
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
const { mutate: patchpostgresql, onDone: onPatchpostgresql, onError: onPatchError } = useMutation(postgresqlEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchpostgresql({
    "name": result.k8sNamespace[0].zalandopostgresql[0].metadata.name,
    "namespace": result.k8sNamespace[0].zalandopostgresql[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotpostgresqlFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].zalandopostgresql[0])});onPatchpostgresql(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <zalandopostgresqlMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandopostgresql[0]!=undefined && result.k8sNamespace[0].zalandopostgresql[0]!=null"
        :model="result.k8sNamespace[0].zalandopostgresql[0]"
       />
    </div>
    <div class="col-md-6">
      <zalandopostgresqlStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandopostgresql[0]!=undefined && result.k8sNamespace[0].zalandopostgresql[0]!=null"
        :model="result.k8sNamespace[0].zalandopostgresql[0]"
       />
    </div>
    <div class="col-md-12">
      <zalandopostgresqlEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandopostgresql[0]!=undefined && result.k8sNamespace[0].zalandopostgresql[0]!=null"
        :model="result.k8sNamespace[0].zalandopostgresql[0]"
       />
    </div>
  </div>
</template>

