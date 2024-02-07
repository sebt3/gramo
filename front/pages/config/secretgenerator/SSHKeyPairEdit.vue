<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPair.read.graphql'
import SSHKeyPairEdit from '@/queries/secretgenerator/SSHKeyPair.patch.graphql'
import secretgeneratorSSHKeyPairMeta from '@/components/secretgenerator/SSHKeyPairMeta.vue';
import secretgeneratorSSHKeyPairEdit from '@/components/secretgenerator/SSHKeyPairEdit.vue';
import secretgeneratorSSHKeyPairStatus from '@/components/secretgenerator/SSHKeyPairStatus.vue';
import { useQuery, useMutation, useSSHKeyPair, SSHKeyPairSimpleExcludes } from '../../../libs/secretgenerator/SSHKeyPair.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSSHKeyPairFound, navigation, setNamespacedItemFromRoute } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SSHKeyPairSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotSSHKeyPairFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SSHKeyPairDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPair.read.graphql'
import SSHKeyPairEdit from '@/queries/secretgenerator/SSHKeyPair.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useSSHKeyPair, sanitizeData, getProperties } from '../../../libs/secretgenerator/SSHKeyPair.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotSSHKeyPairFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSSHKeyPair, onDone: onPatchSSHKeyPair, onError: onPatchError } = useMutation(SSHKeyPairEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSSHKeyPair({ "namespace": result.value.secretgeneratorSSHKeyPair.metadata.namespace, "name": result.value.secretgeneratorSSHKeyPair.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotSSHKeyPairFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.secretgeneratorSSHKeyPair.metadata.obj.spec})});onPatchSSHKeyPair(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <secretgeneratorSSHKeyPairMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
      <secretgeneratorSSHKeyPairStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
      <k8sSecretList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].childSecret!=null && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].childSecret.length>0"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].childSecret"
       />
    </div><div class="col-md-6">
      <secretgeneratorSSHKeyPairView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SSHKeyPair</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].secretgeneratorSSHKeyPair.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].secretgeneratorSSHKeyPair!=null && result.k8sNamespace[0].secretgeneratorSSHKeyPair.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].secretgeneratorSSHKeyPair.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
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