<script setup lang="ts">
import databaseQuery from '@/queries/cnpg/database.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import cnpgBackupList from '@/components/cnpg/BackupList.vue';
import { BackupListExcludes } from '../../../libs/cnpg/Backup.js'
import cnpgClusterList from '@/components/cnpg/ClusterList.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/Cluster.js'
import cnpgPoolerList from '@/components/cnpg/PoolerList.vue';
import { PoolerListExcludes } from '../../../libs/cnpg/Pooler.js'
import cnpgScheduledBackupList from '@/components/cnpg/ScheduledBackupList.vue';
import { ScheduledBackupListExcludes } from '../../../libs/cnpg/ScheduledBackup.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const BackupByTs = ref([]);
const ClusterByTs = ref([]);
const PoolerByTs = ref([]);
const ScheduledBackupByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(databaseQuery, {
  "Backup": {
    "filters": [],
    "excludes": BackupListExcludes
  },
  "Cluster": {
    "filters": [],
    "excludes": ClusterListExcludes
  },
  "Pooler": {
    "filters": [],
    "excludes": PoolerListExcludes
  },
  "ScheduledBackup": {
    "filters": [],
    "excludes": ScheduledBackupListExcludes
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
}, { pollInterval: 2000 });
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    BackupByTs.value.length = 0;
    BackupByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.cnpgBackup.length}}).filter(n => n.value>0))
    ClusterByTs.value.length = 0;
    ClusterByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.cnpgCluster.length}}).filter(n => n.value>0))
    PoolerByTs.value.length = 0;
    PoolerByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.cnpgPooler.length}}).filter(n => n.value>0))
    ScheduledBackupByTs.value.length = 0;
    ScheduledBackupByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.cnpgScheduledBackup.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && BackupByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Backup per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="BackupByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ClusterByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Cluster per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ClusterByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PoolerByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Pooler per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PoolerByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ScheduledBackupByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ScheduledBackup per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ScheduledBackupByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <cnpgBackupList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['cnpgBackup']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.cnpgBackup).flat()"
  />
  <cnpgClusterList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['cnpgCluster']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.cnpgCluster).flat()"
  />
  <cnpgPoolerList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['cnpgPooler']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.cnpgPooler).flat()"
  />
  <cnpgScheduledBackupList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['cnpgScheduledBackup']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.cnpgScheduledBackup).flat()"
  />
</template>