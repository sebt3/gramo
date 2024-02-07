<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlock.read.graphql'
import IPAMBlockEdit from '@/queries/projectcalico/IPAMBlock.patch.graphql'
import projectcalicoIPAMBlockMeta from '@/components/projectcalico/IPAMBlockMeta.vue';
import projectcalicoIPAMBlockEdit from '@/components/projectcalico/IPAMBlockEdit.vue';
import { useQuery, useMutation, useIPAMBlock, IPAMBlockSimpleExcludes } from '../../../libs/projectcalico/IPAMBlock.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPAMBlockFound, navigation, setItemFromRoute } = useIPAMBlock();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMBlockQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPAMBlockSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotIPAMBlockFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPAMBlockDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlock.read.graphql'
import IPAMBlockEdit from '@/queries/projectcalico/IPAMBlock.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useIPAMBlock, sanitizeData, getProperties } from '../../../libs/projectcalico/IPAMBlock.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotIPAMBlockFound, setItemFromRoute, navigation, onErrorHandler } = useIPAMBlock();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMBlockQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPAMBlock, onDone: onPatchIPAMBlock, onError: onPatchError } = useMutation(IPAMBlockEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMBlock({ "name": result.value.projectcalicoIPAMBlock.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotIPAMBlockFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoIPAMBlock.metadata.obj.spec})});onPatchIPAMBlock(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPAMBlockMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock[0]!=undefined && result.projectcalicoIPAMBlock[0]!=null"
        :model="result.projectcalicoIPAMBlock[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoIPAMBlockView
        v-if="!loading && result!=undefined && result.projectcalicoIPAMBlock[0]!=undefined && result.projectcalicoIPAMBlock[0]!=null"
        :model="result.projectcalicoIPAMBlock[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPAMBlock</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPAMBlock.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPAMBlock!=null && result.projectcalicoIPAMBlock.status != null">
          <DefaultStatusView :status="result.projectcalicoIPAMBlock.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
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