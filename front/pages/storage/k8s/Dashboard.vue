<script setup lang="ts">
import storageQuery from '@/queries/k8s/storage.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import k8sPersistentVolumeList from '@/components/k8s/PersistentVolumeList.vue';
import { PersistentVolumeListExcludes } from '../../../libs/k8s/PersistentVolume.js'
import k8sPersistentVolumeClaimList from '@/components/k8s/PersistentVolumeClaimList.vue';
import { PersistentVolumeClaimListExcludes } from '../../../libs/k8s/PersistentVolumeClaim.js'
import k8sStorageClassList from '@/components/k8s/StorageClassList.vue';
import { StorageClassListExcludes } from '../../../libs/k8s/StorageClass.js'
import k8sCSIDriverList from '@/components/k8s/CSIDriverList.vue';
import { CSIDriverListExcludes } from '../../../libs/k8s/CSIDriver.js'
import k8sCSINodeList from '@/components/k8s/CSINodeList.vue';
import { CSINodeListExcludes } from '../../../libs/k8s/CSINode.js'
import k8sCSIStorageCapacityList from '@/components/k8s/CSIStorageCapacityList.vue';
import { CSIStorageCapacityListExcludes } from '../../../libs/k8s/CSIStorageCapacity.js'
import k8sVolumeAttachmentList from '@/components/k8s/VolumeAttachmentList.vue';
import { VolumeAttachmentListExcludes } from '../../../libs/k8s/VolumeAttachment.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const PersistentVolumeClaimByTs = ref([]);
const CSIStorageCapacityByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(storageQuery, {
  "PersistentVolume": {
    "filters": [],
    "excludes": PersistentVolumeListExcludes
  },
  "PersistentVolumeClaim": {
    "filters": [],
    "excludes": PersistentVolumeClaimListExcludes
  },
  "StorageClass": {
    "filters": [],
    "excludes": StorageClassListExcludes
  },
  "CSIDriver": {
    "filters": [],
    "excludes": CSIDriverListExcludes
  },
  "CSINode": {
    "filters": [],
    "excludes": CSINodeListExcludes
  },
  "CSIStorageCapacity": {
    "filters": [],
    "excludes": CSIStorageCapacityListExcludes
  },
  "VolumeAttachment": {
    "filters": [],
    "excludes": VolumeAttachmentListExcludes
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
    PersistentVolumeClaimByTs.value.length = 0;
    PersistentVolumeClaimByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sPersistentVolumeClaim.length}}).filter(n => n.value>0))
    CSIStorageCapacityByTs.value.length = 0;
    CSIStorageCapacityByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.k8sCSIStorageCapacity.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm" v-if="isNamespaced()">
    <div class="col-lg-4" v-if="ready && PersistentVolumeClaimByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">PersistentVolumeClaim per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PersistentVolumeClaimByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && CSIStorageCapacityByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CSIStorageCapacity per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="CSIStorageCapacityByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <k8sPersistentVolumeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sPersistentVolume']) && result['k8sPersistentVolume'].length>0"
    :model="result.k8sPersistentVolume"
  />
  <k8sPersistentVolumeClaimList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sPersistentVolumeClaim']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sPersistentVolumeClaim).flat()"
  />
  <k8sStorageClassList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sStorageClass']) && result['k8sStorageClass'].length>0"
    :model="result.k8sStorageClass"
  />
  <k8sCSIDriverList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sCSIDriver']) && result['k8sCSIDriver'].length>0"
    :model="result.k8sCSIDriver"
  />
  <k8sCSINodeList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sCSINode']) && result['k8sCSINode'].length>0"
    :model="result.k8sCSINode"
  />
  <k8sCSIStorageCapacityList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['k8sCSIStorageCapacity']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.k8sCSIStorageCapacity).flat()"
  />
  <k8sVolumeAttachmentList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sVolumeAttachment']) && result['k8sVolumeAttachment'].length>0"
    :model="result.k8sVolumeAttachment"
  />
</template>