<script setup lang="ts">
import projectcalicoKubeControllersConfigurationQuery from '@/queries/projectcalico/KubeControllersConfiguration.read.graphql'
import KubeControllersConfigurationEdit from '@/queries/projectcalico/KubeControllersConfiguration.patch.graphql'
import projectcalicoKubeControllersConfigurationMeta from '@/components/projectcalico/KubeControllersConfigurationMeta.vue';
import projectcalicoKubeControllersConfigurationEdit from '@/components/projectcalico/KubeControllersConfigurationEdit.vue';
import projectcalicoKubeControllersConfigurationStatus from '@/components/projectcalico/KubeControllersConfigurationStatus.vue';
import { useQuery, useMutation, useKubeControllersConfiguration, KubeControllersConfigurationSimpleExcludes } from '../../../libs/projectcalico/KubeControllersConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKubeControllersConfigurationFound, navigation, setItemFromRoute } = useKubeControllersConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoKubeControllersConfigurationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KubeControllersConfigurationSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotKubeControllersConfigurationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KubeControllersConfigurationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoKubeControllersConfigurationQuery from '@/queries/projectcalico/KubeControllersConfiguration.read.graphql'
import KubeControllersConfigurationEdit from '@/queries/projectcalico/KubeControllersConfiguration.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useKubeControllersConfiguration, sanitizeData, getProperties } from '../../../libs/projectcalico/KubeControllersConfiguration.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotKubeControllersConfigurationFound, setItemFromRoute, navigation, onErrorHandler } = useKubeControllersConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoKubeControllersConfigurationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchKubeControllersConfiguration, onDone: onPatchKubeControllersConfiguration, onError: onPatchError } = useMutation(KubeControllersConfigurationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchKubeControllersConfiguration({ "name": result.value.projectcalicoKubeControllersConfiguration.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotKubeControllersConfigurationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoKubeControllersConfiguration.metadata.obj.spec})});onPatchKubeControllersConfiguration(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoKubeControllersConfigurationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
       />
      <projectcalicoKubeControllersConfigurationStatus
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoKubeControllersConfigurationView
        v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=undefined && result.projectcalicoKubeControllersConfiguration[0]!=null"
        :model="result.projectcalicoKubeControllersConfiguration[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoKubeControllersConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">KubeControllersConfiguration</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoKubeControllersConfiguration.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoKubeControllersConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoKubeControllersConfiguration!=null && result.projectcalicoKubeControllersConfiguration.status != null">
          <DefaultStatusView :status="result.projectcalicoKubeControllersConfiguration.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoKubeControllersConfiguration!=null" class="q-ma-sm">
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