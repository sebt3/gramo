<script setup lang="ts">
// noGramoGenerator
import automationQuery from '@/queries/fluxcd/automation.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import fluxcdKustomizationList from '@/components/fluxcd/KustomizationList.vue';
import { KustomizationListExcludes } from '../../../libs/fluxcd/Kustomization.js'
import fluxcdReceiverList from '@/components/fluxcd/ReceiverList.vue';
import { ReceiverListExcludes } from '../../../libs/fluxcd/Receiver.js'
import fluxcdAlertList from '@/components/fluxcd/AlertList.vue';
import { AlertListExcludes } from '../../../libs/fluxcd/Alert.js'
import fluxcdProviderList from '@/components/fluxcd/ProviderList.vue';
import { ProviderListExcludes } from '../../../libs/fluxcd/Provider.js'
import fluxcdGitRepositoryList from '@/components/fluxcd/GitRepositoryList.vue';
import { GitRepositoryListExcludes } from '../../../libs/fluxcd/GitRepository.js'
import fluxcdBucketList from '@/components/fluxcd/BucketList.vue';
import { BucketListExcludes } from '../../../libs/fluxcd/Bucket.js'
import fluxcdHelmChartList from '@/components/fluxcd/HelmChartList.vue';
import { HelmChartListExcludes } from '../../../libs/fluxcd/HelmChart.js'
import fluxcdHelmRepositoryList from '@/components/fluxcd/HelmRepositoryList.vue';
import { HelmRepositoryListExcludes } from '../../../libs/fluxcd/HelmRepository.js'
import fluxcdOCIRepositoryList from '@/components/fluxcd/OCIRepositoryList.vue';
import { OCIRepositoryListExcludes } from '../../../libs/fluxcd/OCIRepository.js'
import fluxcdImageUpdateAutomationList from '@/components/fluxcd/ImageUpdateAutomationList.vue';
import { ImageUpdateAutomationListExcludes } from '../../../libs/fluxcd/ImageUpdateAutomation.js'
import fluxcdImagePolicyList from '@/components/fluxcd/ImagePolicyList.vue';
import { ImagePolicyListExcludes } from '../../../libs/fluxcd/ImagePolicy.js'
import fluxcdImageRepositoryList from '@/components/fluxcd/ImageRepositoryList.vue';
import { ImageRepositoryListExcludes } from '../../../libs/fluxcd/ImageRepository.js'
import fluxcdHelmReleaseList from '@/components/fluxcd/HelmReleaseList.vue';
import { HelmReleaseListExcludes } from '../../../libs/fluxcd/HelmRelease.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const KustomizationByTs = ref([]);
const ReceiverByTs = ref([]);
const AlertByTs = ref([]);
const ProviderByTs = ref([]);
const GitRepositoryByTs = ref([]);
const BucketByTs = ref([]);
const HelmChartByTs = ref([]);
const HelmRepositoryByTs = ref([]);
const OCIRepositoryByTs = ref([]);
const ImageUpdateAutomationByTs = ref([]);
const ImagePolicyByTs = ref([]);
const ImageRepositoryByTs = ref([]);
const HelmReleaseByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(automationQuery, {
  "Kustomization": {
    "filters": [],
    "excludes": KustomizationListExcludes
  },
  "Receiver": {
    "filters": [],
    "excludes": ReceiverListExcludes
  },
  "Alert": {
    "filters": [],
    "excludes": AlertListExcludes
  },
  "Provider": {
    "filters": [],
    "excludes": ProviderListExcludes
  },
  "GitRepository": {
    "filters": [],
    "excludes": GitRepositoryListExcludes
  },
  "Bucket": {
    "filters": [],
    "excludes": BucketListExcludes
  },
  "HelmChart": {
    "filters": [],
    "excludes": HelmChartListExcludes
  },
  "HelmRepository": {
    "filters": [],
    "excludes": HelmRepositoryListExcludes
  },
  "OCIRepository": {
    "filters": [],
    "excludes": OCIRepositoryListExcludes
  },
  "ImageUpdateAutomation": {
    "filters": [],
    "excludes": ImageUpdateAutomationListExcludes
  },
  "ImagePolicy": {
    "filters": [],
    "excludes": ImagePolicyListExcludes
  },
  "ImageRepository": {
    "filters": [],
    "excludes": ImageRepositoryListExcludes
  },
  "HelmRelease": {
    "filters": [],
    "excludes": HelmReleaseListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, navigation.refreshOption);
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    KustomizationByTs.value.length = 0;
    KustomizationByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdKustomization.length}}).filter(n => n.value>0))
    ReceiverByTs.value.length = 0;
    ReceiverByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdReceiver.length}}).filter(n => n.value>0))
    AlertByTs.value.length = 0;
    AlertByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdAlert.length}}).filter(n => n.value>0))
    ProviderByTs.value.length = 0;
    ProviderByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdProvider.length}}).filter(n => n.value>0))
    GitRepositoryByTs.value.length = 0;
    GitRepositoryByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdGitRepository.length}}).filter(n => n.value>0))
    BucketByTs.value.length = 0;
    BucketByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdBucket.length}}).filter(n => n.value>0))
    HelmChartByTs.value.length = 0;
    HelmChartByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdHelmChart.length}}).filter(n => n.value>0))
    HelmRepositoryByTs.value.length = 0;
    HelmRepositoryByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdHelmRepository.length}}).filter(n => n.value>0))
    OCIRepositoryByTs.value.length = 0;
    OCIRepositoryByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdOCIRepository.length}}).filter(n => n.value>0))
    ImageUpdateAutomationByTs.value.length = 0;
    ImageUpdateAutomationByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdImageUpdateAutomation.length}}).filter(n => n.value>0))
    ImagePolicyByTs.value.length = 0;
    ImagePolicyByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdImagePolicy.length}}).filter(n => n.value>0))
    ImageRepositoryByTs.value.length = 0;
    ImageRepositoryByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdImageRepository.length}}).filter(n => n.value>0))
    HelmReleaseByTs.value.length = 0;
    HelmReleaseByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.fluxcdHelmRelease.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && KustomizationByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Kustomization per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="KustomizationByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ReceiverByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Receiver per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ReceiverByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && AlertByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Alert per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="AlertByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ProviderByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Provider per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ProviderByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && GitRepositoryByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">GitRepository per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="GitRepositoryByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && BucketByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Bucket per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="BucketByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && HelmChartByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmChart per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="HelmChartByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && HelmRepositoryByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmRepository per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="HelmRepositoryByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && OCIRepositoryByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">OCIRepository per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="OCIRepositoryByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ImageUpdateAutomationByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImageUpdateAutomation per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ImageUpdateAutomationByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ImagePolicyByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImagePolicy per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ImagePolicyByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ImageRepositoryByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ImageRepository per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ImageRepositoryByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && HelmReleaseByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">HelmRelease per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="HelmReleaseByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <fluxcdOCIRepositoryList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdOCIRepository']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdOCIRepository).flat()"
  />
  <fluxcdBucketList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdBucket']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdBucket).flat()"
  />
  <fluxcdImageRepositoryList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdImageRepository']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdImageRepository).flat()"
  />
  <fluxcdImagePolicyList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdImagePolicy']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdImagePolicy).flat()"
  />
  <fluxcdImageUpdateAutomationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdImageUpdateAutomation']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdImageUpdateAutomation).flat()"
  />
  <fluxcdGitRepositoryList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdGitRepository']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdGitRepository).flat()"
  />
  <fluxcdKustomizationList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdKustomization']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdKustomization).flat()"
  />
  <fluxcdProviderList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdProvider']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdProvider).flat()"
  />
  <fluxcdAlertList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdAlert']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdAlert).flat()"
  />
  <fluxcdReceiverList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdReceiver']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdReceiver).flat()"
  />
  <fluxcdHelmChartList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdHelmChart']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdHelmChart).flat()"
  />
  <fluxcdHelmRepositoryList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdHelmRepository']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdHelmRepository).flat()"
  />
  <fluxcdHelmReleaseList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['fluxcdHelmRelease']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.fluxcdHelmRelease).flat()"
  />
</template>