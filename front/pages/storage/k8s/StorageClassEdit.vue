<script setup lang="ts">
import k8sStorageClassQuery from '@/queries/k8s/StorageClass.read.graphql'
import StorageClassEdit from '@/queries/k8s/StorageClass.patch.graphql'
import k8sStorageClassMeta from '@/components/k8s/StorageClassMeta.vue';
import k8sStorageClassEdit from '@/components/k8s/StorageClassEdit.vue';
import { useQuery, useMutation, useStorageClass, StorageClassSimpleExcludes } from '../../../libs/k8s/StorageClass.js'
const { onErrorHandler, notifySuccess, notifyError, onNotStorageClassFound, navigation, setItemFromRoute } = useStorageClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStorageClassQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": StorageClassSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotStorageClassFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(StorageClassDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sStorageClassQuery from '@/queries/k8s/StorageClass.read.graphql'
import StorageClassEdit from '@/queries/k8s/StorageClass.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useStorageClass, sanitizeData, getProperties } from '../../../libs/k8s/StorageClass.js'
const allowVolumeExpansion  = ref({});
const allowedTopologies  = ref({});
const mountOptions  = ref({});
const parameters  = ref({});
const provisioner  = ref({});
const reclaimPolicy  = ref({});
const volumeBindingMode  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotStorageClassFound, setItemFromRoute, navigation, onErrorHandler } = useStorageClass();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sStorageClassQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchStorageClass, onDone: onPatchStorageClass, onError: onPatchError } = useMutation(StorageClassEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchStorageClass({ "name": result.value.k8sStorageClass.metadata.name, "allowVolumeExpansion": sanitizeData(allowVolumeExpansion.value), "allowedTopologies": sanitizeData(allowedTopologies.value), "mountOptions": sanitizeData(mountOptions.value), "parameters": sanitizeData(parameters.value), "provisioner": sanitizeData(provisioner.value), "reclaimPolicy": sanitizeData(reclaimPolicy.value), "volumeBindingMode": sanitizeData(volumeBindingMode.value) });
}
onError(onErrorHandler);onResult(res => {onNotStorageClassFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sStorageClass.metadata.obj.spec})});onPatchStorageClass(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sStorageClassMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null"
        :model="result.k8sStorageClass[0]"
       />
    </div><div class="col-md-6">
      <k8sStorageClassView
        v-if="!loading && result!=undefined && result.k8sStorageClass[0]!=undefined && result.k8sStorageClass[0]!=null"
        :model="result.k8sStorageClass[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sStorageClass!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">StorageClass</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sStorageClass.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sStorageClass!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sStorageClass!=null && result.k8sStorageClass.status != null">
          <DefaultStatusView :status="result.k8sStorageClass.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sStorageClass!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.allowVolumeExpansion).includes('allowVolumeExpansion')?editor.allowVolumeExpansion['allowVolumeExpansion']:{}"
          @update:out="v=>{ allowVolumeExpansion=v;editor.setallowVolumeExpansionSpec({ allowVolumeExpansion: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.allowedTopologies).includes('allowedTopologies')?editor.allowedTopologies['allowedTopologies']:{}"
          @update:out="v=>{ allowedTopologies=v;editor.setallowedTopologiesSpec({ allowedTopologies: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.mountOptions).includes('mountOptions')?editor.mountOptions['mountOptions']:{}"
          @update:out="v=>{ mountOptions=v;editor.setmountOptionsSpec({ mountOptions: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.parameters).includes('parameters')?editor.parameters['parameters']:{}"
          @update:out="v=>{ parameters=v;editor.setparametersSpec({ parameters: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.provisioner).includes('provisioner')?editor.provisioner['provisioner']:{}"
          @update:out="v=>{ provisioner=v;editor.setprovisionerSpec({ provisioner: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.reclaimPolicy).includes('reclaimPolicy')?editor.reclaimPolicy['reclaimPolicy']:{}"
          @update:out="v=>{ reclaimPolicy=v;editor.setreclaimPolicySpec({ reclaimPolicy: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.volumeBindingMode).includes('volumeBindingMode')?editor.volumeBindingMode['volumeBindingMode']:{}"
          @update:out="v=>{ volumeBindingMode=v;editor.setvolumeBindingModeSpec({ volumeBindingMode: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlallowVolumeExpansion" :key="editor.yamlallowVolumeExpansion"
          @update:text="v=>editor.setallowVolumeExpansionYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlallowedTopologies" :key="editor.yamlallowedTopologies"
          @update:text="v=>editor.setallowedTopologiesYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlmountOptions" :key="editor.yamlmountOptions"
          @update:text="v=>editor.setmountOptionsYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlparameters" :key="editor.yamlparameters"
          @update:text="v=>editor.setparametersYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlprovisioner" :key="editor.yamlprovisioner"
          @update:text="v=>editor.setprovisionerYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlreclaimPolicy" :key="editor.yamlreclaimPolicy"
          @update:text="v=>editor.setreclaimPolicyYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlvolumeBindingMode" :key="editor.yamlvolumeBindingMode"
          @update:text="v=>editor.setvolumeBindingModeYaml(v)"
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