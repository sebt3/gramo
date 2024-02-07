<script setup lang="ts">
import databaseQuery from '@/queries/oracle/database.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import oracleInnoDBClusterList from '@/components/oracle/InnoDBClusterList.vue';
import { InnoDBClusterListExcludes } from '../../../libs/oracle/InnoDBCluster.js'
import oracleMySQLBackupList from '@/components/oracle/MySQLBackupList.vue';
import { MySQLBackupListExcludes } from '../../../libs/oracle/MySQLBackup.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const InnoDBClusterByTs = ref([]);
const MySQLBackupByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(databaseQuery, {
  "InnoDBCluster": {
    "filters": [],
    "excludes": InnoDBClusterListExcludes
  },
  "MySQLBackup": {
    "filters": [],
    "excludes": MySQLBackupListExcludes
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
    InnoDBClusterByTs.value.length = 0;
    InnoDBClusterByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.oracleInnoDBCluster.length}}).filter(n => n.value>0))
    MySQLBackupByTs.value.length = 0;
    MySQLBackupByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.oracleMySQLBackup.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && InnoDBClusterByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">InnoDBCluster per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="InnoDBClusterByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && MySQLBackupByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MySQLBackup per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="MySQLBackupByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <oracleInnoDBClusterList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['oracleInnoDBCluster']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.oracleInnoDBCluster).flat()"
  />
  <oracleMySQLBackupList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['oracleMySQLBackup']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.oracleMySQLBackup).flat()"
  />
</template>