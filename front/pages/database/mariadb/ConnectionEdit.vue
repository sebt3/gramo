<script setup lang="ts">
import mariadbConnectionQuery from '@/queries/mariadb/Connection.read.graphql'
import ConnectionEdit from '@/queries/mariadb/Connection.patch.graphql'
import mariadbConnectionMeta from '@/components/mariadb/ConnectionMeta.vue';
import mariadbConnectionEdit from '@/components/mariadb/ConnectionEdit.vue';
import mariadbConnectionStatus from '@/components/mariadb/ConnectionStatus.vue';
import { useQuery, useMutation, useConnection, ConnectionSimpleExcludes } from '../../../libs/mariadb/Connection.js'
const { onErrorHandler, notifySuccess, notifyError, onNotConnectionFound, navigation, setNamespacedItemFromRoute } = useConnection();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbConnectionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ConnectionSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotConnectionFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ConnectionDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbConnectionQuery from '@/queries/mariadb/Connection.read.graphql'
import ConnectionEdit from '@/queries/mariadb/Connection.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useConnection, sanitizeData, getProperties } from '../../../libs/mariadb/Connection.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotConnectionFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useConnection();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbConnectionQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchConnection, onDone: onPatchConnection, onError: onPatchError } = useMutation(ConnectionEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchConnection({ "namespace": result.value.mariadbConnection.metadata.namespace, "name": result.value.mariadbConnection.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotConnectionFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbConnection.metadata.obj.spec})});onPatchConnection(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbConnectionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
      <mariadbConnectionStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div><div class="col-md-6">
      <mariadbConnectionView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbConnection[0]!=undefined && result.k8sNamespace[0].mariadbConnection[0]!=null"
        :model="result.k8sNamespace[0].mariadbConnection[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbConnection!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Connection</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbConnection.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbConnection!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbConnection!=null && result.k8sNamespace[0].mariadbConnection.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbConnection.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbConnection!=null" class="q-ma-sm">
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