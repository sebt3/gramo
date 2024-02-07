<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJob.read.graphql'
import SqlJobEdit from '@/queries/mariadb/SqlJob.patch.graphql'
import mariadbSqlJobMeta from '@/components/mariadb/SqlJobMeta.vue';
import mariadbSqlJobEdit from '@/components/mariadb/SqlJobEdit.vue';
import mariadbSqlJobStatus from '@/components/mariadb/SqlJobStatus.vue';
import { useQuery, useMutation, useSqlJob, SqlJobSimpleExcludes } from '../../../libs/mariadb/SqlJob.js'
const { onErrorHandler, notifySuccess, notifyError, onNotSqlJobFound, navigation, setNamespacedItemFromRoute } = useSqlJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbSqlJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SqlJobSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotSqlJobFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(SqlJobDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbSqlJobQuery from '@/queries/mariadb/SqlJob.read.graphql'
import SqlJobEdit from '@/queries/mariadb/SqlJob.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useSqlJob, sanitizeData, getProperties } from '../../../libs/mariadb/SqlJob.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotSqlJobFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSqlJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbSqlJobQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSqlJob, onDone: onPatchSqlJob, onError: onPatchError } = useMutation(SqlJobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSqlJob({ "namespace": result.value.mariadbSqlJob.metadata.namespace, "name": result.value.mariadbSqlJob.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotSqlJobFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbSqlJob.metadata.obj.spec})});onPatchSqlJob(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbSqlJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
      <mariadbSqlJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div><div class="col-md-6">
      <mariadbSqlJobView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbSqlJob[0]!=undefined && result.k8sNamespace[0].mariadbSqlJob[0]!=null"
        :model="result.k8sNamespace[0].mariadbSqlJob[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SqlJob</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbSqlJob.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbSqlJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbSqlJob!=null && result.k8sNamespace[0].mariadbSqlJob.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbSqlJob.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbSqlJob!=null" class="q-ma-sm">
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