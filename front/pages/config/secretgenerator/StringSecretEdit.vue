<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecret.read.graphql'
import StringSecretEdit from '@/queries/secretgenerator/StringSecret.patch.graphql'
import secretgeneratorStringSecretMeta from '@/components/secretgenerator/StringSecretMeta.vue';
import secretgeneratorStringSecretEdit from '@/components/secretgenerator/StringSecretEdit.vue';
import secretgeneratorStringSecretStatus from '@/components/secretgenerator/StringSecretStatus.vue';
import { useQuery, useMutation, useStringSecret, StringSecretSimpleExcludes } from '../../../libs/secretgenerator/StringSecret.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStringSecretFound, navigation, setNamespacedItemFromRoute } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StringSecretSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotStringSecretFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StringSecretDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import secretgeneratorStringSecretQuery from '@/queries/secretgenerator/StringSecret.read.graphql'
import StringSecretEdit from '@/queries/secretgenerator/StringSecret.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useStringSecret, sanitizeData, getProperties } from '../../../libs/secretgenerator/StringSecret.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotStringSecretFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useStringSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorStringSecretQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchStringSecret, onDone: onPatchStringSecret, onError: onPatchError } = useMutation(StringSecretEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStringSecret({ "namespace": result.value.secretgeneratorStringSecret.metadata.namespace, "name": result.value.secretgeneratorStringSecret.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotStringSecretFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.secretgeneratorStringSecret.metadata.obj.spec})});onPatchStringSecret(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <secretgeneratorStringSecretMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
      <secretgeneratorStringSecretStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
      <k8sSecretList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null && result.k8sNamespace[0].secretgeneratorStringSecret[0].childSecret!=null && result.k8sNamespace[0].secretgeneratorStringSecret[0].childSecret.length>0"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0].childSecret"
       />
    </div><div class="col-md-6">
      <secretgeneratorStringSecretView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=undefined && result.k8sNamespace[0].secretgeneratorStringSecret[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorStringSecret[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StringSecret</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].secretgeneratorStringSecret.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].secretgeneratorStringSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].secretgeneratorStringSecret!=null && result.k8sNamespace[0].secretgeneratorStringSecret.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].secretgeneratorStringSecret.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].secretgeneratorStringSecret!=null" class="q-ma-sm">
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