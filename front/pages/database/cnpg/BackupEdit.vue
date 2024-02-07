<script setup lang="ts">
import cnpgBackupQuery from '@/queries/cnpg/Backup.read.graphql'
import BackupEdit from '@/queries/cnpg/Backup.patch.graphql'
import cnpgBackupMeta from '@/components/cnpg/BackupMeta.vue';
import cnpgBackupEdit from '@/components/cnpg/BackupEdit.vue';
import cnpgBackupStatus from '@/components/cnpg/BackupStatus.vue';
import { useQuery, useMutation, useBackup, BackupSimpleExcludes } from '../../../libs/cnpg/Backup.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBackupFound, navigation, setNamespacedItemFromRoute } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgBackupQuery, {
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
import cnpgBackupQuery from '@/queries/cnpg/Backup.read.graphql'
import BackupEdit from '@/queries/cnpg/Backup.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useBackup, sanitizeData, getProperties } from '../../../libs/cnpg/Backup.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotBackupFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useBackup();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgBackupQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBackup, onDone: onPatchBackup, onError: onPatchError } = useMutation(BackupEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBackup({ "namespace": result.value.cnpgBackup.metadata.namespace, "name": result.value.cnpgBackup.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotBackupFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.cnpgBackup.metadata.obj.spec})});onPatchBackup(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <cnpgBackupMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgBackup[0]!=undefined && result.k8sNamespace[0].cnpgBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgBackup[0]"
       />
      <cnpgBackupStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgBackup[0]!=undefined && result.k8sNamespace[0].cnpgBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgBackup[0]"
       />
    </div><div class="col-md-6">
      <cnpgBackupView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgBackup[0]!=undefined && result.k8sNamespace[0].cnpgBackup[0]!=null"
        :model="result.k8sNamespace[0].cnpgBackup[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].cnpgBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Backup</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].cnpgBackup.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].cnpgBackup!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].cnpgBackup!=null && result.k8sNamespace[0].cnpgBackup.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].cnpgBackup.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].cnpgBackup!=null" class="q-ma-sm">
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