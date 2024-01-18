<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDBView.graphql'
import mariaDBDelete from '@/queries/mariadb/MariaDBDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useMariaDB, getProperties } from './MariaDB.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMariaDBFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete } = useMariaDB();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbMariaDBQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotMariaDBFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(mariaDBDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.mariadbMariaDB!=undefined && result.mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MariaDB
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.mariadbMariaDB.metadata.namespace, result.mariadbMariaDB.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.mariadbMariaDB)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.mariadbMariaDB.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.mariadbMariaDB!=undefined && result.mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.mariadbMariaDB!=null && result.mariadbMariaDB.status != null">
          <DefaultStatusView :status="result.mariadbMariaDB.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.mariadbMariaDB!=undefined && result.mariadbMariaDB!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.mariadbMariaDB"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
