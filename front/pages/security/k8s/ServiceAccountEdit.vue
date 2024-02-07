<script setup lang="ts">
import k8sServiceAccountQuery from '@/queries/k8s/ServiceAccount.read.graphql'
import ServiceAccountEdit from '@/queries/k8s/ServiceAccount.patch.graphql'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import k8sServiceAccountEdit from '@/components/k8s/ServiceAccountEdit.vue';
import { useQuery, useMutation, useServiceAccount, ServiceAccountSimpleExcludes } from '../../../libs/k8s/ServiceAccount.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceAccountFound, navigation, setNamespacedItemFromRoute } = useServiceAccount();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceAccountQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceAccountSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotServiceAccountFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceAccountDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sServiceAccountQuery from '@/queries/k8s/ServiceAccount.read.graphql'
import ServiceAccountEdit from '@/queries/k8s/ServiceAccount.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useServiceAccount, sanitizeData, getProperties } from '../../../libs/k8s/ServiceAccount.js'
const automountServiceAccountToken  = ref({});
const imagePullSecrets  = ref({});
const secrets  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotServiceAccountFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useServiceAccount();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceAccountQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchServiceAccount, onDone: onPatchServiceAccount, onError: onPatchError } = useMutation(ServiceAccountEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchServiceAccount({ "namespace": result.value.k8sServiceAccount.metadata.namespace, "name": result.value.k8sServiceAccount.metadata.name, "automountServiceAccountToken": sanitizeData(automountServiceAccountToken.value), "imagePullSecrets": sanitizeData(imagePullSecrets.value), "secrets": sanitizeData(secrets.value) });
}
onError(onErrorHandler);onResult(res => {onNotServiceAccountFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sServiceAccount.metadata.obj.spec})});onPatchServiceAccount(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sServiceAccountMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null"
        :model="result.k8sNamespace[0].k8sServiceAccount[0]"
       />
      <cnpgPoolerMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentPooler!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentPooler.length>0"
        :model="result.k8sNamespace[0].k8sServiceAccount[0].parentPooler[0]"
       />
      <cnpgClusterMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentCluster!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentCluster.length>0"
        :model="result.k8sNamespace[0].k8sServiceAccount[0].parentCluster[0]"
       />
    </div><div class="col-md-6">
      <k8sServiceAccountView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null"
        :model="result.k8sNamespace[0].k8sServiceAccount[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sServiceAccount!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ServiceAccount</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sServiceAccount.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sServiceAccount!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sServiceAccount!=null && result.k8sNamespace[0].k8sServiceAccount.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sServiceAccount.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sServiceAccount!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.automountServiceAccountToken).includes('automountServiceAccountToken')?editor.automountServiceAccountToken['automountServiceAccountToken']:{}"
          @update:out="v=>{ automountServiceAccountToken=v;editor.setautomountServiceAccountTokenSpec({ automountServiceAccountToken: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.imagePullSecrets).includes('imagePullSecrets')?editor.imagePullSecrets['imagePullSecrets']:{}"
          @update:out="v=>{ imagePullSecrets=v;editor.setimagePullSecretsSpec({ imagePullSecrets: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
          <OpenApiEdit
          :in="Object.keys(editor.secrets).includes('secrets')?editor.secrets['secrets']:{}"
          @update:out="v=>{ secrets=v;editor.setsecretsSpec({ secrets: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlautomountServiceAccountToken" :key="editor.yamlautomountServiceAccountToken"
          @update:text="v=>editor.setautomountServiceAccountTokenYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlimagePullSecrets" :key="editor.yamlimagePullSecrets"
          @update:text="v=>editor.setimagePullSecretsYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
          <MonacoEditor
          :text="editor.yamlsecrets" :key="editor.yamlsecrets"
          @update:text="v=>editor.setsecretsYaml(v)"
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