<script setup lang="ts">
import vynilDistribQuery from '@/queries/vynil/Distrib.read.graphql'
import DistribEdit from '@/queries/vynil/Distrib.patch.graphql'
import vynilDistribMeta from '@/components/vynil/DistribMeta.vue';
import vynilDistribEdit from '@/components/vynil/DistribEdit.vue';
import vynilDistribStatus from '@/components/vynil/DistribStatus.vue';
import { useQuery, useMutation, useDistrib, DistribSimpleExcludes } from '../../../libs/vynil/Distrib.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDistribFound, navigation, setItemFromRoute } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DistribSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotDistribFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DistribDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import vynilDistribQuery from '@/queries/vynil/Distrib.read.graphql'
import DistribEdit from '@/queries/vynil/Distrib.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useDistrib, sanitizeData, getProperties } from '../../../libs/vynil/Distrib.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotDistribFound, setItemFromRoute, navigation, onErrorHandler } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchDistrib, onDone: onPatchDistrib, onError: onPatchError } = useMutation(DistribEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDistrib({ "name": result.value.vynilDistrib.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotDistribFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.vynilDistrib.metadata.obj.spec})});onPatchDistrib(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <vynilDistribMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
      <vynilDistribStatus
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div><div class="col-md-6">
      <vynilDistribView
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Distrib</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.vynilDistrib.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.vynilDistrib!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.vynilDistrib!=null && result.vynilDistrib.status != null">
          <DefaultStatusView :status="result.vynilDistrib.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.vynilDistrib!=null" class="q-ma-sm">
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