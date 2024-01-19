<script setup lang="ts">
import projectcalicoIPPoolQuery from '@/queries/projectcalico/IPPoolView.graphql'
import iPPoolEdit from '@/queries/projectcalico/IPPoolEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useIPPool, sanitizeData, getProperties } from './IPPool.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotIPPoolFound, setItemFromRoute, navigation, onErrorHandler } = useIPPool();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoIPPoolQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchIPPool, onDone: onPatchIPPool, onError: onPatchError } = useMutation(iPPoolEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchIPPool({"name": result.value.projectcalicoIPPool.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotIPPoolFound);onPatchIPPool(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPPool!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">IPPool</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoIPPool.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoIPPool!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoIPPool!=null && result.projectcalicoIPPool.status != null">
          <DefaultStatusView :status="result.projectcalicoIPPool.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoIPPool!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoIPPool"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
