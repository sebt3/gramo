<script setup lang="ts">
import fluxcdBucketQuery from '@/queries/fluxcd/BucketView.graphql'
import bucketEdit from '@/queries/fluxcd/BucketEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useBucket, sanitizeData, getProperties } from './Bucket.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotBucketFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useBucket();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdBucketQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBucket, onDone: onPatchBucket, onError: onPatchError } = useMutation(bucketEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBucket({"namespace": navigation.currentNamespace, "name": result.value.fluxcdBucket.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotBucketFound);onPatchBucket(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdBucket!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Bucket</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.fluxcdBucket.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.fluxcdBucket!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.fluxcdBucket!=null && result.fluxcdBucket.status != null">
          <DefaultStatusView :status="result.fluxcdBucket.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.fluxcdBucket!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.fluxcdBucket"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
