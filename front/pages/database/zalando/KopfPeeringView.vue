<script setup lang="ts">
import zalandoKopfPeeringQuery from '@/queries/zalando/KopfPeering.details.graphql'
import KopfPeeringDelete from '@/queries/zalando/KopfPeering.delete.graphql'
import zalandoKopfPeeringMeta from '@/components/zalando/KopfPeeringMeta.vue';
import zalandoKopfPeeringView from '@/components/zalando/KopfPeeringView.vue';
import zalandoKopfPeeringStatus from '@/components/zalando/KopfPeeringStatus.vue';
import { useQuery, useMutation, useKopfPeering, KopfPeeringReadExcludes } from '../../../libs/zalando/KopfPeering.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKopfPeeringFound, navigation, setNamespacedItemFromRoute } = useKopfPeering();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandoKopfPeeringQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KopfPeeringReadExcludes
  },
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotKopfPeeringFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KopfPeeringDelete);
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
      <zalandoKopfPeeringMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div>
    <div class="col-md-6">
      <zalandoKopfPeeringStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div>
    <div class="col-md-12">
      <zalandoKopfPeeringView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
        />
    </div>
  </div>
</template>
