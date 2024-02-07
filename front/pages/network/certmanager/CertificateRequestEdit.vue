<script setup lang="ts">
import certmanagerCertificateRequestQuery from '@/queries/certmanager/CertificateRequest.read.graphql'
import CertificateRequestEdit from '@/queries/certmanager/CertificateRequest.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import certmanagerCertificateRequestMeta from '@/components/certmanager/CertificateRequestMeta.vue';
import certmanagerCertificateRequestEdit from '@/components/certmanager/CertificateRequestEdit.vue';
import certmanagerCertificateRequestStatus from '@/components/certmanager/CertificateRequestStatus.vue';
import { useQuery, useMutation, sanitizeData, useCertificateRequest, CertificateRequestSimpleExcludes } from '../../../libs/certmanager/CertificateRequest.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCertificateRequestFound, navigation, editor, setNamespacedItemFromRoute } = useCertificateRequest();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerCertificateRequestQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CertificateRequestSimpleExcludes
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
const { mutate: patchCertificateRequest, onDone: onPatchCertificateRequest, onError: onPatchError } = useMutation(CertificateRequestEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCertificateRequest({
    "name": result.k8sNamespace[0].certmanagerCertificateRequest[0].metadata.name,
    "namespace": result.k8sNamespace[0].certmanagerCertificateRequest[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCertificateRequestFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].certmanagerCertificateRequest[0])});onPatchCertificateRequest(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerCertificateRequestMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=undefined && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificateRequest[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerCertificateRequestStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=undefined && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificateRequest[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerCertificateRequestEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=undefined && result.k8sNamespace[0].certmanagerCertificateRequest[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificateRequest[0]"
       />
    </div>
  </div>
</template>

