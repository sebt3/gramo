<script setup lang="ts">
import k8sResourceQuotaQuery from '@/queries/k8s/ResourceQuota.read.graphql'
import ResourceQuotaEdit from '@/queries/k8s/ResourceQuota.patch.graphql'
import k8sResourceQuotaMeta from '@/components/k8s/ResourceQuotaMeta.vue';
import k8sResourceQuotaEdit from '@/components/k8s/ResourceQuotaEdit.vue';
import k8sResourceQuotaStatus from '@/components/k8s/ResourceQuotaStatus.vue';
import { useQuery, useMutation, useResourceQuota, ResourceQuotaSimpleExcludes } from '../../../libs/k8s/ResourceQuota.js'
const { onErrorHandler, notifySuccess, notifyError, onNotResourceQuotaFound, navigation, setNamespacedItemFromRoute } = useResourceQuota();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sResourceQuotaQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ResourceQuotaSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotResourceQuotaFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ResourceQuotaDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sResourceQuotaQuery from '@/queries/k8s/ResourceQuota.read.graphql'
import ResourceQuotaEdit from '@/queries/k8s/ResourceQuota.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useResourceQuota, sanitizeData, getProperties } from '../../../libs/k8s/ResourceQuota.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotResourceQuotaFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useResourceQuota();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sResourceQuotaQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchResourceQuota, onDone: onPatchResourceQuota, onError: onPatchError } = useMutation(ResourceQuotaEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchResourceQuota({ "namespace": result.value.k8sResourceQuota.metadata.namespace, "name": result.value.k8sResourceQuota.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotResourceQuotaFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sResourceQuota.metadata.obj.spec})});onPatchResourceQuota(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sResourceQuotaMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
      <k8sResourceQuotaStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div><div class="col-md-6">
      <k8sResourceQuotaView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sResourceQuota[0]!=undefined && result.k8sNamespace[0].k8sResourceQuota[0]!=null"
        :model="result.k8sNamespace[0].k8sResourceQuota[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sResourceQuota!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ResourceQuota</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sResourceQuota.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sResourceQuota!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sResourceQuota!=null && result.k8sNamespace[0].k8sResourceQuota.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sResourceQuota.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sResourceQuota!=null" class="q-ma-sm">
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