<script setup lang="ts">
import postgresqlScheduledBackupQuery from '@/queries/postgresql/ScheduledBackupView.graphql'
import scheduledBackupEdit from '@/queries/postgresql/ScheduledBackupEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import MonacoEditor from '../core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useScheduledBackup, sanitizeData, getProperties } from './ScheduledBackup.js'
const data = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotScheduledBackupFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useScheduledBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(postgresqlScheduledBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchScheduledBackup, onDone: onPatchScheduledBackup, onError: onPatchError } = useMutation(scheduledBackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchScheduledBackup({"namespace": result.value.postgresqlScheduledBackup.metadata.namespace, "name": result.value.postgresqlScheduledBackup.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(res => {onNotScheduledBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.postgresqlScheduledBackup.metadata.obj.spec})});onPatchScheduledBackup(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.postgresqlScheduledBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ScheduledBackup</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.postgresqlScheduledBackup.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.postgresqlScheduledBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.postgresqlScheduledBackup!=null && result.postgresqlScheduledBackup.status != null">
          <DefaultStatusView :status="result.postgresqlScheduledBackup.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.postgresqlScheduledBackup!=null" class="q-ma-sm">
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
