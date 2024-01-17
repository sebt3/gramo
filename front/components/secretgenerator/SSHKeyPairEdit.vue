<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPairView.graphql'
import sSHKeyPairEdit from '@/queries/secretgenerator/SSHKeyPairEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useSSHKeyPair, sanitizeData, getProperties } from './SSHKeyPair.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotSSHKeyPairFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchSSHKeyPair, onDone: onPatchSSHKeyPair, onError: onPatchError } = useMutation(sSHKeyPairEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSSHKeyPair({"namespace": navigation.currentNamespace, "name": result.value.secretgeneratorSSHKeyPair.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotSSHKeyPairFound);onPatchSSHKeyPair(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SSHKeyPair</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.secretgeneratorSSHKeyPair.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.secretgeneratorSSHKeyPair!=null && result.secretgeneratorSSHKeyPair.status != null">
          <DefaultStatusView :status="result.secretgeneratorSSHKeyPair.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.secretgeneratorSSHKeyPair!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.secretgeneratorSSHKeyPair"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
