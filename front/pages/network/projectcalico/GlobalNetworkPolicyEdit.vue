<script setup lang="ts">
import projectcalicoGlobalNetworkPolicyQuery from '@/queries/projectcalico/GlobalNetworkPolicy.read.graphql'
import GlobalNetworkPolicyEdit from '@/queries/projectcalico/GlobalNetworkPolicy.patch.graphql'
import projectcalicoGlobalNetworkPolicyMeta from '@/components/projectcalico/GlobalNetworkPolicyMeta.vue';
import projectcalicoGlobalNetworkPolicyEdit from '@/components/projectcalico/GlobalNetworkPolicyEdit.vue';
import { useQuery, useMutation, useGlobalNetworkPolicy, GlobalNetworkPolicySimpleExcludes } from '../../../libs/projectcalico/GlobalNetworkPolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGlobalNetworkPolicyFound, navigation, setItemFromRoute } = useGlobalNetworkPolicy();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkPolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GlobalNetworkPolicySimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotGlobalNetworkPolicyFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GlobalNetworkPolicyDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoGlobalNetworkPolicyQuery from '@/queries/projectcalico/GlobalNetworkPolicy.read.graphql'
import GlobalNetworkPolicyEdit from '@/queries/projectcalico/GlobalNetworkPolicy.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useGlobalNetworkPolicy, sanitizeData, getProperties } from '../../../libs/projectcalico/GlobalNetworkPolicy.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotGlobalNetworkPolicyFound, setItemFromRoute, navigation, onErrorHandler } = useGlobalNetworkPolicy();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkPolicyQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGlobalNetworkPolicy, onDone: onPatchGlobalNetworkPolicy, onError: onPatchError } = useMutation(GlobalNetworkPolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGlobalNetworkPolicy({ "name": result.value.projectcalicoGlobalNetworkPolicy.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotGlobalNetworkPolicyFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoGlobalNetworkPolicy.metadata.obj.spec})});onPatchGlobalNetworkPolicy(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoGlobalNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=null"
        :model="result.projectcalicoGlobalNetworkPolicy[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoGlobalNetworkPolicyView
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=null"
        :model="result.projectcalicoGlobalNetworkPolicy[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GlobalNetworkPolicy</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoGlobalNetworkPolicy.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null && result.projectcalicoGlobalNetworkPolicy.status != null">
          <DefaultStatusView :status="result.projectcalicoGlobalNetworkPolicy.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoGlobalNetworkPolicy!=null" class="q-ma-sm">
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