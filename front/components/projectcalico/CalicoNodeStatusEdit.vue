<script setup lang="ts">
import projectcalicoCalicoNodeStatusQuery from '@/queries/projectcalico/CalicoNodeStatusView.graphql'
import calicoNodeStatusEdit from '@/queries/projectcalico/CalicoNodeStatusEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useCalicoNodeStatus, sanitizeData, getProperties } from './CalicoNodeStatus.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotCalicoNodeStatusFound, setItemFromRoute, navigation, onErrorHandler } = useCalicoNodeStatus();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoCalicoNodeStatusQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCalicoNodeStatus, onDone: onPatchCalicoNodeStatus, onError: onPatchError } = useMutation(calicoNodeStatusEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCalicoNodeStatus({"name": result.value.projectcalicoCalicoNodeStatus.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotCalicoNodeStatusFound);onPatchCalicoNodeStatus(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoCalicoNodeStatus!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CalicoNodeStatus</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoCalicoNodeStatus.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoCalicoNodeStatus!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoCalicoNodeStatus!=null && result.projectcalicoCalicoNodeStatus.status != null">
          <DefaultStatusView :status="result.projectcalicoCalicoNodeStatus.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoCalicoNodeStatus!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoCalicoNodeStatus"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
