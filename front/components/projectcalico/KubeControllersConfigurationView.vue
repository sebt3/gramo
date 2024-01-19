<script setup lang="ts">
import projectcalicoKubeControllersConfigurationQuery from '@/queries/projectcalico/KubeControllersConfigurationView.graphql'
import kubeControllersConfigurationDelete from '@/queries/projectcalico/KubeControllersConfigurationDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import DefaultStatusView from '../core/DefaultStatusView.vue';
import { ref, useQuery, useMutation, useKubeControllersConfiguration, getProperties } from './KubeControllersConfiguration.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKubeControllersConfigurationFound, navigation, setItemFromRoute, toEdit, actionDelete } = useKubeControllersConfiguration();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoKubeControllersConfigurationQuery, { "name": navigation.currentItem }, { pollInterval: 500 });onError(onErrorHandler); onResult(onNotKubeControllersConfigurationFound);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(kubeControllersConfigurationDelete);
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
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration!=undefined && result.projectcalicoKubeControllersConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">KubeControllersConfiguration
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.projectcalicoKubeControllersConfiguration.metadata.name)">
                <q-tooltip>Edit</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.projectcalicoKubeControllersConfiguration)">
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoKubeControllersConfiguration.metadata" />
        </q-card-section>
      </q-card>
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration!=undefined && result.projectcalicoKubeControllersConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoKubeControllersConfiguration!=null && result.projectcalicoKubeControllersConfiguration.status != null">
          <DefaultStatusView :status="result.projectcalicoKubeControllersConfiguration.status" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-6">
      <q-card bordered v-if="!loading && result!=undefined && result.projectcalicoKubeControllersConfiguration!=undefined && result.projectcalicoKubeControllersConfiguration!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Specification</div>
        </q-card-section>
        <q-card-section>
          <OpenApiEdit
            :in="result.projectcalicoKubeControllersConfiguration"
            :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            :read-only="true"
            :show-default="false"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
