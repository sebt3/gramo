<script setup lang="ts">
import mariadbUserQuery from '@/queries/mariadb/UserView.graphql'
import userEdit from '@/queries/mariadb/UserEdit.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useUser, sanitizeData, getProperties } from './User.js'
const data = ref({});
const { patchDone, patchError, notifyWorking, onNotUserFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useUser();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbUserQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchUser, onDone: onPatchUser, onError: onPatchError } = useMutation(userEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchUser({"namespace": result.value.mariadbUser.metadata.namespace, "name": result.value.mariadbUser.metadata.name, "spec": sanitizeData(data.value)});
}
onError(onErrorHandler);onResult(onNotUserFound);onPatchUser(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbUser!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">User</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbUser.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.mariadbUser!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbUser!=null && result.mariadbUser.status != null">
          <DefaultStatusView :status="result.mariadbUser.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && result.mariadbUser!=null" class="q-ma-sm">
      <q-card-section>
        <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
          v-model:out="data"
          :in="result.mariadbUser"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>
