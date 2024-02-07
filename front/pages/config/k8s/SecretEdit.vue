<script setup lang="ts">
import k8sSecretQuery from '@/queries/k8s/Secret.read.graphql'
import SecretEdit from '@/queries/k8s/Secret.patch.graphql'
import k8sSecretMeta from '@/components/k8s/SecretMeta.vue';
import k8sSecretEdit from '@/components/k8s/SecretEdit.vue';
import { useQuery, useMutation, useSecret, SecretSimpleExcludes } from '../../../libs/k8s/Secret.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSecretFound, navigation, setNamespacedItemFromRoute } = useSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sSecretQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SecretSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotSecretFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SecretDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sSecretQuery from '@/queries/k8s/Secret.read.graphql'
import SecretEdit from '@/queries/k8s/Secret.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useSecret, sanitizeData, getProperties } from '../../../libs/k8s/Secret.js'
const data  = ref({});
const immutable  = ref({});
const stringData  = ref({});
const type  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotSecretFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSecret();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sSecretQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSecret, onDone: onPatchSecret, onError: onPatchError } = useMutation(SecretEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSecret({ "namespace": result.value.k8sSecret.metadata.namespace, "name": result.value.k8sSecret.metadata.name, "data": sanitizeData(data.value), "immutable": sanitizeData(immutable.value), "stringData": sanitizeData(stringData.value), "type": sanitizeData(type.value) });
}
onError(onErrorHandler);onResult(res => {onNotSecretFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sSecret.metadata.obj.spec})});onPatchSecret(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sSecretMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
       />
      <secretgeneratorBasicAuthMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentBasicAuth!=null && result.k8sNamespace[0].k8sSecret[0].parentBasicAuth.length>0"
        :model="result.k8sNamespace[0].k8sSecret[0].parentBasicAuth[0]"
       />
      <secretgeneratorSSHKeyPairMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair!=null && result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair.length>0"
        :model="result.k8sNamespace[0].k8sSecret[0].parentSSHKeyPair[0]"
       />
      <secretgeneratorStringSecretMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentStringSecret!=null && result.k8sNamespace[0].k8sSecret[0].parentStringSecret.length>0"
        :model="result.k8sNamespace[0].k8sSecret[0].parentStringSecret[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentCluster!=null && result.k8sNamespace[0].k8sSecret[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sSecret[0].parentCluster[0]"
       />
      <mongodbMongoDBCommunityMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null && result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity!=null && result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity.length>0"
        :model="result.k8sNamespace[0].k8sSecret[0].parentMongoDBCommunity[0]"
       />
    </div><div class="col-md-6">
      <k8sSecretView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sSecret[0]!=undefined && result.k8sNamespace[0].k8sSecret[0]!=null"
        :model="result.k8sNamespace[0].k8sSecret[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Secret</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sSecret.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sSecret!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sSecret!=null && result.k8sNamespace[0].k8sSecret.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sSecret.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sSecret!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.data).includes('data')?editor.data['data']:{}"
          @update:out="v=>{ data=v;editor.setdataSpec({ data: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.immutable).includes('immutable')?editor.immutable['immutable']:{}"
          @update:out="v=>{ immutable=v;editor.setimmutableSpec({ immutable: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.stringData).includes('stringData')?editor.stringData['stringData']:{}"
          @update:out="v=>{ stringData=v;editor.setstringDataSpec({ stringData: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.type).includes('type')?editor.type['type']:{}"
          @update:out="v=>{ type=v;editor.settypeSpec({ type: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamldata" :key="editor.yamldata"
          @update:text="v=>editor.setdataYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlimmutable" :key="editor.yamlimmutable"
          @update:text="v=>editor.setimmutableYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlstringData" :key="editor.yamlstringData"
          @update:text="v=>editor.setstringDataYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamltype" :key="editor.yamltype"
          @update:text="v=>editor.settypeYaml(v)"
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