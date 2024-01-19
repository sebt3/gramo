<script setup lang="ts">
import projectcalicoClusterInformationQuery from '@/queries/projectcalico/ClusterInformationView.graphql'
import clusterInformationEdit from '@/queries/projectcalico/ClusterInformationEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useClusterInformation, sanitizeData, getProperties } from './ClusterInformation.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotClusterInformationFound, setItemFromRoute, navigation, onErrorHandler } = useClusterInformation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoClusterInformationQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchClusterInformation, onDone: onPatchClusterInformation, onError: onPatchError } = useMutation(clusterInformationEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterInformation({"name": result.value.projectcalicoClusterInformation.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotClusterInformationFound);onPatchClusterInformation(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoClusterInformation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ClusterInformation</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoClusterInformation.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoClusterInformation!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoClusterInformation!=null && result.projectcalicoClusterInformation.status != null">
          <DefaultStatusView :status="result.projectcalicoClusterInformation.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.projectcalicoClusterInformation!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.projectcalicoClusterInformation"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
