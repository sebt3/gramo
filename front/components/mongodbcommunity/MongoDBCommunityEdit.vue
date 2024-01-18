<script setup lang="ts">
import mongodbcommunityMongoDBCommunityQuery from '@/queries/mongodbcommunity/MongoDBCommunityView.graphql'
import mongoDBCommunityEdit from '@/queries/mongodbcommunity/MongoDBCommunityEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useMongoDBCommunity, sanitizeData, getProperties } from './MongoDBCommunity.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotMongoDBCommunityFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useMongoDBCommunity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mongodbcommunityMongoDBCommunityQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchMongoDBCommunity, onDone: onPatchMongoDBCommunity, onError: onPatchError } = useMutation(mongoDBCommunityEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchMongoDBCommunity({"namespace": result.value.mongodbcommunityMongoDBCommunity.metadata.namespace, "name": result.value.mongodbcommunityMongoDBCommunity.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotMongoDBCommunityFound);onPatchMongoDBCommunity(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mongodbcommunityMongoDBCommunity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MongoDBCommunity</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mongodbcommunityMongoDBCommunity.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mongodbcommunityMongoDBCommunity!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mongodbcommunityMongoDBCommunity!=null && result.mongodbcommunityMongoDBCommunity.status != null">
          <DefaultStatusView :status="result.mongodbcommunityMongoDBCommunity.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mongodbcommunityMongoDBCommunity!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mongodbcommunityMongoDBCommunity"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
