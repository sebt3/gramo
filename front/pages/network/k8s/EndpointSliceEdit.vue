<script setup lang="ts">
import k8sEndpointSliceQuery from '@/queries/k8s/EndpointSlice.read.graphql'
import EndpointSliceEdit from '@/queries/k8s/EndpointSlice.patch.graphql'
import k8sEndpointSliceMeta from '@/components/k8s/EndpointSliceMeta.vue';
import k8sEndpointSliceEdit from '@/components/k8s/EndpointSliceEdit.vue';
import { useQuery, useMutation, useEndpointSlice, EndpointSliceSimpleExcludes } from '../../../libs/k8s/EndpointSlice.js'
const { onErrorHandler, notifySuccess, notifyError, onNotEndpointSliceFound, navigation, setNamespacedItemFromRoute } = useEndpointSlice();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointSliceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": EndpointSliceSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotEndpointSliceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(EndpointSliceDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sEndpointSliceQuery from '@/queries/k8s/EndpointSlice.read.graphql'
import EndpointSliceEdit from '@/queries/k8s/EndpointSlice.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useEndpointSlice, sanitizeData, getProperties } from '../../../libs/k8s/EndpointSlice.js'
const addressType  = ref({});
const endpoints  = ref({});
const ports  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotEndpointSliceFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useEndpointSlice();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sEndpointSliceQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchEndpointSlice, onDone: onPatchEndpointSlice, onError: onPatchError } = useMutation(EndpointSliceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchEndpointSlice({ "namespace": result.value.k8sEndpointSlice.metadata.namespace, "name": result.value.k8sEndpointSlice.metadata.name, "addressType": sanitizeData(addressType.value), "endpoints": sanitizeData(endpoints.value), "ports": sanitizeData(ports.value) });
}
onError(onErrorHandler);onResult(res => {onNotEndpointSliceFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sEndpointSlice.metadata.obj.spec})});onPatchEndpointSlice(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sEndpointSliceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0]"
       />
      <k8sServiceMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null && result.k8sNamespace[0].k8sEndpointSlice[0].parentService!=null && result.k8sNamespace[0].k8sEndpointSlice[0].parentService.length>0"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0].parentService[0]"
       />
    </div><div class="col-md-6">
      <k8sEndpointSliceView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sEndpointSlice[0]!=undefined && result.k8sNamespace[0].k8sEndpointSlice[0]!=null"
        :model="result.k8sNamespace[0].k8sEndpointSlice[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sEndpointSlice!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">EndpointSlice</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sEndpointSlice.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sEndpointSlice!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sEndpointSlice!=null && result.k8sNamespace[0].k8sEndpointSlice.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sEndpointSlice.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sEndpointSlice!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.addressType).includes('addressType')?editor.addressType['addressType']:{}"
          @update:out="v=>{ addressType=v;editor.setaddressTypeSpec({ addressType: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.endpoints).includes('endpoints')?editor.endpoints['endpoints']:{}"
          @update:out="v=>{ endpoints=v;editor.setendpointsSpec({ endpoints: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.ports).includes('ports')?editor.ports['ports']:{}"
          @update:out="v=>{ ports=v;editor.setportsSpec({ ports: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamladdressType" :key="editor.yamladdressType"
          @update:text="v=>editor.setaddressTypeYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlendpoints" :key="editor.yamlendpoints"
          @update:text="v=>editor.setendpointsYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlports" :key="editor.yamlports"
          @update:text="v=>editor.setportsYaml(v)"
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