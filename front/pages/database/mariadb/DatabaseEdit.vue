<script setup lang="ts">
import mariadbDatabaseQuery from '@/queries/mariadb/Database.read.graphql'
import DatabaseEdit from '@/queries/mariadb/Database.patch.graphql'
import mariadbDatabaseMeta from '@/components/mariadb/DatabaseMeta.vue';
import mariadbDatabaseEdit from '@/components/mariadb/DatabaseEdit.vue';
import mariadbDatabaseStatus from '@/components/mariadb/DatabaseStatus.vue';
import { useQuery, useMutation, useDatabase, DatabaseSimpleExcludes } from '../../../libs/mariadb/Database.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDatabaseFound, navigation, setNamespacedItemFromRoute } = useDatabase();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbDatabaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DatabaseSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotDatabaseFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DatabaseDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbDatabaseQuery from '@/queries/mariadb/Database.read.graphql'
import DatabaseEdit from '@/queries/mariadb/Database.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useDatabase, sanitizeData, getProperties } from '../../../libs/mariadb/Database.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotDatabaseFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useDatabase();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbDatabaseQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchDatabase, onDone: onPatchDatabase, onError: onPatchError } = useMutation(DatabaseEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDatabase({ "namespace": result.value.mariadbDatabase.metadata.namespace, "name": result.value.mariadbDatabase.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotDatabaseFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbDatabase.metadata.obj.spec})});onPatchDatabase(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbDatabaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
      <mariadbDatabaseStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div><div class="col-md-6">
      <mariadbDatabaseView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbDatabase[0]!=undefined && result.k8sNamespace[0].mariadbDatabase[0]!=null"
        :model="result.k8sNamespace[0].mariadbDatabase[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbDatabase!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Database</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbDatabase.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbDatabase!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbDatabase!=null && result.k8sNamespace[0].mariadbDatabase.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbDatabase.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbDatabase!=null" class="q-ma-sm">
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