<script setup lang="ts">
import k8sStatefulSetQuery from '@/queries/k8s/StatefulSet.read.graphql'
import StatefulSetEdit from '@/queries/k8s/StatefulSet.patch.graphql'
import k8sStatefulSetMeta from '@/components/k8s/StatefulSetMeta.vue';
import k8sStatefulSetEdit from '@/components/k8s/StatefulSetEdit.vue';
import k8sStatefulSetStatus from '@/components/k8s/StatefulSetStatus.vue';
import { useQuery, useMutation, useStatefulSet, StatefulSetSimpleExcludes } from '../../../libs/k8s/StatefulSet.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStatefulSetFound, navigation, setNamespacedItemFromRoute } = useStatefulSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStatefulSetQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StatefulSetSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotStatefulSetFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StatefulSetDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sStatefulSetQuery from '@/queries/k8s/StatefulSet.read.graphql'
import StatefulSetEdit from '@/queries/k8s/StatefulSet.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useStatefulSet, sanitizeData, getProperties } from '../../../libs/k8s/StatefulSet.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotStatefulSetFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useStatefulSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStatefulSetQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchStatefulSet, onDone: onPatchStatefulSet, onError: onPatchError } = useMutation(StatefulSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStatefulSet({ "namespace": result.value.k8sStatefulSet.metadata.namespace, "name": result.value.k8sStatefulSet.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotStatefulSetFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sStatefulSet.metadata.obj.spec})});onPatchStatefulSet(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sStatefulSetMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
      <k8sStatefulSetStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
      <mongodbMongoDBCommunityMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentMongoDBCommunity!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentMongoDBCommunity.length>0"
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentMongoDBCommunity[0]"
       />
      <redisRedisMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentRedis!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentRedis.length>0"
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentRedis[0]"
       />
      <monitoringPrometheusMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentPrometheus!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentPrometheus.length>0"
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentPrometheus[0]"
       />
      <monitoringAlertmanagerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentAlertmanager!=null && result.k8sNamespace[0].k8sStatefulSet[0].parentAlertmanager.length>0"
        :model="result.k8sNamespace[0].k8sStatefulSet[0].parentAlertmanager[0]"
       />
      <k8sPodList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPod!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPod.length>0"
        :model="result.k8sNamespace[0].k8sStatefulSet[0].childPod"
       />
      <k8sPersistentVolumeClaimList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPersistentVolumeClaim!=null && result.k8sNamespace[0].k8sStatefulSet[0].childPersistentVolumeClaim.length>0"
        :model="result.k8sNamespace[0].k8sStatefulSet[0].childPersistentVolumeClaim"
       />
    </div><div class="col-md-6">
      <k8sStatefulSetView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sStatefulSet[0]!=undefined && result.k8sNamespace[0].k8sStatefulSet[0]!=null"
        :model="result.k8sNamespace[0].k8sStatefulSet[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sStatefulSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StatefulSet</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sStatefulSet.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sStatefulSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sStatefulSet!=null && result.k8sNamespace[0].k8sStatefulSet.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sStatefulSet.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sStatefulSet!=null" class="q-ma-sm">
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