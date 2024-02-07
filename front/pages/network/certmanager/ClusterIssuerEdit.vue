<script setup lang="ts">
import certmanagerClusterIssuerQuery from '@/queries/certmanager/ClusterIssuer.read.graphql'
import ClusterIssuerEdit from '@/queries/certmanager/ClusterIssuer.patch.graphql'
import certmanagerClusterIssuerMeta from '@/components/certmanager/ClusterIssuerMeta.vue';
import certmanagerClusterIssuerEdit from '@/components/certmanager/ClusterIssuerEdit.vue';
import certmanagerClusterIssuerStatus from '@/components/certmanager/ClusterIssuerStatus.vue';
import { useQuery, useMutation, useClusterIssuer, ClusterIssuerSimpleExcludes } from '../../../libs/certmanager/ClusterIssuer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterIssuerFound, navigation, setItemFromRoute } = useClusterIssuer();setItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotClusterIssuerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterIssuerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import certmanagerClusterIssuerQuery from '@/queries/certmanager/ClusterIssuer.read.graphql'
import ClusterIssuerEdit from '@/queries/certmanager/ClusterIssuer.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useClusterIssuer, sanitizeData, getProperties } from '../../../libs/certmanager/ClusterIssuer.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotClusterIssuerFound, setItemFromRoute, navigation, onErrorHandler } = useClusterIssuer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerClusterIssuerQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchClusterIssuer, onDone: onPatchClusterIssuer, onError: onPatchError } = useMutation(ClusterIssuerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterIssuer({ "name": result.value.certmanagerClusterIssuer.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotClusterIssuerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.certmanagerClusterIssuer.metadata.obj.spec})});onPatchClusterIssuer(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerClusterIssuerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
      <certmanagerClusterIssuerStatus
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div><div class="col-md-6">
      <certmanagerClusterIssuerView
        v-if="!loading && result!=undefined && result.certmanagerClusterIssuer[0]!=undefined && result.certmanagerClusterIssuer[0]!=null"
        :model="result.certmanagerClusterIssuer[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.certmanagerClusterIssuer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ClusterIssuer</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.certmanagerClusterIssuer.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.certmanagerClusterIssuer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.certmanagerClusterIssuer!=null && result.certmanagerClusterIssuer.status != null">
          <DefaultStatusView :status="result.certmanagerClusterIssuer.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.certmanagerClusterIssuer!=null" class="q-ma-sm">
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