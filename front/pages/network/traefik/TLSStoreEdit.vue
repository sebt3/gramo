<script setup lang="ts">
import traefikTLSStoreQuery from '@/queries/traefik/TLSStore.read.graphql'
import TLSStoreEdit from '@/queries/traefik/TLSStore.patch.graphql'
import traefikTLSStoreMeta from '@/components/traefik/TLSStoreMeta.vue';
import traefikTLSStoreEdit from '@/components/traefik/TLSStoreEdit.vue';
import { useQuery, useMutation, useTLSStore, TLSStoreSimpleExcludes } from '../../../libs/traefik/TLSStore.js'
const { onErrorHandler, notifySuccess, notifyError, onNotTLSStoreFound, navigation, setNamespacedItemFromRoute } = useTLSStore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSStoreQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TLSStoreSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotTLSStoreFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TLSStoreDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import traefikTLSStoreQuery from '@/queries/traefik/TLSStore.read.graphql'
import TLSStoreEdit from '@/queries/traefik/TLSStore.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useTLSStore, sanitizeData, getProperties } from '../../../libs/traefik/TLSStore.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotTLSStoreFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useTLSStore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSStoreQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchTLSStore, onDone: onPatchTLSStore, onError: onPatchError } = useMutation(TLSStoreEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchTLSStore({ "namespace": result.value.traefikTLSStore.metadata.namespace, "name": result.value.traefikTLSStore.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotTLSStoreFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.traefikTLSStore.metadata.obj.spec})});onPatchTLSStore(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikTLSStoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSStore[0]!=undefined && result.k8sNamespace[0].traefikTLSStore[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSStore[0]"
       />
    </div><div class="col-md-6">
      <traefikTLSStoreView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSStore[0]!=undefined && result.k8sNamespace[0].traefikTLSStore[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSStore[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].traefikTLSStore!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">TLSStore</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].traefikTLSStore.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].traefikTLSStore!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].traefikTLSStore!=null && result.k8sNamespace[0].traefikTLSStore.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].traefikTLSStore.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].traefikTLSStore!=null" class="q-ma-sm">
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