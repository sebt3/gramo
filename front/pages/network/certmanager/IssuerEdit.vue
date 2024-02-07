<script setup lang="ts">
import certmanagerIssuerQuery from '@/queries/certmanager/Issuer.read.graphql'
import IssuerEdit from '@/queries/certmanager/Issuer.patch.graphql'
import certmanagerIssuerMeta from '@/components/certmanager/IssuerMeta.vue';
import certmanagerIssuerEdit from '@/components/certmanager/IssuerEdit.vue';
import certmanagerIssuerStatus from '@/components/certmanager/IssuerStatus.vue';
import { useQuery, useMutation, useIssuer, IssuerSimpleExcludes } from '../../../libs/certmanager/Issuer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIssuerFound, navigation, setNamespacedItemFromRoute } = useIssuer();setNamespacedItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotIssuerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IssuerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import certmanagerIssuerQuery from '@/queries/certmanager/Issuer.read.graphql'
import IssuerEdit from '@/queries/certmanager/Issuer.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useIssuer, sanitizeData, getProperties } from '../../../libs/certmanager/Issuer.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotIssuerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useIssuer();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerIssuerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIssuer, onDone: onPatchIssuer, onError: onPatchError } = useMutation(IssuerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIssuer({ "namespace": result.value.certmanagerIssuer.metadata.namespace, "name": result.value.certmanagerIssuer.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotIssuerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.certmanagerIssuer.metadata.obj.spec})});onPatchIssuer(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerIssuerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
      <certmanagerIssuerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div><div class="col-md-6">
      <certmanagerIssuerView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerIssuer[0]!=undefined && result.k8sNamespace[0].certmanagerIssuer[0]!=null"
        :model="result.k8sNamespace[0].certmanagerIssuer[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].certmanagerIssuer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Issuer</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].certmanagerIssuer.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].certmanagerIssuer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].certmanagerIssuer!=null && result.k8sNamespace[0].certmanagerIssuer.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].certmanagerIssuer.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].certmanagerIssuer!=null" class="q-ma-sm">
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