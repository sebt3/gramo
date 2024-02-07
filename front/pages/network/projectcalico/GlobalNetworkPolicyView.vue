<script setup lang="ts">
import projectcalicoGlobalNetworkPolicyQuery from '@/queries/projectcalico/GlobalNetworkPolicy.details.graphql'
import GlobalNetworkPolicyDelete from '@/queries/projectcalico/GlobalNetworkPolicy.delete.graphql'
import projectcalicoGlobalNetworkPolicyMeta from '@/components/projectcalico/GlobalNetworkPolicyMeta.vue';
import projectcalicoGlobalNetworkPolicyView from '@/components/projectcalico/GlobalNetworkPolicyView.vue';
import { useQuery, useMutation, useGlobalNetworkPolicy, GlobalNetworkPolicyReadExcludes } from '../../../libs/projectcalico/GlobalNetworkPolicy.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGlobalNetworkPolicyFound, navigation, setItemFromRoute } = useGlobalNetworkPolicy();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoGlobalNetworkPolicyQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GlobalNetworkPolicyReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotGlobalNetworkPolicyFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GlobalNetworkPolicyDelete);
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
      <projectcalicoGlobalNetworkPolicyMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=null"
        :model="result.projectcalicoGlobalNetworkPolicy[0]"
       />
    </div>
    <div class="col-md-12">
      <projectcalicoGlobalNetworkPolicyView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=undefined && result.projectcalicoGlobalNetworkPolicy[0]!=null"
        :model="result.projectcalicoGlobalNetworkPolicy[0]"
        />
    </div>
  </div>
</template>
