<script setup lang="ts">
import mariadbGrantQuery from '@/queries/mariadb/GrantView.graphql'
import grantEdit from '@/queries/mariadb/GrantEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useGrant, sanitizeData, getProperties } from './Grant.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotGrantFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useGrant();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbGrantQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchGrant, onDone: onPatchGrant, onError: onPatchError } = useMutation(grantEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchGrant({"namespace": result.value.mariadbGrant.metadata.namespace, "name": result.value.mariadbGrant.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotGrantFound);onPatchGrant(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbGrant!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Grant</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbGrant.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbGrant!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbGrant!=null && result.mariadbGrant.status != null">
          <DefaultStatusView :status="result.mariadbGrant.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbGrant!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbGrant"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
