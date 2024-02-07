<script setup lang="ts">
import k8sClusterRoleQuery from '@/queries/k8s/ClusterRole.read.graphql'
import ClusterRoleEdit from '@/queries/k8s/ClusterRole.patch.graphql'
import k8sClusterRoleMeta from '@/components/k8s/ClusterRoleMeta.vue';
import k8sClusterRoleEdit from '@/components/k8s/ClusterRoleEdit.vue';
import { useQuery, useMutation, useClusterRole, ClusterRoleSimpleExcludes } from '../../../libs/k8s/ClusterRole.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterRoleFound, navigation, setItemFromRoute } = useClusterRole();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterRoleSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotClusterRoleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterRoleDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sClusterRoleQuery from '@/queries/k8s/ClusterRole.read.graphql'
import ClusterRoleEdit from '@/queries/k8s/ClusterRole.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useClusterRole, sanitizeData, getProperties } from '../../../libs/k8s/ClusterRole.js'
const aggregationRule  = ref({});
const rules  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotClusterRoleFound, setItemFromRoute, navigation, onErrorHandler } = useClusterRole();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchClusterRole, onDone: onPatchClusterRole, onError: onPatchError } = useMutation(ClusterRoleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterRole({ "name": result.value.k8sClusterRole.metadata.name, "aggregationRule": sanitizeData(aggregationRule.value), "rules": sanitizeData(rules.value) });
}
onError(onErrorHandler);onResult(res => {onNotClusterRoleFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sClusterRole.metadata.obj.spec})});onPatchClusterRole(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sClusterRoleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null"
        :model="result.k8sClusterRole[0]"
       />
    </div><div class="col-md-6">
      <k8sClusterRoleView
        v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null"
        :model="result.k8sClusterRole[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sClusterRole!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ClusterRole</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sClusterRole.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sClusterRole!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sClusterRole!=null && result.k8sClusterRole.status != null">
          <DefaultStatusView :status="result.k8sClusterRole.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sClusterRole!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.aggregationRule).includes('aggregationRule')?editor.aggregationRule['aggregationRule']:{}"
          @update:out="v=>{ aggregationRule=v;editor.setaggregationRuleSpec({ aggregationRule: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.rules).includes('rules')?editor.rules['rules']:{}"
          @update:out="v=>{ rules=v;editor.setrulesSpec({ rules: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlaggregationRule" :key="editor.yamlaggregationRule"
          @update:text="v=>editor.setaggregationRuleYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlrules" :key="editor.yamlrules"
          @update:text="v=>editor.setrulesYaml(v)"
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