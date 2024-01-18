<script setup lang="ts">
import k8upPreBackupPodQuery from '@/queries/k8up/PreBackupPodView.graphql'
import preBackupPodEdit from '@/queries/k8up/PreBackupPodEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, usePreBackupPod, sanitizeData, getProperties } from './PreBackupPod.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotPreBackupPodFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = usePreBackupPod();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upPreBackupPodQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchPreBackupPod, onDone: onPatchPreBackupPod, onError: onPatchError } = useMutation(preBackupPodEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchPreBackupPod({"namespace": result.value.k8upPreBackupPod.metadata.namespace, "name": result.value.k8upPreBackupPod.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotPreBackupPodFound);onPatchPreBackupPod(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8upPreBackupPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PreBackupPod</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8upPreBackupPod.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8upPreBackupPod!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8upPreBackupPod!=null && result.k8upPreBackupPod.status != null">
          <DefaultStatusView :status="result.k8upPreBackupPod.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.k8upPreBackupPod!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.k8upPreBackupPod"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
