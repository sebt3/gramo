<script setup lang="ts">
import mariadbUserQuery from '@/queries/mariadb/User.read.graphql'
import UserEdit from '@/queries/mariadb/User.patch.graphql'
import mariadbUserMeta from '@/components/mariadb/UserMeta.vue';
import mariadbUserEdit from '@/components/mariadb/UserEdit.vue';
import mariadbUserStatus from '@/components/mariadb/UserStatus.vue';
import { useQuery, useMutation, useUser, UserSimpleExcludes } from '../../../libs/mariadb/User.js'
const { onErrorHandler, notifySuccess, notifyError, onNotUserFound, navigation, setNamespacedItemFromRoute } = useUser();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbUserQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": UserSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotUserFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(UserDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import mariadbUserQuery from '@/queries/mariadb/User.read.graphql'
import UserEdit from '@/queries/mariadb/User.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useUser, sanitizeData, getProperties } from '../../../libs/mariadb/User.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotUserFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useUser();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbUserQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchUser, onDone: onPatchUser, onError: onPatchError } = useMutation(UserEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchUser({ "namespace": result.value.mariadbUser.metadata.namespace, "name": result.value.mariadbUser.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotUserFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.mariadbUser.metadata.obj.spec})});onPatchUser(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <mariadbUserMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
      <mariadbUserStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div><div class="col-md-6">
      <mariadbUserView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbUser!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">User</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].mariadbUser.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].mariadbUser!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].mariadbUser!=null && result.k8sNamespace[0].mariadbUser.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].mariadbUser.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].mariadbUser!=null" class="q-ma-sm">
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