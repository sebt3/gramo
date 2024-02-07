<script setup lang="ts">
import jaegertracingJaegerQuery from '@/queries/jaegertracing/Jaeger.read.graphql'
import JaegerEdit from '@/queries/jaegertracing/Jaeger.patch.graphql'
import jaegertracingJaegerMeta from '@/components/jaegertracing/JaegerMeta.vue';
import jaegertracingJaegerEdit from '@/components/jaegertracing/JaegerEdit.vue';
import jaegertracingJaegerStatus from '@/components/jaegertracing/JaegerStatus.vue';
import { useQuery, useMutation, useJaeger, JaegerSimpleExcludes } from '../../../libs/jaegertracing/Jaeger.js'
const { onErrorHandler, notifySuccess, notifyError, onNotJaegerFound, navigation, setNamespacedItemFromRoute } = useJaeger();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(jaegertracingJaegerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": JaegerSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotJaegerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(JaegerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import jaegertracingJaegerQuery from '@/queries/jaegertracing/Jaeger.read.graphql'
import JaegerEdit from '@/queries/jaegertracing/Jaeger.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useJaeger, sanitizeData, getProperties } from '../../../libs/jaegertracing/Jaeger.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotJaegerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useJaeger();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(jaegertracingJaegerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchJaeger, onDone: onPatchJaeger, onError: onPatchError } = useMutation(JaegerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchJaeger({ "namespace": result.value.jaegertracingJaeger.metadata.namespace, "name": result.value.jaegertracingJaeger.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotJaegerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.jaegertracingJaeger.metadata.obj.spec})});onPatchJaeger(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <jaegertracingJaegerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
      <jaegertracingJaegerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div><div class="col-md-6">
      <jaegertracingJaegerView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].jaegertracingJaeger!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Jaeger</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].jaegertracingJaeger.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].jaegertracingJaeger!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].jaegertracingJaeger!=null && result.k8sNamespace[0].jaegertracingJaeger.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].jaegertracingJaeger.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].jaegertracingJaeger!=null" class="q-ma-sm">
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