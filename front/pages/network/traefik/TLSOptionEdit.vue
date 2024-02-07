<script setup lang="ts">
import traefikTLSOptionQuery from '@/queries/traefik/TLSOption.read.graphql'
import TLSOptionEdit from '@/queries/traefik/TLSOption.patch.graphql'
import traefikTLSOptionMeta from '@/components/traefik/TLSOptionMeta.vue';
import traefikTLSOptionEdit from '@/components/traefik/TLSOptionEdit.vue';
import { useQuery, useMutation, useTLSOption, TLSOptionSimpleExcludes } from '../../../libs/traefik/TLSOption.js'
const { onErrorHandler, notifySuccess, notifyError, onNotTLSOptionFound, navigation, setNamespacedItemFromRoute } = useTLSOption();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSOptionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TLSOptionSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotTLSOptionFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(TLSOptionDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import traefikTLSOptionQuery from '@/queries/traefik/TLSOption.read.graphql'
import TLSOptionEdit from '@/queries/traefik/TLSOption.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useTLSOption, sanitizeData, getProperties } from '../../../libs/traefik/TLSOption.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotTLSOptionFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useTLSOption();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSOptionQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchTLSOption, onDone: onPatchTLSOption, onError: onPatchError } = useMutation(TLSOptionEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchTLSOption({ "namespace": result.value.traefikTLSOption.metadata.namespace, "name": result.value.traefikTLSOption.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotTLSOptionFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.traefikTLSOption.metadata.obj.spec})});onPatchTLSOption(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikTLSOptionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSOption[0]!=undefined && result.k8sNamespace[0].traefikTLSOption[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSOption[0]"
       />
    </div><div class="col-md-6">
      <traefikTLSOptionView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSOption[0]!=undefined && result.k8sNamespace[0].traefikTLSOption[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSOption[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].traefikTLSOption!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">TLSOption</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].traefikTLSOption.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].traefikTLSOption!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].traefikTLSOption!=null && result.k8sNamespace[0].traefikTLSOption.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].traefikTLSOption.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].traefikTLSOption!=null" class="q-ma-sm">
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