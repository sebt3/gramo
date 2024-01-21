<script setup lang="ts">
import mariadbDatabaseQuery from '@/queries/mariadb/DatabaseView.graphql'
import databaseEdit from '@/queries/mariadb/DatabaseEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useDatabase, sanitizeData, getProperties } from './Database.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotDatabaseFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useDatabase();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbDatabaseQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchDatabase, onDone: onPatchDatabase, onError: onPatchError } = useMutation(databaseEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchDatabase({"namespace": result.value.mariadbDatabase.metadata.namespace, "name": result.value.mariadbDatabase.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotDatabaseFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbDatabase.metadata.obj.spec})});onPatchDatabase(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbDatabase!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Database</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbDatabase.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbDatabase!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbDatabase!=null && result.mariadbDatabase.status != null">
          <DefaultStatusView :status="result.mariadbDatabase.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.mariadbDatabase!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{data=v;editor.setSpec({spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yaml" :key="editor.yaml"
          @update:text="v=>editor.setYaml(v)"
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
