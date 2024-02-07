<script setup lang="ts">
import systemQuery from '@/queries/k8up/system.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8upArchiveList from '@/components/k8up/ArchiveList.vue';
import { ArchiveListExcludes } from '../../../libs/k8up/Archive.js'
import k8upBackupList from '@/components/k8up/BackupList.vue';
import { BackupListExcludes } from '../../../libs/k8up/Backup.js'
import k8upCheckList from '@/components/k8up/CheckList.vue';
import { CheckListExcludes } from '../../../libs/k8up/Check.js'
import k8upPreBackupPodList from '@/components/k8up/PreBackupPodList.vue';
import { PreBackupPodListExcludes } from '../../../libs/k8up/PreBackupPod.js'
import k8upPruneList from '@/components/k8up/PruneList.vue';
import { PruneListExcludes } from '../../../libs/k8up/Prune.js'
import k8upRestoreList from '@/components/k8up/RestoreList.vue';
import { RestoreListExcludes } from '../../../libs/k8up/Restore.js'
import k8upScheduleList from '@/components/k8up/ScheduleList.vue';
import { ScheduleListExcludes } from '../../../libs/k8up/Schedule.js'
import k8upSnapshotList from '@/components/k8up/SnapshotList.vue';
import { SnapshotListExcludes } from '../../../libs/k8up/Snapshot.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const ArchiveByTs = ref([]);
const BackupByTs = ref([]);
const CheckByTs = ref([]);
const PreBackupPodByTs = ref([]);
const PruneByTs = ref([]);
const RestoreByTs = ref([]);
const ScheduleByTs = ref([]);
const SnapshotByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(systemQuery, {
  "Archive": {
    "filters": [],
    "excludes": ArchiveListExcludes
  },
  "Backup": {
    "filters": [],
    "excludes": BackupListExcludes
  },
  "Check": {
    "filters": [],
    "excludes": CheckListExcludes
  },
  "PreBackupPod": {
    "filters": [],
    "excludes": PreBackupPodListExcludes
  },
  "Prune": {
    "filters": [],
    "excludes": PruneListExcludes
  },
  "Restore": {
    "filters": [],
    "excludes": RestoreListExcludes
  },
  "Schedule": {
    "filters": [],
    "excludes": ScheduleListExcludes
  },
  "Snapshot": {
    "filters": [],
    "excludes": SnapshotListExcludes
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
    ArchiveByTs.value.length = 0;
    ArchiveByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upArchive.length}}).filter(n => n.value>0))
    BackupByTs.value.length = 0;
    BackupByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upBackup.length}}).filter(n => n.value>0))
    CheckByTs.value.length = 0;
    CheckByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upCheck.length}}).filter(n => n.value>0))
    PreBackupPodByTs.value.length = 0;
    PreBackupPodByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upPreBackupPod.length}}).filter(n => n.value>0))
    PruneByTs.value.length = 0;
    PruneByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upPrune.length}}).filter(n => n.value>0))
    RestoreByTs.value.length = 0;
    RestoreByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upRestore.length}}).filter(n => n.value>0))
    ScheduleByTs.value.length = 0;
    ScheduleByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upSchedule.length}}).filter(n => n.value>0))
    SnapshotByTs.value.length = 0;
    SnapshotByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8upSnapshot.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && ArchiveByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Archive per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ArchiveByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
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
    <div class="col-lg-4" v-if="ready && CheckByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Check per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="CheckByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PreBackupPodByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PreBackupPod per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PreBackupPodByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && PruneByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Prune per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PruneByTs"></pieChart>
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
    <div class="col-lg-4" v-if="ready && ScheduleByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Schedule per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ScheduleByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && SnapshotByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Snapshot per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="SnapshotByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8upArchiveList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upArchive']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upArchive).flat()"
  />
  <k8upBackupList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upBackup']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upBackup).flat()"
  />
  <k8upCheckList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upCheck']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upCheck).flat()"
  />
  <k8upPreBackupPodList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upPreBackupPod']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upPreBackupPod).flat()"
  />
  <k8upPruneList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upPrune']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upPrune).flat()"
  />
  <k8upRestoreList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upRestore']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upRestore).flat()"
  />
  <k8upScheduleList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upSchedule']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upSchedule).flat()"
  />
  <k8upSnapshotList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8upSnapshot']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8upSnapshot).flat()"
  />
</template>