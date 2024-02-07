<script setup lang="ts">
import projectcalicoClusterInformationQuery from '@/queries/projectcalico/ClusterInformation.read.graphql'
import ClusterInformationEdit from '@/queries/projectcalico/ClusterInformation.patch.graphql'
import projectcalicoClusterInformationMeta from '@/components/projectcalico/ClusterInformationMeta.vue';
import projectcalicoClusterInformationEdit from '@/components/projectcalico/ClusterInformationEdit.vue';
import { useQuery, useMutation, useClusterInformation, ClusterInformationSimpleExcludes } from '../../../libs/projectcalico/ClusterInformation.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterInformationFound, navigation, setItemFromRoute } = useClusterInformation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoClusterInformationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterInformationSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotClusterInformationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterInformationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoClusterInformationQuery from '@/queries/projectcalico/ClusterInformation.read.graphql'
import ClusterInformationEdit from '@/queries/projectcalico/ClusterInformation.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useClusterInformation, sanitizeData, getProperties } from '../../../libs/projectcalico/ClusterInformation.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotClusterInformationFound, setItemFromRoute, navigation, onErrorHandler } = useClusterInformation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoClusterInformationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchClusterInformation, onDone: onPatchClusterInformation, onError: onPatchError } = useMutation(ClusterInformationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterInformation({ "name": result.value.projectcalicoClusterInformation.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotClusterInformationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoClusterInformation.metadata.obj.spec})});onPatchClusterInformation(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoClusterInformationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoClusterInformation[0]!=undefined && result.projectcalicoClusterInformation[0]!=null"
        :model="result.projectcalicoClusterInformation[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoClusterInformationView
        v-if="!loading && result!=undefined && result.projectcalicoClusterInformation[0]!=undefined && result.projectcalicoClusterInformation[0]!=null"
        :model="result.projectcalicoClusterInformation[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoClusterInformation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ClusterInformation</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoClusterInformation.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoClusterInformation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoClusterInformation!=null && result.projectcalicoClusterInformation.status != null">
          <DefaultStatusView :status="result.projectcalicoClusterInformation.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoClusterInformation!=null" class="q-ma-sm">
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