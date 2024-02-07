<script setup lang="ts">
import projectcalicoBGPConfigurationQuery from '@/queries/projectcalico/BGPConfiguration.read.graphql'
import BGPConfigurationEdit from '@/queries/projectcalico/BGPConfiguration.patch.graphql'
import projectcalicoBGPConfigurationMeta from '@/components/projectcalico/BGPConfigurationMeta.vue';
import projectcalicoBGPConfigurationEdit from '@/components/projectcalico/BGPConfigurationEdit.vue';
import { useQuery, useMutation, useBGPConfiguration, BGPConfigurationSimpleExcludes } from '../../../libs/projectcalico/BGPConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBGPConfigurationFound, navigation, setItemFromRoute } = useBGPConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BGPConfigurationSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotBGPConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BGPConfigurationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoBGPConfigurationQuery from '@/queries/projectcalico/BGPConfiguration.read.graphql'
import BGPConfigurationEdit from '@/queries/projectcalico/BGPConfiguration.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useBGPConfiguration, sanitizeData, getProperties } from '../../../libs/projectcalico/BGPConfiguration.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotBGPConfigurationFound, setItemFromRoute, navigation, onErrorHandler } = useBGPConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPConfigurationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBGPConfiguration, onDone: onPatchBGPConfiguration, onError: onPatchError } = useMutation(BGPConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBGPConfiguration({ "name": result.value.projectcalicoBGPConfiguration.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotBGPConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoBGPConfiguration.metadata.obj.spec})});onPatchBGPConfiguration(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoBGPConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBGPConfiguration[0]!=undefined && result.projectcalicoBGPConfiguration[0]!=null"
        :model="result.projectcalicoBGPConfiguration[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoBGPConfigurationView
        v-if="!loading && result!=undefined && result.projectcalicoBGPConfiguration[0]!=undefined && result.projectcalicoBGPConfiguration[0]!=null"
        :model="result.projectcalicoBGPConfiguration[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BGPConfiguration</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBGPConfiguration.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBGPConfiguration!=null && result.projectcalicoBGPConfiguration.status != null">
          <DefaultStatusView :status="result.projectcalicoBGPConfiguration.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoBGPConfiguration!=null" class="q-ma-sm">
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