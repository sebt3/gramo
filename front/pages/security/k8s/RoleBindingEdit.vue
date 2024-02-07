<script setup lang="ts">
import k8sRoleBindingQuery from '@/queries/k8s/RoleBinding.read.graphql'
import RoleBindingEdit from '@/queries/k8s/RoleBinding.patch.graphql'
import k8sRoleBindingMeta from '@/components/k8s/RoleBindingMeta.vue';
import k8sRoleBindingEdit from '@/components/k8s/RoleBindingEdit.vue';
import { useQuery, useMutation, useRoleBinding, RoleBindingSimpleExcludes } from '../../../libs/k8s/RoleBinding.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRoleBindingFound, navigation, setNamespacedItemFromRoute } = useRoleBinding();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleBindingQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RoleBindingSimpleExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
});onError(onErrorHandler); onResult(res => {onNotRoleBindingFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RoleBindingDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sRoleBindingQuery from '@/queries/k8s/RoleBinding.read.graphql'
import RoleBindingEdit from '@/queries/k8s/RoleBinding.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRoleBinding, sanitizeData, getProperties } from '../../../libs/k8s/RoleBinding.js'
const roleRef  = ref({});
const subjects  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRoleBindingFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRoleBinding();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleBindingQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRoleBinding, onDone: onPatchRoleBinding, onError: onPatchError } = useMutation(RoleBindingEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRoleBinding({ "namespace": result.value.k8sRoleBinding.metadata.namespace, "name": result.value.k8sRoleBinding.metadata.name, "roleRef": sanitizeData(roleRef.value), "subjects": sanitizeData(subjects.value) });
}
onError(onErrorHandler);onResult(res => {onNotRoleBindingFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sRoleBinding.metadata.obj.spec})});onPatchRoleBinding(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sRoleBindingMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null"
        :model="result.k8sNamespace[0].k8sRoleBinding[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentCluster!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sRoleBinding[0].parentCluster[0]"
       />
      <cnpgPoolerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentPooler!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentPooler.length>0"
        :model="result.k8sNamespace[0].k8sRoleBinding[0].parentPooler[0]"
       />
    </div><div class="col-md-6">
      <k8sRoleBindingView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null"
        :model="result.k8sNamespace[0].k8sRoleBinding[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sRoleBinding!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">RoleBinding</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sRoleBinding.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sRoleBinding!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sRoleBinding!=null && result.k8sNamespace[0].k8sRoleBinding.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sRoleBinding.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sRoleBinding!=null" class="q-ma-sm">
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