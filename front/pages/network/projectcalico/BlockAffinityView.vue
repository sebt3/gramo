<script setup lang="ts">
import projectcalicoBlockAffinityQuery from '@/queries/projectcalico/BlockAffinity.details.graphql'
import BlockAffinityDelete from '@/queries/projectcalico/BlockAffinity.delete.graphql'
import projectcalicoBlockAffinityMeta from '@/components/projectcalico/BlockAffinityMeta.vue';
import projectcalicoBlockAffinityView from '@/components/projectcalico/BlockAffinityView.vue';
import { useQuery, useMutation, useBlockAffinity, BlockAffinityReadExcludes } from '../../../libs/projectcalico/BlockAffinity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBlockAffinityFound, navigation, setItemFromRoute } = useBlockAffinity();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBlockAffinityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BlockAffinityReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotBlockAffinityFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BlockAffinityDelete);
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
      <projectcalicoBlockAffinityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity[0]!=undefined && result.projectcalicoBlockAffinity[0]!=null"
        :model="result.projectcalicoBlockAffinity[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoBlockAffinityView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoBlockAffinity[0]!=undefined && result.projectcalicoBlockAffinity[0]!=null"
        :model="result.projectcalicoBlockAffinity[0]"
        />
    </div>
  </div>
</template>
