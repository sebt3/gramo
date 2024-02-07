<script setup lang="ts">
import projectcalicoNetworkSetQuery from '@/queries/projectcalico/NetworkSet.read.graphql'
import NetworkSetEdit from '@/queries/projectcalico/NetworkSet.patch.graphql'
import projectcalicoNetworkSetMeta from '@/components/projectcalico/NetworkSetMeta.vue';
import projectcalicoNetworkSetEdit from '@/components/projectcalico/NetworkSetEdit.vue';
import { useQuery, useMutation, useNetworkSet, NetworkSetSimpleExcludes } from '../../../libs/projectcalico/NetworkSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotNetworkSetFound, navigation, setNamespacedItemFromRoute } = useNetworkSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": NetworkSetSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotNetworkSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(NetworkSetDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoNetworkSetQuery from '@/queries/projectcalico/NetworkSet.read.graphql'
import NetworkSetEdit from '@/queries/projectcalico/NetworkSet.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useNetworkSet, sanitizeData, getProperties } from '../../../libs/projectcalico/NetworkSet.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotNetworkSetFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useNetworkSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkSetQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchNetworkSet, onDone: onPatchNetworkSet, onError: onPatchError } = useMutation(NetworkSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNetworkSet({ "namespace": result.value.projectcalicoNetworkSet.metadata.namespace, "name": result.value.projectcalicoNetworkSet.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotNetworkSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoNetworkSet.metadata.obj.spec})});onPatchNetworkSet(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoNetworkSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkSet[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoNetworkSetView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=undefined && result.k8sNamespace[0].projectcalicoNetworkSet[0]!=null"
        :model="result.k8sNamespace[0].projectcalicoNetworkSet[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].projectcalicoNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">NetworkSet</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].projectcalicoNetworkSet.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].projectcalicoNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].projectcalicoNetworkSet!=null && result.k8sNamespace[0].projectcalicoNetworkSet.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].projectcalicoNetworkSet.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].projectcalicoNetworkSet!=null" class="q-ma-sm">
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