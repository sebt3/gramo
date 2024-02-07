<script setup lang="ts">
import k8sIngressQuery from '@/queries/k8s/Ingress.read.graphql'
import IngressEdit from '@/queries/k8s/Ingress.patch.graphql'
import k8sIngressMeta from '@/components/k8s/IngressMeta.vue';
import k8sIngressEdit from '@/components/k8s/IngressEdit.vue';
import k8sIngressStatus from '@/components/k8s/IngressStatus.vue';
import { useQuery, useMutation, useIngress, IngressSimpleExcludes } from '../../../libs/k8s/Ingress.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIngressFound, navigation, setNamespacedItemFromRoute } = useIngress();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sIngressQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IngressSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotIngressFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IngressDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sIngressQuery from '@/queries/k8s/Ingress.read.graphql'
import IngressEdit from '@/queries/k8s/Ingress.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useIngress, sanitizeData, getProperties } from '../../../libs/k8s/Ingress.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotIngressFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useIngress();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sIngressQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIngress, onDone: onPatchIngress, onError: onPatchError } = useMutation(IngressEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIngress({ "namespace": result.value.k8sIngress.metadata.namespace, "name": result.value.k8sIngress.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotIngressFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sIngress.metadata.obj.spec})});onPatchIngress(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sIngressMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
      <k8sIngressStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div><div class="col-md-6">
      <k8sIngressView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sIngress[0]!=undefined && result.k8sNamespace[0].k8sIngress[0]!=null"
        :model="result.k8sNamespace[0].k8sIngress[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sIngress!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Ingress</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sIngress.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sIngress!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sIngress!=null && result.k8sNamespace[0].k8sIngress.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sIngress.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sIngress!=null" class="q-ma-sm">
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