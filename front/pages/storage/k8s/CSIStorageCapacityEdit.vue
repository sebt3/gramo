<script setup lang="ts">
import k8sCSIStorageCapacityQuery from '@/queries/k8s/CSIStorageCapacity.read.graphql'
import CSIStorageCapacityEdit from '@/queries/k8s/CSIStorageCapacity.patch.graphql'
import k8sCSIStorageCapacityMeta from '@/components/k8s/CSIStorageCapacityMeta.vue';
import k8sCSIStorageCapacityEdit from '@/components/k8s/CSIStorageCapacityEdit.vue';
import { useQuery, useMutation, useCSIStorageCapacity, CSIStorageCapacitySimpleExcludes } from '../../../libs/k8s/CSIStorageCapacity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCSIStorageCapacityFound, navigation, setNamespacedItemFromRoute } = useCSIStorageCapacity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIStorageCapacityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CSIStorageCapacitySimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotCSIStorageCapacityFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CSIStorageCapacityDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sCSIStorageCapacityQuery from '@/queries/k8s/CSIStorageCapacity.read.graphql'
import CSIStorageCapacityEdit from '@/queries/k8s/CSIStorageCapacity.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCSIStorageCapacity, sanitizeData, getProperties } from '../../../libs/k8s/CSIStorageCapacity.js'
const capacity  = ref({});
const maximumVolumeSize  = ref({});
const nodeTopology  = ref({});
const storageClassName  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotCSIStorageCapacityFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useCSIStorageCapacity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCSIStorageCapacityQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCSIStorageCapacity, onDone: onPatchCSIStorageCapacity, onError: onPatchError } = useMutation(CSIStorageCapacityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCSIStorageCapacity({ "namespace": result.value.k8sCSIStorageCapacity.metadata.namespace, "name": result.value.k8sCSIStorageCapacity.metadata.name, "capacity": sanitizeData(capacity.value), "maximumVolumeSize": sanitizeData(maximumVolumeSize.value), "nodeTopology": sanitizeData(nodeTopology.value), "storageClassName": sanitizeData(storageClassName.value) });
}
onError(onErrorHandler);onResult(res => {onNotCSIStorageCapacityFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sCSIStorageCapacity.metadata.obj.spec})});onPatchCSIStorageCapacity(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCSIStorageCapacityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=undefined && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=null"
        :model="result.k8sNamespace[0].k8sCSIStorageCapacity[0]"
       />
    </div><div class="col-md-6">
      <k8sCSIStorageCapacityView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=undefined && result.k8sNamespace[0].k8sCSIStorageCapacity[0]!=null"
        :model="result.k8sNamespace[0].k8sCSIStorageCapacity[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sCSIStorageCapacity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CSIStorageCapacity</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sCSIStorageCapacity.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sCSIStorageCapacity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sCSIStorageCapacity!=null && result.k8sNamespace[0].k8sCSIStorageCapacity.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sCSIStorageCapacity.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sCSIStorageCapacity!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.capacity).includes('capacity')?editor.capacity['capacity']:{}"
          @update:out="v=>{ capacity=v;editor.setcapacitySpec({ capacity: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.maximumVolumeSize).includes('maximumVolumeSize')?editor.maximumVolumeSize['maximumVolumeSize']:{}"
          @update:out="v=>{ maximumVolumeSize=v;editor.setmaximumVolumeSizeSpec({ maximumVolumeSize: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.nodeTopology).includes('nodeTopology')?editor.nodeTopology['nodeTopology']:{}"
          @update:out="v=>{ nodeTopology=v;editor.setnodeTopologySpec({ nodeTopology: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.storageClassName).includes('storageClassName')?editor.storageClassName['storageClassName']:{}"
          @update:out="v=>{ storageClassName=v;editor.setstorageClassNameSpec({ storageClassName: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlcapacity" :key="editor.yamlcapacity"
          @update:text="v=>editor.setcapacityYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlmaximumVolumeSize" :key="editor.yamlmaximumVolumeSize"
          @update:text="v=>editor.setmaximumVolumeSizeYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlnodeTopology" :key="editor.yamlnodeTopology"
          @update:text="v=>editor.setnodeTopologyYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlstorageClassName" :key="editor.yamlstorageClassName"
          @update:text="v=>editor.setstorageClassNameYaml(v)"
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