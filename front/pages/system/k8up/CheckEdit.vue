<script setup lang="ts">
import k8upCheckQuery from '@/queries/k8up/Check.read.graphql'
import CheckEdit from '@/queries/k8up/Check.patch.graphql'
import k8upCheckMeta from '@/components/k8up/CheckMeta.vue';
import k8upCheckEdit from '@/components/k8up/CheckEdit.vue';
import k8upCheckStatus from '@/components/k8up/CheckStatus.vue';
import { useQuery, useMutation, useCheck, CheckSimpleExcludes } from '../../../libs/k8up/Check.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCheckFound, navigation, setNamespacedItemFromRoute } = useCheck();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upCheckQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CheckSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotCheckFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CheckDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8upCheckQuery from '@/queries/k8up/Check.read.graphql'
import CheckEdit from '@/queries/k8up/Check.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCheck, sanitizeData, getProperties } from '../../../libs/k8up/Check.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotCheckFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useCheck();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upCheckQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCheck, onDone: onPatchCheck, onError: onPatchError } = useMutation(CheckEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCheck({ "namespace": result.value.k8upCheck.metadata.namespace, "name": result.value.k8upCheck.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotCheckFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8upCheck.metadata.obj.spec})});onPatchCheck(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upCheckMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
      <k8upCheckStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div><div class="col-md-6">
      <k8upCheckView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upCheck[0]!=undefined && result.k8sNamespace[0].k8upCheck[0]!=null"
        :model="result.k8sNamespace[0].k8upCheck[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upCheck!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Check</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8upCheck.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8upCheck!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8upCheck!=null && result.k8sNamespace[0].k8upCheck.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8upCheck.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8upCheck!=null" class="q-ma-sm">
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