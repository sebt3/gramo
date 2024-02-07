<script setup lang="ts">
import mariadbBackupQuery from '@/queries/mariadb/Backup.read.graphql'
import BackupEdit from '@/queries/mariadb/Backup.patch.graphql'
import mariadbBackupMeta from '@/components/mariadb/BackupMeta.vue';
import mariadbBackupEdit from '@/components/mariadb/BackupEdit.vue';
import mariadbBackupStatus from '@/components/mariadb/BackupStatus.vue';
import { useQuery, useMutation, useBackup, BackupSimpleExcludes } from '../../../libs/mariadb/Backup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBackupFound, navigation, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbBackupQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BackupSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotBackupFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BackupDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbBackupQuery from '@/queries/mariadb/Backup.read.graphql'
import BackupEdit from '@/queries/mariadb/Backup.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useBackup, sanitizeData, getProperties } from '../../../libs/mariadb/Backup.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotBackupFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBackup, onDone: onPatchBackup, onError: onPatchError } = useMutation(BackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBackup({ "namespace": result.value.mariadbBackup.metadata.namespace, "name": result.value.mariadbBackup.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbBackup.metadata.obj.spec})});onPatchBackup(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
       />
      <mariadbBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
       />
    </div><div class="col-md-6">
      <mariadbBackupView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbBackup[0]!=undefined && result.k8sNamespace[0].mariadbBackup[0]!=null"
        :model="result.k8sNamespace[0].mariadbBackup[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Backup</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbBackup.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbBackup!=null && result.k8sNamespace[0].mariadbBackup.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbBackup.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbBackup!=null" class="q-ma-sm">
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