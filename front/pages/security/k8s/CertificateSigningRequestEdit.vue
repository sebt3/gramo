<script setup lang="ts">
import k8sCertificateSigningRequestQuery from '@/queries/k8s/CertificateSigningRequest.read.graphql'
import CertificateSigningRequestEdit from '@/queries/k8s/CertificateSigningRequest.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sCertificateSigningRequestMeta from '@/components/k8s/CertificateSigningRequestMeta.vue';
import k8sCertificateSigningRequestEdit from '@/components/k8s/CertificateSigningRequestEdit.vue';
import k8sCertificateSigningRequestStatus from '@/components/k8s/CertificateSigningRequestStatus.vue';
import { useQuery, useMutation, sanitizeData, useCertificateSigningRequest, CertificateSigningRequestSimpleExcludes } from '../../../libs/k8s/CertificateSigningRequest.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCertificateSigningRequestFound, navigation, editor, setItemFromRoute } = useCertificateSigningRequest();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCertificateSigningRequestQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CertificateSigningRequestSimpleExcludes
  },
});
const { mutate: patchCertificateSigningRequest, onDone: onPatchCertificateSigningRequest, onError: onPatchError } = useMutation(CertificateSigningRequestEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCertificateSigningRequest({
    "name": result.k8sCertificateSigningRequest[0].metadata.name,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCertificateSigningRequestFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sCertificateSigningRequest[0])});onPatchCertificateSigningRequest(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCertificateSigningRequestMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sCertificateSigningRequestStatus
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCertificateSigningRequestEdit
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div>
  </div>
</template>

