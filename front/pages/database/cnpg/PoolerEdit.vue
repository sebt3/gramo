<script setup lang="ts">
import cnpgPoolerQuery from '@/queries/cnpg/Pooler.read.graphql'
import PoolerEdit from '@/queries/cnpg/Pooler.patch.graphql'
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import cnpgPoolerEdit from '@/components/cnpg/PoolerEdit.vue';
import cnpgPoolerStatus from '@/components/cnpg/PoolerStatus.vue';
import { useQuery, useMutation, usePooler, PoolerSimpleExcludes } from '../../../libs/cnpg/Pooler.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPoolerFound, navigation, setNamespacedItemFromRoute } = usePooler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgPoolerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PoolerSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotPoolerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PoolerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import cnpgPoolerQuery from '@/queries/cnpg/Pooler.read.graphql'
import PoolerEdit from '@/queries/cnpg/Pooler.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePooler, sanitizeData, getProperties } from '../../../libs/cnpg/Pooler.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPoolerFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePooler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgPoolerQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPooler, onDone: onPatchPooler, onError: onPatchError } = useMutation(PoolerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPooler({ "namespace": result.value.cnpgPooler.metadata.namespace, "name": result.value.cnpgPooler.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotPoolerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.cnpgPooler.metadata.obj.spec})});onPatchPooler(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <cnpgPoolerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
      <cnpgPoolerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
      <k8sServiceList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childService!=null && result.k8sNamespace[0].cnpgPooler[0].childService.length>0"
        :model="result.k8sNamespace[0].cnpgPooler[0].childService"
       />
      <k8sServiceAccountList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childServiceAccount!=null && result.k8sNamespace[0].cnpgPooler[0].childServiceAccount.length>0"
        :model="result.k8sNamespace[0].cnpgPooler[0].childServiceAccount"
       />
      <k8sDeploymentList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childDeployment!=null && result.k8sNamespace[0].cnpgPooler[0].childDeployment.length>0"
        :model="result.k8sNamespace[0].cnpgPooler[0].childDeployment"
       />
      <k8sRoleList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childRole!=null && result.k8sNamespace[0].cnpgPooler[0].childRole.length>0"
        :model="result.k8sNamespace[0].cnpgPooler[0].childRole"
       />
      <k8sRoleBindingList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childRoleBinding!=null && result.k8sNamespace[0].cnpgPooler[0].childRoleBinding.length>0"
        :model="result.k8sNamespace[0].cnpgPooler[0].childRoleBinding"
       />
    </div><div class="col-md-6">
      <cnpgPoolerView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].cnpgPooler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Pooler</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].cnpgPooler.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].cnpgPooler!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].cnpgPooler!=null && result.k8sNamespace[0].cnpgPooler.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].cnpgPooler.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].cnpgPooler!=null" class="q-ma-sm">
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