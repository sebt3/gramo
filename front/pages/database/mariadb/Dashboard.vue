<script setup lang="ts">
import databaseQuery from '@/queries/mariadb/database.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import mariadbBackupList from '@/components/mariadb/BackupList.vue';
import { BackupListExcludes } from '../../../libs/mariadb/Backup.js'
import mariadbConnectionList from '@/components/mariadb/ConnectionList.vue';
import { ConnectionListExcludes } from '../../../libs/mariadb/Connection.js'
import mariadbDatabaseList from '@/components/mariadb/DatabaseList.vue';
import { DatabaseListExcludes } from '../../../libs/mariadb/Database.js'
import mariadbGrantList from '@/components/mariadb/GrantList.vue';
import { GrantListExcludes } from '../../../libs/mariadb/Grant.js'
import mariadbMariaDBList from '@/components/mariadb/MariaDBList.vue';
import { MariaDBListExcludes } from '../../../libs/mariadb/MariaDB.js'
import mariadbRestoreList from '@/components/mariadb/RestoreList.vue';
import { RestoreListExcludes } from '../../../libs/mariadb/Restore.js'
import mariadbSqlJobList from '@/components/mariadb/SqlJobList.vue';
import { SqlJobListExcludes } from '../../../libs/mariadb/SqlJob.js'
import mariadbUserList from '@/components/mariadb/UserList.vue';
import { UserListExcludes } from '../../../libs/mariadb/User.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const BackupByTs = ref([]);
const ConnectionByTs = ref([]);
const DatabaseByTs = ref([]);
const GrantByTs = ref([]);
const MariaDBByTs = ref([]);
const RestoreByTs = ref([]);
const SqlJobByTs = ref([]);
const UserByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(databaseQuery, {
  "Backup": {
    "filters": [],
    "excludes": BackupListExcludes
  },
  "Connection": {
    "filters": [],
    "excludes": ConnectionListExcludes
  },
  "Database": {
    "filters": [],
    "excludes": DatabaseListExcludes
  },
  "Grant": {
    "filters": [],
    "excludes": GrantListExcludes
  },
  "MariaDB": {
    "filters": [],
    "excludes": MariaDBListExcludes
  },
  "Restore": {
    "filters": [],
    "excludes": RestoreListExcludes
  },
  "SqlJob": {
    "filters": [],
    "excludes": SqlJobListExcludes
  },
  "User": {
    "filters": [],
    "excludes": UserListExcludes
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
    BackupByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbBackup.length}}).filter(n => n.value>0))
    ConnectionByTs.value.length = 0;
    ConnectionByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbConnection.length}}).filter(n => n.value>0))
    DatabaseByTs.value.length = 0;
    DatabaseByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbDatabase.length}}).filter(n => n.value>0))
    GrantByTs.value.length = 0;
    GrantByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbGrant.length}}).filter(n => n.value>0))
    MariaDBByTs.value.length = 0;
    MariaDBByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbMariaDB.length}}).filter(n => n.value>0))
    RestoreByTs.value.length = 0;
    RestoreByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbRestore.length}}).filter(n => n.value>0))
    SqlJobByTs.value.length = 0;
    SqlJobByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbSqlJob.length}}).filter(n => n.value>0))
    UserByTs.value.length = 0;
    UserByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.mariadbUser.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
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
    <div class="col-lg-4" v-if="ready && ConnectionByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Connection per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ConnectionByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && DatabaseByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Database per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="DatabaseByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && GrantByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Grant per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="GrantByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && MariaDBByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">MariaDB per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="MariaDBByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && RestoreByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Restore per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="RestoreByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && SqlJobByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">SqlJob per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="SqlJobByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && UserByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">User per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="UserByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <mariadbBackupList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbBackup']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbBackup).flat()"
  />
  <mariadbConnectionList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbConnection']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbConnection).flat()"
  />
  <mariadbDatabaseList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbDatabase']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbDatabase).flat()"
  />
  <mariadbGrantList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbGrant']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbGrant).flat()"
  />
  <mariadbMariaDBList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbMariaDB']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbMariaDB).flat()"
  />
  <mariadbRestoreList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbRestore']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbRestore).flat()"
  />
  <mariadbSqlJobList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbSqlJob']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbSqlJob).flat()"
  />
  <mariadbUserList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['mariadbUser']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.mariadbUser).flat()"
  />
</template>