<script setup lang="ts">
import projectcalicoClusterInformationQuery from '@/queries/projectcalico/ClusterInformation.details.graphql'
import ClusterInformationDelete from '@/queries/projectcalico/ClusterInformation.delete.graphql'
import projectcalicoClusterInformationMeta from '@/components/projectcalico/ClusterInformationMeta.vue';
import projectcalicoClusterInformationView from '@/components/projectcalico/ClusterInformationView.vue';
import { useQuery, useMutation, useClusterInformation, ClusterInformationReadExcludes } from '../../../libs/projectcalico/ClusterInformation.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterInformationFound, navigation, setItemFromRoute } = useClusterInformation();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoClusterInformationQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterInformationReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotClusterInformationFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterInformationDelete);
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
    <div class="col-md-3">
      <projectcalicoClusterInformationMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoClusterInformation[0]!=undefined && result.projectcalicoClusterInformation[0]!=null"
        :model="result.projectcalicoClusterInformation[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoClusterInformationView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoClusterInformation[0]!=undefined && result.projectcalicoClusterInformation[0]!=null"
        :model="result.projectcalicoClusterInformation[0]"
        />
    </div>
  </div>
</template>
