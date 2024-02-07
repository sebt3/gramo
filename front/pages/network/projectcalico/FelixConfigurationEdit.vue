<script setup lang="ts">
import projectcalicoFelixConfigurationQuery from '@/queries/projectcalico/FelixConfiguration.read.graphql'
import FelixConfigurationEdit from '@/queries/projectcalico/FelixConfiguration.patch.graphql'
import projectcalicoFelixConfigurationMeta from '@/components/projectcalico/FelixConfigurationMeta.vue';
import projectcalicoFelixConfigurationEdit from '@/components/projectcalico/FelixConfigurationEdit.vue';
import { useQuery, useMutation, useFelixConfiguration, FelixConfigurationSimpleExcludes } from '../../../libs/projectcalico/FelixConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotFelixConfigurationFound, navigation, setItemFromRoute } = useFelixConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoFelixConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": FelixConfigurationSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotFelixConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(FelixConfigurationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoFelixConfigurationQuery from '@/queries/projectcalico/FelixConfiguration.read.graphql'
import FelixConfigurationEdit from '@/queries/projectcalico/FelixConfiguration.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useFelixConfiguration, sanitizeData, getProperties } from '../../../libs/projectcalico/FelixConfiguration.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotFelixConfigurationFound, setItemFromRoute, navigation, onErrorHandler } = useFelixConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoFelixConfigurationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchFelixConfiguration, onDone: onPatchFelixConfiguration, onError: onPatchError } = useMutation(FelixConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchFelixConfiguration({ "name": result.value.projectcalicoFelixConfiguration.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotFelixConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoFelixConfiguration.metadata.obj.spec})});onPatchFelixConfiguration(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoFelixConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoFelixConfiguration[0]!=undefined && result.projectcalicoFelixConfiguration[0]!=null"
        :model="result.projectcalicoFelixConfiguration[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoFelixConfigurationView
        v-if="!loading && result!=undefined && result.projectcalicoFelixConfiguration[0]!=undefined && result.projectcalicoFelixConfiguration[0]!=null"
        :model="result.projectcalicoFelixConfiguration[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoFelixConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">FelixConfiguration</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoFelixConfiguration.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoFelixConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoFelixConfiguration!=null && result.projectcalicoFelixConfiguration.status != null">
          <DefaultStatusView :status="result.projectcalicoFelixConfiguration.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoFelixConfiguration!=null" class="q-ma-sm">
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