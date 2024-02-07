<script setup lang="ts">
import k8sNetworkPolicyQuery from '@/queries/k8s/NetworkPolicy.read.graphql'
import NetworkPolicyEdit from '@/queries/k8s/NetworkPolicy.patch.graphql'
import k8sNetworkPolicyMeta from '@/components/k8s/NetworkPolicyMeta.vue';
import k8sNetworkPolicyEdit from '@/components/k8s/NetworkPolicyEdit.vue';
import k8sNetworkPolicyStatus from '@/components/k8s/NetworkPolicyStatus.vue';
import { useQuery, useMutation, useNetworkPolicy, NetworkPolicySimpleExcludes } from '../../../libs/k8s/NetworkPolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNetworkPolicyFound, navigation, setNamespacedItemFromRoute } = useNetworkPolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNetworkPolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NetworkPolicySimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotNetworkPolicyFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NetworkPolicyDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sNetworkPolicyQuery from '@/queries/k8s/NetworkPolicy.read.graphql'
import NetworkPolicyEdit from '@/queries/k8s/NetworkPolicy.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useNetworkPolicy, sanitizeData, getProperties } from '../../../libs/k8s/NetworkPolicy.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotNetworkPolicyFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useNetworkPolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sNetworkPolicyQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchNetworkPolicy, onDone: onPatchNetworkPolicy, onError: onPatchError } = useMutation(NetworkPolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNetworkPolicy({ "namespace": result.value.k8sNetworkPolicy.metadata.namespace, "name": result.value.k8sNetworkPolicy.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotNetworkPolicyFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sNetworkPolicy.metadata.obj.spec})});onPatchNetworkPolicy(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sNetworkPolicy[0]!=undefined && result.k8sNamespace[0].k8sNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].k8sNetworkPolicy[0]"
       />
      <k8sNetworkPolicyStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sNetworkPolicy[0]!=undefined && result.k8sNamespace[0].k8sNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].k8sNetworkPolicy[0]"
       />
    </div><div class="col-md-6">
      <k8sNetworkPolicyView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sNetworkPolicy[0]!=undefined && result.k8sNamespace[0].k8sNetworkPolicy[0]!=null"
        :model="result.k8sNamespace[0].k8sNetworkPolicy[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">NetworkPolicy</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sNetworkPolicy.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sNetworkPolicy!=null && result.k8sNamespace[0].k8sNetworkPolicy.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sNetworkPolicy.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sNetworkPolicy!=null" class="q-ma-sm">
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