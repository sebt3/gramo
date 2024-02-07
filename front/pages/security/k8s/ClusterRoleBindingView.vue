<script setup lang="ts">
import k8sClusterRoleBindingQuery from '@/queries/k8s/ClusterRoleBinding.details.graphql'
import ClusterRoleBindingDelete from '@/queries/k8s/ClusterRoleBinding.delete.graphql'
import k8sClusterRoleBindingMeta from '@/components/k8s/ClusterRoleBindingMeta.vue';
import k8sClusterRoleBindingView from '@/components/k8s/ClusterRoleBindingView.vue';
import { ClusterRoleListExcludes } from '../../../libs/k8s/custom.js'
import k8sClusterRoleList from '@/components/k8s/ClusterRoleList.vue';
import { ServiceAccountListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import { useQuery, useMutation, useClusterRoleBinding, ClusterRoleBindingReadExcludes } from '../../../libs/k8s/ClusterRoleBinding.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterRoleBindingFound, navigation, setItemFromRoute } = useClusterRoleBinding();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sClusterRoleBindingQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterRoleBindingReadExcludes
  },
  "provideClusterRole": {"filters": [], "excludes": ClusterRoleListExcludes},
  "providedToServiceAccount": {"filters": [], "excludes": ServiceAccountListExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotClusterRoleBindingFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterRoleBindingDelete);
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
      <k8sClusterRoleBindingMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null"
        :model="result.k8sClusterRoleBinding[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null && result.k8sClusterRoleBinding[0].providedToServiceAccount!=null && result.k8sClusterRoleBinding[0].providedToServiceAccount.length>0">
      <k8sServiceAccountMeta
        :model="result.k8sClusterRoleBinding[0].providedToServiceAccount[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null && result.k8sClusterRoleBinding[0].provideClusterRole!=null && result.k8sClusterRoleBinding[0].provideClusterRole.length>0">
      <k8sClusterRoleList
        :model="result.k8sClusterRoleBinding[0].provideClusterRole"
       />
    </div>
    <div class="col-md-12">
      <k8sClusterRoleBindingView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sClusterRoleBinding[0]!=undefined && result.k8sClusterRoleBinding[0]!=null"
        :model="result.k8sClusterRoleBinding[0]"
        />
    </div>
  </div>
</template>
