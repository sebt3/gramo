<script setup lang="ts">
import projectcalicoIPPoolQuery from '@/queries/projectcalico/IPPool.read.graphql'
import IPPoolEdit from '@/queries/projectcalico/IPPool.patch.graphql'
import projectcalicoIPPoolMeta from '@/components/projectcalico/IPPoolMeta.vue';
import projectcalicoIPPoolEdit from '@/components/projectcalico/IPPoolEdit.vue';
import { useQuery, useMutation, useIPPool, IPPoolSimpleExcludes } from '../../../libs/projectcalico/IPPool.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPPoolFound, navigation, setItemFromRoute } = useIPPool();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPPoolQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPPoolSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotIPPoolFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPPoolDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoIPPoolQuery from '@/queries/projectcalico/IPPool.read.graphql'
import IPPoolEdit from '@/queries/projectcalico/IPPool.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useIPPool, sanitizeData, getProperties } from '../../../libs/projectcalico/IPPool.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotIPPoolFound, setItemFromRoute, navigation, onErrorHandler } = useIPPool();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPPoolQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPPool, onDone: onPatchIPPool, onError: onPatchError } = useMutation(IPPoolEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPPool({ "name": result.value.projectcalicoIPPool.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotIPPoolFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoIPPool.metadata.obj.spec})});onPatchIPPool(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPPoolMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPPool[0]!=undefined && result.projectcalicoIPPool[0]!=null"
        :model="result.projectcalicoIPPool[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoIPPoolView
        v-if="!loading && result!=undefined && result.projectcalicoIPPool[0]!=undefined && result.projectcalicoIPPool[0]!=null"
        :model="result.projectcalicoIPPool[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPPool!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPPool</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPPool.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPPool!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPPool!=null && result.projectcalicoIPPool.status != null">
          <DefaultStatusView :status="result.projectcalicoIPPool.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoIPPool!=null" class="q-ma-sm">
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