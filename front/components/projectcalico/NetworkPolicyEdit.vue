<script setup lang="ts">
import projectcalicoNetworkPolicyQuery from '@/queries/projectcalico/NetworkPolicyView.graphql'
import networkPolicyEdit from '@/queries/projectcalico/NetworkPolicyEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useNetworkPolicy, sanitizeData, getProperties } from './NetworkPolicy.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotNetworkPolicyFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useNetworkPolicy();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoNetworkPolicyQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchNetworkPolicy, onDone: onPatchNetworkPolicy, onError: onPatchError } = useMutation(networkPolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchNetworkPolicy({"namespace": result.value.projectcalicoNetworkPolicy.metadata.namespace, "name": result.value.projectcalicoNetworkPolicy.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotNetworkPolicyFound);onPatchNetworkPolicy(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">NetworkPolicy</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoNetworkPolicy.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoNetworkPolicy!=null && result.projectcalicoNetworkPolicy.status != null">
          <DefaultStatusView :status="result.projectcalicoNetworkPolicy.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoNetworkPolicy!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoNetworkPolicy"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
