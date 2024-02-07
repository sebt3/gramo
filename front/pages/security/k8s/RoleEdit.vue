<script setup lang="ts">
import k8sRoleQuery from '@/queries/k8s/Role.read.graphql'
import RoleEdit from '@/queries/k8s/Role.patch.graphql'
import k8sRoleMeta from '@/components/k8s/RoleMeta.vue';
import k8sRoleEdit from '@/components/k8s/RoleEdit.vue';
import { useQuery, useMutation, useRole, RoleSimpleExcludes } from '../../../libs/k8s/Role.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRoleFound, navigation, setNamespacedItemFromRoute } = useRole();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RoleSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotRoleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RoleDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sRoleQuery from '@/queries/k8s/Role.read.graphql'
import RoleEdit from '@/queries/k8s/Role.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useRole, sanitizeData, getProperties } from '../../../libs/k8s/Role.js'
const rules  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotRoleFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useRole();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchRole, onDone: onPatchRole, onError: onPatchError } = useMutation(RoleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchRole({ "namespace": result.value.k8sRole.metadata.namespace, "name": result.value.k8sRole.metadata.name, "rules": sanitizeData(rules.value) });
}
onError(onErrorHandler);onResult(res => {onNotRoleFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sRole.metadata.obj.spec})});onPatchRole(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sRoleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null"
        :model="result.k8sNamespace[0].k8sRole[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null && result.k8sNamespace[0].k8sRole[0].parentCluster!=null && result.k8sNamespace[0].k8sRole[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sRole[0].parentCluster[0]"
       />
      <cnpgPoolerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null && result.k8sNamespace[0].k8sRole[0].parentPooler!=null && result.k8sNamespace[0].k8sRole[0].parentPooler.length>0"
        :model="result.k8sNamespace[0].k8sRole[0].parentPooler[0]"
       />
    </div><div class="col-md-6">
      <k8sRoleView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null"
        :model="result.k8sNamespace[0].k8sRole[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sRole!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Role</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sRole.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sRole!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sRole!=null && result.k8sNamespace[0].k8sRole.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sRole.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sRole!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.rules).includes('rules')?editor.rules['rules']:{}"
          @update:out="v=>{ rules=v;editor.setrulesSpec({ rules: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
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