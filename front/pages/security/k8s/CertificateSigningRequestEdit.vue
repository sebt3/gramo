<script setup lang="ts">
import k8sCertificateSigningRequestQuery from '@/queries/k8s/CertificateSigningRequest.read.graphql'
import CertificateSigningRequestEdit from '@/queries/k8s/CertificateSigningRequest.patch.graphql'
import k8sCertificateSigningRequestMeta from '@/components/k8s/CertificateSigningRequestMeta.vue';
import k8sCertificateSigningRequestEdit from '@/components/k8s/CertificateSigningRequestEdit.vue';
import k8sCertificateSigningRequestStatus from '@/components/k8s/CertificateSigningRequestStatus.vue';
import { useQuery, useMutation, useCertificateSigningRequest, CertificateSigningRequestSimpleExcludes } from '../../../libs/k8s/CertificateSigningRequest.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCertificateSigningRequestFound, navigation, setItemFromRoute } = useCertificateSigningRequest();setItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotCertificateSigningRequestFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CertificateSigningRequestDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sCertificateSigningRequestQuery from '@/queries/k8s/CertificateSigningRequest.read.graphql'
import CertificateSigningRequestEdit from '@/queries/k8s/CertificateSigningRequest.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCertificateSigningRequest, sanitizeData, getProperties } from '../../../libs/k8s/CertificateSigningRequest.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotCertificateSigningRequestFound, setItemFromRoute, navigation, onErrorHandler } = useCertificateSigningRequest();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCertificateSigningRequestQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCertificateSigningRequest, onDone: onPatchCertificateSigningRequest, onError: onPatchError } = useMutation(CertificateSigningRequestEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCertificateSigningRequest({ "name": result.value.k8sCertificateSigningRequest.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotCertificateSigningRequestFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sCertificateSigningRequest.metadata.obj.spec})});onPatchCertificateSigningRequest(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCertificateSigningRequestMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
      <k8sCertificateSigningRequestStatus
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div><div class="col-md-6">
      <k8sCertificateSigningRequestView
        v-if="!loading && result!=undefined && result.k8sCertificateSigningRequest[0]!=undefined && result.k8sCertificateSigningRequest[0]!=null"
        :model="result.k8sCertificateSigningRequest[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sCertificateSigningRequest!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CertificateSigningRequest</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sCertificateSigningRequest.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sCertificateSigningRequest!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sCertificateSigningRequest!=null && result.k8sCertificateSigningRequest.status != null">
          <DefaultStatusView :status="result.k8sCertificateSigningRequest.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sCertificateSigningRequest!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{ spec=v;editor.setspecSpec({ spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlspec" :key="editor.yamlspec"
          @update:text="v=>editor.setspecYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>