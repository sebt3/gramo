<script setup lang="ts">
import k8sDeploymentQuery from '@/queries/k8s/Deployment.read.graphql'
import DeploymentEdit from '@/queries/k8s/Deployment.patch.graphql'
import k8sDeploymentMeta from '@/components/k8s/DeploymentMeta.vue';
import k8sDeploymentEdit from '@/components/k8s/DeploymentEdit.vue';
import k8sDeploymentStatus from '@/components/k8s/DeploymentStatus.vue';
import { useQuery, useMutation, useDeployment, DeploymentSimpleExcludes } from '../../../libs/k8s/Deployment.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDeploymentFound, navigation, setNamespacedItemFromRoute } = useDeployment();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDeploymentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DeploymentSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotDeploymentFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DeploymentDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sDeploymentQuery from '@/queries/k8s/Deployment.read.graphql'
import DeploymentEdit from '@/queries/k8s/Deployment.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useDeployment, sanitizeData, getProperties } from '../../../libs/k8s/Deployment.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotDeploymentFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useDeployment();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDeploymentQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchDeployment, onDone: onPatchDeployment, onError: onPatchError } = useMutation(DeploymentEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDeployment({ "namespace": result.value.k8sDeployment.metadata.namespace, "name": result.value.k8sDeployment.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotDeploymentFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sDeployment.metadata.obj.spec})});onPatchDeployment(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sDeploymentMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null"
        :model="result.k8sNamespace[0].k8sDeployment[0]"
       />
      <k8sDeploymentStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null"
        :model="result.k8sNamespace[0].k8sDeployment[0]"
       />
      <cnpgPoolerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null && result.k8sNamespace[0].k8sDeployment[0].parentPooler!=null && result.k8sNamespace[0].k8sDeployment[0].parentPooler.length>0"
        :model="result.k8sNamespace[0].k8sDeployment[0].parentPooler[0]"
       />
      <k8sReplicaSetList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null && result.k8sNamespace[0].k8sDeployment[0].childReplicaSet!=null && result.k8sNamespace[0].k8sDeployment[0].childReplicaSet.length>0"
        :model="result.k8sNamespace[0].k8sDeployment[0].childReplicaSet"
       />
    </div><div class="col-md-6">
      <k8sDeploymentView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDeployment[0]!=undefined && result.k8sNamespace[0].k8sDeployment[0]!=null"
        :model="result.k8sNamespace[0].k8sDeployment[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sDeployment!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Deployment</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sDeployment.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sDeployment!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sDeployment!=null && result.k8sNamespace[0].k8sDeployment.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sDeployment.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sDeployment!=null" class="q-ma-sm">
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