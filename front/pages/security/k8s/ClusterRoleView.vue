<script setup lang="ts">
import k8sClusterRoleQuery from '@/queries/k8s/ClusterRole.details.graphql'
import ClusterRoleDelete from '@/queries/k8s/ClusterRole.delete.graphql'
import k8sClusterRoleMeta from '@/components/k8s/ClusterRoleMeta.vue';
import k8sClusterRoleView from '@/components/k8s/ClusterRoleView.vue';
import { ClusterRoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import k8sClusterRoleBindingList from '@/components/k8s/ClusterRoleBindingList.vue';
import { useQuery, useMutation, useClusterRole, ClusterRoleReadExcludes } from '../../../libs/k8s/ClusterRole.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterRoleFound, navigation, setItemFromRoute } = useClusterRole();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterRoleReadExcludes
  },
  "providedToClusterRoleBinding": {"filters": [], "excludes": ClusterRoleBindingListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotClusterRoleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterRoleDelete);
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
      <k8sClusterRoleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null"
        :model="result.k8sClusterRole[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null && result.k8sClusterRole[0].providedToClusterRoleBinding!=null && result.k8sClusterRole[0].providedToClusterRoleBinding.length>0">
      <k8sClusterRoleBindingList
        :model="result.k8sClusterRole[0].providedToClusterRoleBinding"
       />
    </div>
    <div class="col-md-12">
      <k8sClusterRoleView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sClusterRole[0]!=undefined && result.k8sClusterRole[0]!=null"
        :model="result.k8sClusterRole[0]"
        />
    </div>
  </div>
</template>
