<script setup lang="ts">
import cnpgClusterQuery from '@/queries/cnpg/Cluster.read.graphql'
import ClusterEdit from '@/queries/cnpg/Cluster.patch.graphql'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import cnpgClusterEdit from '@/components/cnpg/ClusterEdit.vue';
import cnpgClusterStatus from '@/components/cnpg/ClusterStatus.vue';
import { useQuery, useMutation, useCluster, ClusterSimpleExcludes } from '../../../libs/cnpg/Cluster.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterFound, navigation, setNamespacedItemFromRoute } = useCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgClusterQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotClusterFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import cnpgClusterQuery from '@/queries/cnpg/Cluster.read.graphql'
import ClusterEdit from '@/queries/cnpg/Cluster.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCluster, sanitizeData, getProperties } from '../../../libs/cnpg/Cluster.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotClusterFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useCluster();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgClusterQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCluster, onDone: onPatchCluster, onError: onPatchError } = useMutation(ClusterEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCluster({ "namespace": result.value.cnpgCluster.metadata.namespace, "name": result.value.cnpgCluster.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotClusterFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.cnpgCluster.metadata.obj.spec})});onPatchCluster(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <cnpgClusterMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
      <cnpgClusterStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
      <k8sPodList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childPod!=null && result.k8sNamespace[0].cnpgCluster[0].childPod.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childPod"
       />
      <k8sSecretList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childSecret!=null && result.k8sNamespace[0].cnpgCluster[0].childSecret.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childSecret"
       />
      <k8sServiceList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childService!=null && result.k8sNamespace[0].cnpgCluster[0].childService.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childService"
       />
      <k8sServiceAccountList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childServiceAccount!=null && result.k8sNamespace[0].cnpgCluster[0].childServiceAccount.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childServiceAccount"
       />
      <k8sPodDisruptionBudgetList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childPodDisruptionBudget!=null && result.k8sNamespace[0].cnpgCluster[0].childPodDisruptionBudget.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childPodDisruptionBudget"
       />
      <k8sRoleList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childRole!=null && result.k8sNamespace[0].cnpgCluster[0].childRole.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childRole"
       />
      <k8sRoleBindingList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childRoleBinding!=null && result.k8sNamespace[0].cnpgCluster[0].childRoleBinding.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childRoleBinding"
       />
      <k8sPersistentVolumeClaimList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null && result.k8sNamespace[0].cnpgCluster[0].childPersistentVolumeClaim!=null && result.k8sNamespace[0].cnpgCluster[0].childPersistentVolumeClaim.length>0"
        :model="result.k8sNamespace[0].cnpgCluster[0].childPersistentVolumeClaim"
       />
    </div><div class="col-md-6">
      <cnpgClusterView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgCluster[0]!=undefined && result.k8sNamespace[0].cnpgCluster[0]!=null"
        :model="result.k8sNamespace[0].cnpgCluster[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].cnpgCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Cluster</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].cnpgCluster.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].cnpgCluster!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].cnpgCluster!=null && result.k8sNamespace[0].cnpgCluster.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].cnpgCluster.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].cnpgCluster!=null" class="q-ma-sm">
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