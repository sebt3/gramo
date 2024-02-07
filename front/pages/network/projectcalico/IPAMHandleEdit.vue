<script setup lang="ts">
import projectcalicoIPAMHandleQuery from '@/queries/projectcalico/IPAMHandle.read.graphql'
import IPAMHandleEdit from '@/queries/projectcalico/IPAMHandle.patch.graphql'
import projectcalicoIPAMHandleMeta from '@/components/projectcalico/IPAMHandleMeta.vue';
import projectcalicoIPAMHandleEdit from '@/components/projectcalico/IPAMHandleEdit.vue';
import { useQuery, useMutation, useIPAMHandle, IPAMHandleSimpleExcludes } from '../../../libs/projectcalico/IPAMHandle.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPAMHandleFound, navigation, setItemFromRoute } = useIPAMHandle();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMHandleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMHandleSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotIPAMHandleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMHandleDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoIPAMHandleQuery from '@/queries/projectcalico/IPAMHandle.read.graphql'
import IPAMHandleEdit from '@/queries/projectcalico/IPAMHandle.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useIPAMHandle, sanitizeData, getProperties } from '../../../libs/projectcalico/IPAMHandle.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotIPAMHandleFound, setItemFromRoute, navigation, onErrorHandler } = useIPAMHandle();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMHandleQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPAMHandle, onDone: onPatchIPAMHandle, onError: onPatchError } = useMutation(IPAMHandleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMHandle({ "name": result.value.projectcalicoIPAMHandle.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotIPAMHandleFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoIPAMHandle.metadata.obj.spec})});onPatchIPAMHandle(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPAMHandleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMHandle[0]!=undefined && result.projectcalicoIPAMHandle[0]!=null"
        :model="result.projectcalicoIPAMHandle[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoIPAMHandleView
        v-if="!loading && result!=undefined && result.projectcalicoIPAMHandle[0]!=undefined && result.projectcalicoIPAMHandle[0]!=null"
        :model="result.projectcalicoIPAMHandle[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMHandle!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPAMHandle</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPAMHandle.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMHandle!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPAMHandle!=null && result.projectcalicoIPAMHandle.status != null">
          <DefaultStatusView :status="result.projectcalicoIPAMHandle.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoIPAMHandle!=null" class="q-ma-sm">
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