<script setup lang="ts">
import certmanagerClusterIssuerQuery from '@/queries/certmanager/ClusterIssuer.read.graphql'
import ClusterIssuerEdit from '@/queries/certmanager/ClusterIssuer.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import certmanagerClusterIssuerMeta from '@/components/certmanager/ClusterIssuerMeta.vue';
import certmanagerClusterIssuerEdit from '@/components/certmanager/ClusterIssuerEdit.vue';
import certmanagerClusterIssuerStatus from '@/components/certmanager/ClusterIssuerStatus.vue';
import { useQuery, useMutation, sanitizeData, useClusterIssuer, ClusterIssuerSimpleExcludes } from '../../../libs/certmanager/ClusterIssuer.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotClusterIssuerFound, navigation, editor, setItemFromRoute } = useClusterIssuer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerClusterIssuerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterIssuerSimpleExcludes
  },
});
const { mutate: patchClusterIssuer, onDone: onPatchClusterIssuer, onError: onPatchError } = useMutation(ClusterIssuerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterIssuer({
    "name": result.certmanagerClusterIssuer[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotClusterIssuerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.certmanagerClusterIssuer[0])});onPatchClusterIssuer(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerClusterIssuerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerClusterIssuerStatus
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerClusterIssuerEdit
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div>
  </div>
</template>

