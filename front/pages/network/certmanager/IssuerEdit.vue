<script setup lang="ts">
import certmanagerIssuerQuery from '@/queries/certmanager/Issuer.read.graphql'
import IssuerEdit from '@/queries/certmanager/Issuer.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import certmanagerIssuerMeta from '@/components/certmanager/IssuerMeta.vue';
import certmanagerIssuerEdit from '@/components/certmanager/IssuerEdit.vue';
import certmanagerIssuerStatus from '@/components/certmanager/IssuerStatus.vue';
import { useQuery, useMutation, sanitizeData, useIssuer, IssuerSimpleExcludes } from '../../../libs/certmanager/Issuer.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotIssuerFound, navigation, editor, setNamespacedItemFromRoute } = useIssuer();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerIssuerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IssuerSimpleExcludes
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
const { mutate: patchIssuer, onDone: onPatchIssuer, onError: onPatchError } = useMutation(IssuerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIssuer({
    "name": result.k8sNamespace[0].certmanagerIssuer[0].metadata.name,
    "namespace": result.k8sNamespace[0].certmanagerIssuer[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotIssuerFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].certmanagerIssuer[0])});onPatchIssuer(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerIssuerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerIssuerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerIssuerEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div>
  </div>
</template>

