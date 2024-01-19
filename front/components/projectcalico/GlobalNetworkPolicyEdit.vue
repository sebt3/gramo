<script setup lang="ts">
import projectcalicoGlobalNetworkPolicyQuery from '@/queries/projectcalico/GlobalNetworkPolicyView.graphql'
import globalNetworkPolicyEdit from '@/queries/projectcalico/GlobalNetworkPolicyEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useGlobalNetworkPolicy, sanitizeData, getProperties } from './GlobalNetworkPolicy.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotGlobalNetworkPolicyFound, setItemFromRoute, navigation, onErrorHandler } = useGlobalNetworkPolicy();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkPolicyQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGlobalNetworkPolicy, onDone: onPatchGlobalNetworkPolicy, onError: onPatchError } = useMutation(globalNetworkPolicyEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGlobalNetworkPolicy({"name": result.value.projectcalicoGlobalNetworkPolicy.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotGlobalNetworkPolicyFound);onPatchGlobalNetworkPolicy(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GlobalNetworkPolicy</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoGlobalNetworkPolicy.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null && result.projectcalicoGlobalNetworkPolicy.status != null">
          <DefaultStatusView :status="result.projectcalicoGlobalNetworkPolicy.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoGlobalNetworkPolicy!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoGlobalNetworkPolicy"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
