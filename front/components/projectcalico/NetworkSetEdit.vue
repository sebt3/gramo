<script setup lang="ts">
import projectcalicoNetworkSetQuery from '@/queries/projectcalico/NetworkSetView.graphql'
import networkSetEdit from '@/queries/projectcalico/NetworkSetEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useNetworkSet, sanitizeData, getProperties } from './NetworkSet.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotNetworkSetFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useNetworkSet();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkSetQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchNetworkSet, onDone: onPatchNetworkSet, onError: onPatchError } = useMutation(networkSetEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNetworkSet({"namespace": result.value.projectcalicoNetworkSet.metadata.namespace, "name": result.value.projectcalicoNetworkSet.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotNetworkSetFound);onPatchNetworkSet(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">NetworkSet</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoNetworkSet.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoNetworkSet!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoNetworkSet!=null && result.projectcalicoNetworkSet.status != null">
          <DefaultStatusView :status="result.projectcalicoNetworkSet.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoNetworkSet!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoNetworkSet"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
