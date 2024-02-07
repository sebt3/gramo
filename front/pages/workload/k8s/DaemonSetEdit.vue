<script setup lang="ts">
import k8sDaemonSetQuery from '@/queries/k8s/DaemonSet.read.graphql'
import DaemonSetEdit from '@/queries/k8s/DaemonSet.patch.graphql'
import k8sDaemonSetMeta from '@/components/k8s/DaemonSetMeta.vue';
import k8sDaemonSetEdit from '@/components/k8s/DaemonSetEdit.vue';
import k8sDaemonSetStatus from '@/components/k8s/DaemonSetStatus.vue';
import { useQuery, useMutation, useDaemonSet, DaemonSetSimpleExcludes } from '../../../libs/k8s/DaemonSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDaemonSetFound, navigation, setNamespacedItemFromRoute } = useDaemonSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDaemonSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DaemonSetSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotDaemonSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DaemonSetDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sDaemonSetQuery from '@/queries/k8s/DaemonSet.read.graphql'
import DaemonSetEdit from '@/queries/k8s/DaemonSet.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useDaemonSet, sanitizeData, getProperties } from '../../../libs/k8s/DaemonSet.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotDaemonSetFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useDaemonSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sDaemonSetQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchDaemonSet, onDone: onPatchDaemonSet, onError: onPatchError } = useMutation(DaemonSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDaemonSet({ "namespace": result.value.k8sDaemonSet.metadata.namespace, "name": result.value.k8sDaemonSet.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotDaemonSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sDaemonSet.metadata.obj.spec})});onPatchDaemonSet(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sDaemonSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
      <k8sDaemonSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
      <k8sPodList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null && result.k8sNamespace[0].k8sDaemonSet[0].childPod!=null && result.k8sNamespace[0].k8sDaemonSet[0].childPod.length>0"
        :model="result.k8sNamespace[0].k8sDaemonSet[0].childPod"
       />
    </div><div class="col-md-6">
      <k8sDaemonSetView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sDaemonSet[0]!=undefined && result.k8sNamespace[0].k8sDaemonSet[0]!=null"
        :model="result.k8sNamespace[0].k8sDaemonSet[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sDaemonSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">DaemonSet</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sDaemonSet.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sDaemonSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sDaemonSet!=null && result.k8sNamespace[0].k8sDaemonSet.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sDaemonSet.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sDaemonSet!=null" class="q-ma-sm">
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