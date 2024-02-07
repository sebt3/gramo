<script setup lang="ts">
import projectcalicoIPReservationQuery from '@/queries/projectcalico/IPReservation.read.graphql'
import IPReservationEdit from '@/queries/projectcalico/IPReservation.patch.graphql'
import projectcalicoIPReservationMeta from '@/components/projectcalico/IPReservationMeta.vue';
import projectcalicoIPReservationEdit from '@/components/projectcalico/IPReservationEdit.vue';
import { useQuery, useMutation, useIPReservation, IPReservationSimpleExcludes } from '../../../libs/projectcalico/IPReservation.js'
const { onErrorHandler, notifySuccess, notifyError, onNotIPReservationFound, navigation, setItemFromRoute } = useIPReservation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPReservationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": IPReservationSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotIPReservationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(IPReservationDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoIPReservationQuery from '@/queries/projectcalico/IPReservation.read.graphql'
import IPReservationEdit from '@/queries/projectcalico/IPReservation.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useIPReservation, sanitizeData, getProperties } from '../../../libs/projectcalico/IPReservation.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotIPReservationFound, setItemFromRoute, navigation, onErrorHandler } = useIPReservation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPReservationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPReservation, onDone: onPatchIPReservation, onError: onPatchError } = useMutation(IPReservationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPReservation({ "name": result.value.projectcalicoIPReservation.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotIPReservationFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoIPReservation.metadata.obj.spec})});onPatchIPReservation(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoIPReservationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoIPReservation[0]!=undefined && result.projectcalicoIPReservation[0]!=null"
        :model="result.projectcalicoIPReservation[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoIPReservationView
        v-if="!loading && result!=undefined && result.projectcalicoIPReservation[0]!=undefined && result.projectcalicoIPReservation[0]!=null"
        :model="result.projectcalicoIPReservation[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPReservation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPReservation</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPReservation.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPReservation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPReservation!=null && result.projectcalicoIPReservation.status != null">
          <DefaultStatusView :status="result.projectcalicoIPReservation.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoIPReservation!=null" class="q-ma-sm">
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