<script setup lang="ts">
import projectcalicoIPAMHandleQuery from '@/queries/projectcalico/IPAMHandleView.graphql'
import iPAMHandleEdit from '@/queries/projectcalico/IPAMHandleEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useIPAMHandle, sanitizeData, getProperties } from './IPAMHandle.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotIPAMHandleFound, setItemFromRoute, navigation, onErrorHandler } = useIPAMHandle();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMHandleQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPAMHandle, onDone: onPatchIPAMHandle, onError: onPatchError } = useMutation(iPAMHandleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMHandle({"name": result.value.projectcalicoIPAMHandle.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotIPAMHandleFound);onPatchIPAMHandle(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMHandle!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPAMHandle</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPAMHandle.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMHandle!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPAMHandle!=null && result.projectcalicoIPAMHandle.status != null">
          <DefaultStatusView :status="result.projectcalicoIPAMHandle.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoIPAMHandle!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoIPAMHandle"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
