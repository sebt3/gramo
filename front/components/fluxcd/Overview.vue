<script setup lang="ts">
import fluxcdOverviewQuery from '@/queries/fluxcd/Overview.graphql'
import TableHeader from '../core/TableHeader.vue';
import { ref, useQuery, useAlert, alertAllColumns } from './Alert.js'
import { useBucket, bucketAllColumns } from './Bucket.js'
import { useGitRepository, gitRepositoryAllColumns } from './GitRepository.js'
import { useHelmChart, helmChartAllColumns } from './HelmChart.js'
import { useHelmRelease, helmReleaseAllColumns } from './HelmRelease.js'
import { useHelmRepository, helmRepositoryAllColumns } from './HelmRepository.js'
import { useImagePolicy, imagePolicyAllColumns } from './ImagePolicy.js'
import { useImageRepository, imageRepositoryAllColumns } from './ImageRepository.js'
import { useImageUpdateAutomation, imageUpdateAutomationAllColumns } from './ImageUpdateAutomation.js'
import { useKustomization, kustomizationAllColumns } from './Kustomization.js'
import { useOCIRepository, oCIRepositoryAllColumns } from './OCIRepository.js'
import { useProvider, providerAllColumns } from './Provider.js'
import { useReceiver, receiverAllColumns } from './Receiver.js'
let filterReceiver = ref('');
let filterProvider = ref('');
let filterOCIRepository = ref('');
let filterKustomization = ref('');
let filterImageUpdateAutomation = ref('');
let filterImageRepository = ref('');
let filterImagePolicy = ref('');
let filterHelmRepository = ref('');
let filterHelmRelease = ref('');
let filterHelmChart = ref('');
let filterGitRepository = ref('');
let filterAlert = ref('');
let filterBucket = ref('');
const { toEdit: toAlertEdit, actionDelete: actionAlertDelete, onErrorHandler, navigation, pagination } = useAlert();
const { toEdit: toBucketEdit, actionDelete: actionBucketDelete } = useBucket();
const { toEdit: toGitRepositoryEdit, actionDelete: actionGitRepositoryDelete } = useGitRepository();
const { toEdit: toHelmChartEdit, actionDelete: actionHelmChartDelete } = useHelmChart();
const { toEdit: toHelmReleaseEdit, actionDelete: actionHelmReleaseDelete } = useHelmRelease();
const { toEdit: toHelmRepositoryEdit, actionDelete: actionHelmRepositoryDelete } = useHelmRepository();
const { toEdit: toImagePolicyEdit, actionDelete: actionImagePolicyDelete } = useImagePolicy();
const { toEdit: toImageRepositoryEdit, actionDelete: actionImageRepositoryDelete } = useImageRepository();
const { toEdit: toImageUpdateAutomationEdit, actionDelete: actionImageUpdateAutomationDelete } = useImageUpdateAutomation();
const { toEdit: toKustomizationEdit, actionDelete: actionKustomizationDelete } = useKustomization();
const { toEdit: toOCIRepositoryEdit, actionDelete: actionOCIRepositoryDelete } = useOCIRepository();
const { toEdit: toProviderEdit, actionDelete: actionProviderDelete } = useProvider();
const { toEdit: toReceiverEdit, actionDelete: actionReceiverDelete } = useReceiver();
const { result, refetch, onError, loading } = useQuery(fluxcdOverviewQuery, {}, { pollInterval: 500 });onError(onErrorHandler);
</script>
<template>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdImageRepositorys).flat().length>0">
    <TableHeader title="Image Repositories" v-model:model-filter="filterImageRepository" itemtype='fluxcd ImageRepository' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdImageRepositorys).flat()" :columns="imageRepositoryAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterImageRepository" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImageRepositoryTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImageRepositoryView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toImageRepositoryEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit imageRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionImageRepositoryDelete(props.row)">
              <q-tooltip>Delete imageRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdImagePolicys).flat().length>0">
    <TableHeader title="Image Policies" v-model:model-filter="filterImagePolicy" itemtype='fluxcd ImagePolicy' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdImagePolicys).flat()" :columns="imagePolicyAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterImagePolicy" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImagePolicyTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImagePolicyView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toImagePolicyEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit imagePolicy {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionImagePolicyDelete(props.row)">
              <q-tooltip>Delete imagePolicy {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdImageUpdateAutomations).flat().length>0">
    <TableHeader title="ImageUpdateAutomations" v-model:model-filter="filterImageUpdateAutomation" itemtype='fluxcd ImageUpdateAutomation' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdImageUpdateAutomations).flat()" :columns="imageUpdateAutomationAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterImageUpdateAutomation" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImageUpdateAutomationTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdImageUpdateAutomationView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toImageUpdateAutomationEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit imageUpdateAutomation {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionImageUpdateAutomationDelete(props.row)">
              <q-tooltip>Delete imageUpdateAutomation {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdGitRepositorys).flat().length>0">
    <TableHeader title="Git Repositories" v-model:model-filter="filterGitRepository" itemtype='fluxcd GitRepository' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdGitRepositorys).flat()" :columns="gitRepositoryAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterGitRepository" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdGitRepositoryTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdGitRepositoryView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toGitRepositoryEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit gitRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionGitRepositoryDelete(props.row)">
              <q-tooltip>Delete gitRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdKustomizations).flat().length>0">
    <TableHeader title="Kustomizations" v-model:model-filter="filterKustomization" itemtype='fluxcd Kustomization' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdKustomizations).flat()" :columns="kustomizationAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterKustomization" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdKustomizationTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdKustomizationView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toKustomizationEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit kustomization {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionKustomizationDelete(props.row)">
              <q-tooltip>Delete kustomization {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdReceivers).flat().length>0">
    <TableHeader title="Receivers" v-model:model-filter="filterReceiver" itemtype='fluxcd Receiver' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdReceivers).flat()" :columns="receiverAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterReceiver" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdReceiverTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdReceiverView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toReceiverEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit receiver {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionReceiverDelete(props.row)">
              <q-tooltip>Delete receiver {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdProviders).flat().length>0">
    <TableHeader title="Providers" v-model:model-filter="filterProvider" itemtype='fluxcd Provider' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdProviders).flat()" :columns="providerAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterProvider" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdProviderTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdProviderView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toProviderEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit provider {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionProviderDelete(props.row)">
              <q-tooltip>Delete provider {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdOCIRepositorys).flat().length>0">
    <TableHeader title="OCIRepositorys" v-model:model-filter="filterOCIRepository" itemtype='fluxcd OCIRepository' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdOCIRepositorys).flat()" :columns="oCIRepositoryAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterOCIRepository" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdOCIRepositoryTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdOCIRepositoryView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toOCIRepositoryEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit oCIRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionOCIRepositoryDelete(props.row)">
              <q-tooltip>Delete oCIRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdHelmRepositorys).flat().length>0">
    <TableHeader title="HelmRepositorys" v-model:model-filter="filterHelmRepository" itemtype='fluxcd HelmRepository' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdHelmRepositorys).flat()" :columns="helmRepositoryAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterHelmRepository" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdHelmRepositoryTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdHelmRepositoryView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toHelmRepositoryEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit helmRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionHelmRepositoryDelete(props.row)">
              <q-tooltip>Delete helmRepository {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdHelmReleases).flat().length>0">
    <TableHeader title="HelmReleases" v-model:model-filter="filterHelmRelease" itemtype='fluxcd HelmRelease' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdHelmReleases).flat()" :columns="helmReleaseAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterHelmRelease" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdHelmReleaseTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdHelmReleaseView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toHelmReleaseEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit helmRelease {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionHelmReleaseDelete(props.row)">
              <q-tooltip>Delete helmRelease {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdHelmCharts).flat().length>0">
    <TableHeader title="HelmCharts" v-model:model-filter="filterHelmChart" itemtype='fluxcd HelmChart' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdHelmCharts).flat()" :columns="helmChartAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterHelmChart" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdHelmChartTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdHelmChartView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toHelmChartEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit helmChart {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionHelmChartDelete(props.row)">
              <q-tooltip>Delete helmChart {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdBuckets).flat().length>0">
    <TableHeader title="Buckets" v-model:model-filter="filterBucket" itemtype='fluxcd Bucket' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdBuckets).flat()" :columns="bucketAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterBucket" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdBucketTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdBucketView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toBucketEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit bucket {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionBucketDelete(props.row)">
              <q-tooltip>Delete bucket {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-card class="q-ma-sm" bordered v-if="!loading && result.namespaces.map(x=>x.fluxcdAlerts).flat().length>0">
    <TableHeader title="Alerts" v-model:model-filter="filterAlert" itemtype='fluxcd Alert' @refresh="refetch()" :usecreate="false" />
    <q-card-section class="q-pa-none">
      <q-table v-if="result !== undefined" :rows="result.namespaces.map(x=>x.fluxcdAlerts).flat()" :columns="alertAllColumns" class="no-shadow" v-model:pagination="pagination" :filter="filterAlert" hide-bottom>
        <template v-slot:body-cell-Namespace="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdAlertTable', params: { namespace: props.row.metadata.namespace }}">{{ props.row.metadata.namespace }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <router-link :to="{ name: 'fluxcdAlertView', params: { namespace: props.row.metadata.namespace, name: props.row.metadata.name }}">{{ props.row.metadata.name }}</router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" class="q-ml-sm" flat dense @click="toAlertEdit(navigation.currentNamespace.value, props.row.metadata.name)">
              <q-tooltip>Edit alert {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense @click="actionAlertDelete(props.row)">
              <q-tooltip>Delete alert {{ props.row.metadata.name }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
