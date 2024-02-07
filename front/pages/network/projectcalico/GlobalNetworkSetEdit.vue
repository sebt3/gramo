<script setup lang="ts">
import projectcalicoGlobalNetworkSetQuery from '@/queries/projectcalico/GlobalNetworkSet.read.graphql'
import GlobalNetworkSetEdit from '@/queries/projectcalico/GlobalNetworkSet.patch.graphql'
import projectcalicoGlobalNetworkSetMeta from '@/components/projectcalico/GlobalNetworkSetMeta.vue';
import projectcalicoGlobalNetworkSetEdit from '@/components/projectcalico/GlobalNetworkSetEdit.vue';
import { useQuery, useMutation, useGlobalNetworkSet, GlobalNetworkSetSimpleExcludes } from '../../../libs/projectcalico/GlobalNetworkSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGlobalNetworkSetFound, navigation, setItemFromRoute } = useGlobalNetworkSet();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GlobalNetworkSetSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotGlobalNetworkSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GlobalNetworkSetDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoGlobalNetworkSetQuery from '@/queries/projectcalico/GlobalNetworkSet.read.graphql'
import GlobalNetworkSetEdit from '@/queries/projectcalico/GlobalNetworkSet.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useGlobalNetworkSet, sanitizeData, getProperties } from '../../../libs/projectcalico/GlobalNetworkSet.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotGlobalNetworkSetFound, setItemFromRoute, navigation, onErrorHandler } = useGlobalNetworkSet();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkSetQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGlobalNetworkSet, onDone: onPatchGlobalNetworkSet, onError: onPatchError } = useMutation(GlobalNetworkSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGlobalNetworkSet({ "name": result.value.projectcalicoGlobalNetworkSet.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotGlobalNetworkSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoGlobalNetworkSet.metadata.obj.spec})});onPatchGlobalNetworkSet(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoGlobalNetworkSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkSet[0]!=undefined && result.projectcalicoGlobalNetworkSet[0]!=null"
        :model="result.projectcalicoGlobalNetworkSet[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoGlobalNetworkSetView
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkSet[0]!=undefined && result.projectcalicoGlobalNetworkSet[0]!=null"
        :model="result.projectcalicoGlobalNetworkSet[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GlobalNetworkSet</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoGlobalNetworkSet.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoGlobalNetworkSet!=null && result.projectcalicoGlobalNetworkSet.status != null">
          <DefaultStatusView :status="result.projectcalicoGlobalNetworkSet.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoGlobalNetworkSet!=null" class="q-ma-sm">
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