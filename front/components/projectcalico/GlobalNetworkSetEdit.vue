<script setup lang="ts">
import projectcalicoGlobalNetworkSetQuery from '@/queries/projectcalico/GlobalNetworkSetView.graphql'
import globalNetworkSetEdit from '@/queries/projectcalico/GlobalNetworkSetEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useGlobalNetworkSet, sanitizeData, getProperties } from './GlobalNetworkSet.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotGlobalNetworkSetFound, setItemFromRoute, navigation, onErrorHandler } = useGlobalNetworkSet();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkSetQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGlobalNetworkSet, onDone: onPatchGlobalNetworkSet, onError: onPatchError } = useMutation(globalNetworkSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGlobalNetworkSet({"name": result.value.projectcalicoGlobalNetworkSet.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotGlobalNetworkSetFound);onPatchGlobalNetworkSet(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GlobalNetworkSet</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoGlobalNetworkSet.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoGlobalNetworkSet!=null && result.projectcalicoGlobalNetworkSet.status != null">
          <DefaultStatusView :status="result.projectcalicoGlobalNetworkSet.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkSet!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoGlobalNetworkSet"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
