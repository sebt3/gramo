<script setup lang="ts">
import k8sServiceQuery from '@/queries/k8s/Service.read.graphql'
import ServiceEdit from '@/queries/k8s/Service.patch.graphql'
import k8sServiceMeta from '@/components/k8s/ServiceMeta.vue';
import k8sServiceEdit from '@/components/k8s/ServiceEdit.vue';
import k8sServiceStatus from '@/components/k8s/ServiceStatus.vue';
import { useQuery, useMutation, useService, ServiceSimpleExcludes } from '../../../libs/k8s/Service.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceFound, navigation, setNamespacedItemFromRoute } = useService();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotServiceFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sServiceQuery from '@/queries/k8s/Service.read.graphql'
import ServiceEdit from '@/queries/k8s/Service.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useService, sanitizeData, getProperties } from '../../../libs/k8s/Service.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotServiceFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useService();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchService, onDone: onPatchService, onError: onPatchError } = useMutation(ServiceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchService({ "namespace": result.value.k8sService.metadata.namespace, "name": result.value.k8sService.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotServiceFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sService.metadata.obj.spec})});onPatchService(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
      <k8sServiceStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
      <mongodbMongoDBCommunityMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentMongoDBCommunity!=null && result.k8sNamespace[0].k8sService[0].parentMongoDBCommunity.length>0"
        :model="result.k8sNamespace[0].k8sService[0].parentMongoDBCommunity[0]"
       />
      <redisRedisMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentRedis!=null && result.k8sNamespace[0].k8sService[0].parentRedis.length>0"
        :model="result.k8sNamespace[0].k8sService[0].parentRedis[0]"
       />
      <cnpgPoolerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentPooler!=null && result.k8sNamespace[0].k8sService[0].parentPooler.length>0"
        :model="result.k8sNamespace[0].k8sService[0].parentPooler[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentCluster!=null && result.k8sNamespace[0].k8sService[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sService[0].parentCluster[0]"
       />
      <monitoringPrometheusMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentPrometheus!=null && result.k8sNamespace[0].k8sService[0].parentPrometheus.length>0"
        :model="result.k8sNamespace[0].k8sService[0].parentPrometheus[0]"
       />
      <monitoringAlertmanagerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].parentAlertmanager!=null && result.k8sNamespace[0].k8sService[0].parentAlertmanager.length>0"
        :model="result.k8sNamespace[0].k8sService[0].parentAlertmanager[0]"
       />
      <k8sEndpointSliceList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null && result.k8sNamespace[0].k8sService[0].childEndpointSlice!=null && result.k8sNamespace[0].k8sService[0].childEndpointSlice.length>0"
        :model="result.k8sNamespace[0].k8sService[0].childEndpointSlice"
       />
    </div><div class="col-md-6">
      <k8sServiceView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sService[0]!=undefined && result.k8sNamespace[0].k8sService[0]!=null"
        :model="result.k8sNamespace[0].k8sService[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sService!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Service</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sService.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sService!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sService!=null && result.k8sNamespace[0].k8sService.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sService.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sService!=null" class="q-ma-sm">
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