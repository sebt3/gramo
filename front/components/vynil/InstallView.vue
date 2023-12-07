<script setup lang="ts">
import vynilInstallQuery from '@/queries/vynil/InstallView.graphql'
import installDelete from '@/queries/vynil/InstallDelete.graphql'
import MetadataView from '../core/MetadataView.vue';
import OpenApiEdit from '../core/OpenApiEdit.vue';
import { useInstall, useMutation, useQuery } from './Install.js'
const { deleteDone, deleteError, onErrorHandler, onNotInstallFound, navigation, setNamespacedItemFromRoute, toEdit, actionDelete, toViewReloaded } = useInstall();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilInstallQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(installDelete);
onResult(onNotInstallFound);onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Install
            <q-btn-group push class="float-right text-capitalize shadow-3">
              <q-btn icon="edit" @click="toEdit(result.vynilInstall.metadata.namespace, result.vynilInstall.metadata.name)" v-if="result.vynilInstall.metadata.labels == undefined || result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length==0">
                <q-tooltip>Edit install {{ result.vynilInstall.metadata.name }}</q-tooltip>
              </q-btn>
              <q-btn icon="delete" @click="actionDelete(deletor, result.vynilInstall)" v-if="result.vynilInstall.metadata.labels == undefined || result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length==0">
                <q-tooltip>Delete install {{ result.vynilInstall.metadata.name }}</q-tooltip>
              </q-btn>
              <q-btn icon="arrow_upward" @click="toViewReloaded(result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-namespace')[0].value,result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name')[0].value);" v-if="result.vynilInstall.metadata.labels != undefined && result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name').length>0">
                <q-tooltip>view parent install {{ result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-namespace')[0].value }}.{{ result.vynilInstall.metadata.labels.filter(l=>l.name == 'vynil.solidite.fr/owner-name')[0].value }}</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.vynilInstall.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Status" stack-label borderless>
              <template v-slot:prepend><q-icon name="done" /></template>
              <template v-slot:control>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="warning" v-if="['planning','installing'].includes(result.vynilInstall.status.status)"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="positive" v-if="result.vynilInstall.status.status=='installed'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="negative" v-if="result.vynilInstall.status.status=='errors'"></q-chip>
                <q-chip class="float-right text-white text-capitalize" :label="result.vynilInstall.status.status" color="info" v-if="!['installed','planning','installing','errors'].includes(result.vynilInstall.status.status)"></q-chip>
              </template>
            </q-field>
            <q-field label="Errors" stack-label borderless v-if="result.vynilInstall.status.errors.length>0">
              <template v-slot:prepend><q-icon name="error" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">
                <div v-for="err in result.vynilInstall.status.errors" v-bind:key="err">{{ err }}</div>
              </div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div><div class="col-md-4">
      <q-card bordered v-if="!loading && result!=null && result.vynilInstall!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h5 q-mt-none q-mb-none q-pt-none q-pb-none">Package</div>
        </q-card-section>
        <q-card-section>
          <div class="q-gutter-md">
            <q-field label="Distribution" stack-label borderless>
              <template v-slot:prepend><q-icon name="alt_route" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.distrib.metadata.name }}</div></template>
            </q-field>
            <q-field label="Category" stack-label borderless>
              <template v-slot:prepend><q-icon name="category" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.category.name }}</div></template>
            </q-field>
            <q-field label="Name" stack-label borderless>
              <template v-slot:prepend><q-icon name="smart_button" /></template>
              <template v-slot:control><div class="self-center full-width no-outline" tabindex="0">{{ result.vynilInstall.component.name }}</div></template>
            </q-field>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
    <q-card v-if="!loading && result!=null && result.vynilInstall!=null">
      <q-card-section>
        <div class="text-h5 q-mt-none q-mb-none">Options</div>
      </q-card-section>
      <q-card-section>
        <OpenApiEdit
            :in="result.vynilInstall.options"
            :properties="new Map(Object.entries(result.vynilInstall.component.options))"
            :read-only="true"
            :show-default="false"
          />
      </q-card-section>
    </q-card>
</template>
