<script setup lang="ts">
import k8sClusterRoleBindingQuery from '@/queries/k8s/ClusterRoleBinding.read.graphql'
import ClusterRoleBindingEdit from '@/queries/k8s/ClusterRoleBinding.patch.graphql'
import k8sClusterRoleBindingMeta from '@/components/k8s/ClusterRoleBindingMeta.vue';
import k8sClusterRoleBindingEdit from '@/components/k8s/ClusterRoleBindingEdit.vue';
import { useQuery, useMutation, useClusterRoleBinding, ClusterRoleBindingSimpleExcludes } from '../../../libs/k8s/ClusterRoleBinding.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterRoleBindingFound, navigation, setItemFromRoute } = useClusterRoleBinding();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleBindingQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterRoleBindingSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotClusterRoleBindingFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterRoleBindingDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sClusterRoleBindingQuery from '@/queries/k8s/ClusterRoleBinding.read.graphql'
import ClusterRoleBindingEdit from '@/queries/k8s/ClusterRoleBinding.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useClusterRoleBinding, sanitizeData, getProperties } from '../../../libs/k8s/ClusterRoleBinding.js'
const roleRef  = ref({});
const subjects  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotClusterRoleBindingFound, setItemFromRoute, navigation, onErrorHandler } = useClusterRoleBinding();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleBindingQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchClusterRoleBinding, onDone: onPatchClusterRoleBinding, onError: onPatchError } = useMutation(ClusterRoleBindingEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterRoleBinding({ "name": result.value.k8sClusterRoleBinding.metadata.name, "roleRef": sanitizeData(roleRef.value), "subjects": sanitizeData(subjects.value) });
}
onError(onErrorHandler);onResult(res => {onNotClusterRoleBindingFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sClusterRoleBinding.metadata.obj.spec})});onPatchClusterRoleBinding(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sClusterRoleBindingMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null"
        :model="result.k8sClusterRoleBinding[0]"
       />
    </div><div class="col-md-6">
      <k8sClusterRoleBindingView
        v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null"
        :model="result.k8sClusterRoleBinding[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sClusterRoleBinding!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ClusterRoleBinding</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sClusterRoleBinding.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sClusterRoleBinding!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sClusterRoleBinding!=null && result.k8sClusterRoleBinding.status != null">
          <DefaultStatusView :status="result.k8sClusterRoleBinding.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sClusterRoleBinding!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.roleRef).includes('roleRef')?editor.roleRef['roleRef']:{}"
          @update:out="v=>{ roleRef=v;editor.setroleRefSpec({ roleRef: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.subjects).includes('subjects')?editor.subjects['subjects']:{}"
          @update:out="v=>{ subjects=v;editor.setsubjectsSpec({ subjects: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlroleRef" :key="editor.yamlroleRef"
          @update:text="v=>editor.setroleRefYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlsubjects" :key="editor.yamlsubjects"
          @update:text="v=>editor.setsubjectsYaml(v)"
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