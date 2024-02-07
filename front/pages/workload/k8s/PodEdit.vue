<script setup lang="ts">
import k8sPodQuery from '@/queries/k8s/Pod.read.graphql'
import PodEdit from '@/queries/k8s/Pod.patch.graphql'
import k8sPodMeta from '@/components/k8s/PodMeta.vue';
import k8sPodEdit from '@/components/k8s/PodEdit.vue';
import k8sPodStatus from '@/components/k8s/PodStatus.vue';
import { useQuery, useMutation, usePod, PodSimpleExcludes } from '../../../libs/k8s/Pod.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPodFound, navigation, setNamespacedItemFromRoute } = usePod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PodSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotPodFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PodDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sPodQuery from '@/queries/k8s/Pod.read.graphql'
import PodEdit from '@/queries/k8s/Pod.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, usePod, sanitizeData, getProperties } from '../../../libs/k8s/Pod.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotPodFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sPodQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPod, onDone: onPatchPod, onError: onPatchError } = useMutation(PodEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPod({ "namespace": result.value.k8sPod.metadata.namespace, "name": result.value.k8sPod.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotPodFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sPod.metadata.obj.spec})});onPatchPod(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sPodMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
      <k8sPodStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
      <k8sReplicaSetMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentReplicaSet!=null && result.k8sNamespace[0].k8sPod[0].parentReplicaSet.length>0"
        :model="result.k8sNamespace[0].k8sPod[0].parentReplicaSet[0]"
       />
      <k8sStatefulSetMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentStatefulSet!=null && result.k8sNamespace[0].k8sPod[0].parentStatefulSet.length>0"
        :model="result.k8sNamespace[0].k8sPod[0].parentStatefulSet[0]"
       />
      <k8sDaemonSetMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentDaemonSet!=null && result.k8sNamespace[0].k8sPod[0].parentDaemonSet.length>0"
        :model="result.k8sNamespace[0].k8sPod[0].parentDaemonSet[0]"
       />
      <k8sJobMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentJob!=null && result.k8sNamespace[0].k8sPod[0].parentJob.length>0"
        :model="result.k8sNamespace[0].k8sPod[0].parentJob[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null && result.k8sNamespace[0].k8sPod[0].parentCluster!=null && result.k8sNamespace[0].k8sPod[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sPod[0].parentCluster[0]"
       />
    </div><div class="col-md-6">
      <k8sPodView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sPod[0]!=undefined && result.k8sNamespace[0].k8sPod[0]!=null"
        :model="result.k8sNamespace[0].k8sPod[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Pod</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sPod.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sPod!=null && result.k8sNamespace[0].k8sPod.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sPod.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sPod!=null" class="q-ma-sm">
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