<script setup lang="ts">
import fluxcdProviderQuery from '@/queries/fluxcd/Provider.read.graphql'
import ProviderEdit from '@/queries/fluxcd/Provider.patch.graphql'
import fluxcdProviderMeta from '@/components/fluxcd/ProviderMeta.vue';
import fluxcdProviderEdit from '@/components/fluxcd/ProviderEdit.vue';
import fluxcdProviderStatus from '@/components/fluxcd/ProviderStatus.vue';
import { useQuery, useMutation, useProvider, ProviderSimpleExcludes } from '../../../libs/fluxcd/Provider.js'
const { onErrorHandler, notifySuccess, notifyError, onNotProviderFound, navigation, setNamespacedItemFromRoute } = useProvider();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdProviderQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ProviderSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotProviderFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ProviderDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdProviderQuery from '@/queries/fluxcd/Provider.read.graphql'
import ProviderEdit from '@/queries/fluxcd/Provider.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useProvider, sanitizeData, getProperties } from '../../../libs/fluxcd/Provider.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotProviderFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useProvider();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdProviderQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchProvider, onDone: onPatchProvider, onError: onPatchError } = useMutation(ProviderEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchProvider({ "namespace": result.value.fluxcdProvider.metadata.namespace, "name": result.value.fluxcdProvider.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotProviderFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdProvider.metadata.obj.spec})});onPatchProvider(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdProviderMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
      <fluxcdProviderStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div><div class="col-md-6">
      <fluxcdProviderView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdProvider!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Provider</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdProvider.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdProvider!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdProvider!=null && result.k8sNamespace[0].fluxcdProvider.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdProvider.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdProvider!=null" class="q-ma-sm">
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