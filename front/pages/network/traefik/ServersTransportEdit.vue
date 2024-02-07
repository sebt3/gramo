<script setup lang="ts">
import traefikServersTransportQuery from '@/queries/traefik/ServersTransport.read.graphql'
import ServersTransportEdit from '@/queries/traefik/ServersTransport.patch.graphql'
import traefikServersTransportMeta from '@/components/traefik/ServersTransportMeta.vue';
import traefikServersTransportEdit from '@/components/traefik/ServersTransportEdit.vue';
import { useQuery, useMutation, useServersTransport, ServersTransportSimpleExcludes } from '../../../libs/traefik/ServersTransport.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServersTransportFound, navigation, setNamespacedItemFromRoute } = useServersTransport();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikServersTransportQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServersTransportSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotServersTransportFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServersTransportDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import traefikServersTransportQuery from '@/queries/traefik/ServersTransport.read.graphql'
import ServersTransportEdit from '@/queries/traefik/ServersTransport.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useServersTransport, sanitizeData, getProperties } from '../../../libs/traefik/ServersTransport.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotServersTransportFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useServersTransport();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikServersTransportQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchServersTransport, onDone: onPatchServersTransport, onError: onPatchError } = useMutation(ServersTransportEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServersTransport({ "namespace": result.value.traefikServersTransport.metadata.namespace, "name": result.value.traefikServersTransport.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotServersTransportFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.traefikServersTransport.metadata.obj.spec})});onPatchServersTransport(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikServersTransportMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikServersTransport[0]!=undefined && result.k8sNamespace[0].traefikServersTransport[0]!=null"
        :model="result.k8sNamespace[0].traefikServersTransport[0]"
       />
    </div><div class="col-md-6">
      <traefikServersTransportView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikServersTransport[0]!=undefined && result.k8sNamespace[0].traefikServersTransport[0]!=null"
        :model="result.k8sNamespace[0].traefikServersTransport[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].traefikServersTransport!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServersTransport</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].traefikServersTransport.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].traefikServersTransport!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].traefikServersTransport!=null && result.k8sNamespace[0].traefikServersTransport.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].traefikServersTransport.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].traefikServersTransport!=null" class="q-ma-sm">
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