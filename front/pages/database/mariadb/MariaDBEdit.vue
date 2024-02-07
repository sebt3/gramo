<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDB.read.graphql'
import MariaDBEdit from '@/queries/mariadb/MariaDB.patch.graphql'
import mariadbMariaDBMeta from '@/components/mariadb/MariaDBMeta.vue';
import mariadbMariaDBEdit from '@/components/mariadb/MariaDBEdit.vue';
import mariadbMariaDBStatus from '@/components/mariadb/MariaDBStatus.vue';
import { useQuery, useMutation, useMariaDB, MariaDBSimpleExcludes } from '../../../libs/mariadb/MariaDB.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMariaDBFound, navigation, setNamespacedItemFromRoute } = useMariaDB();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbMariaDBQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MariaDBSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotMariaDBFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MariaDBDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDB.read.graphql'
import MariaDBEdit from '@/queries/mariadb/MariaDB.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useMariaDB, sanitizeData, getProperties } from '../../../libs/mariadb/MariaDB.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotMariaDBFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useMariaDB();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbMariaDBQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchMariaDB, onDone: onPatchMariaDB, onError: onPatchError } = useMutation(MariaDBEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMariaDB({ "namespace": result.value.mariadbMariaDB.metadata.namespace, "name": result.value.mariadbMariaDB.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotMariaDBFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbMariaDB.metadata.obj.spec})});onPatchMariaDB(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbMariaDBMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
      <mariadbMariaDBStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div><div class="col-md-6">
      <mariadbMariaDBView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MariaDB</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbMariaDB.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbMariaDB!=null && result.k8sNamespace[0].mariadbMariaDB.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbMariaDB.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbMariaDB!=null" class="q-ma-sm">
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