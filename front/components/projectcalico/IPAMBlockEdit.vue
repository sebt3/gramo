<script setup lang="ts">
import projectcalicoIPAMBlockQuery from '@/queries/projectcalico/IPAMBlockView.graphql'
import iPAMBlockEdit from '@/queries/projectcalico/IPAMBlockEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useIPAMBlock, sanitizeData, getProperties } from './IPAMBlock.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotIPAMBlockFound, setItemFromRoute, navigation, onErrorHandler } = useIPAMBlock();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPAMBlockQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPAMBlock, onDone: onPatchIPAMBlock, onError: onPatchError } = useMutation(iPAMBlockEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPAMBlock({"name": result.value.projectcalicoIPAMBlock.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotIPAMBlockFound);onPatchIPAMBlock(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPAMBlock</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPAMBlock.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPAMBlock!=null && result.projectcalicoIPAMBlock.status != null">
          <DefaultStatusView :status="result.projectcalicoIPAMBlock.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoIPAMBlock!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoIPAMBlock"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
