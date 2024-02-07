<script setup lang="ts">
import certmanagerCertificateQuery from '@/queries/certmanager/Certificate.read.graphql'
import CertificateEdit from '@/queries/certmanager/Certificate.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import certmanagerCertificateMeta from '@/components/certmanager/CertificateMeta.vue';
import certmanagerCertificateEdit from '@/components/certmanager/CertificateEdit.vue';
import certmanagerCertificateStatus from '@/components/certmanager/CertificateStatus.vue';
import { useQuery, useMutation, sanitizeData, useCertificate, CertificateSimpleExcludes } from '../../../libs/certmanager/Certificate.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCertificateFound, navigation, editor, setNamespacedItemFromRoute } = useCertificate();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerCertificateQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CertificateSimpleExcludes
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
const { mutate: patchCertificate, onDone: onPatchCertificate, onError: onPatchError } = useMutation(CertificateEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCertificate({
    "name": result.k8sNamespace[0].certmanagerCertificate[0].metadata.name,
    "namespace": result.k8sNamespace[0].certmanagerCertificate[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCertificateFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].certmanagerCertificate[0])});onPatchCertificate(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerCertificateMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificate[0]!=undefined && result.k8sNamespace[0].certmanagerCertificate[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificate[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerCertificateStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificate[0]!=undefined && result.k8sNamespace[0].certmanagerCertificate[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificate[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerCertificateEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerCertificate[0]!=undefined && result.k8sNamespace[0].certmanagerCertificate[0]!=null"
        :model="result.k8sNamespace[0].certmanagerCertificate[0]"
       />
    </div>
  </div>
</template>

