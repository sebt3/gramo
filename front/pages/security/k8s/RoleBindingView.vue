<script setup lang="ts">
import k8sRoleBindingQuery from '@/queries/k8s/RoleBinding.details.graphql'
import RoleBindingDelete from '@/queries/k8s/RoleBinding.delete.graphql'
import k8sRoleBindingMeta from '@/components/k8s/RoleBindingMeta.vue';
import k8sRoleBindingView from '@/components/k8s/RoleBindingView.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { PoolerListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import { RoleListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleList from '@/components/k8s/RoleList.vue';
import { ServiceAccountListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import { useQuery, useMutation, useRoleBinding, RoleBindingReadExcludes } from '../../../libs/k8s/RoleBinding.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRoleBindingFound, navigation, setNamespacedItemFromRoute } = useRoleBinding();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleBindingQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RoleBindingReadExcludes
  },
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "parentPooler": {"filters": [], "excludes": PoolerListExcludes},
  "provideRole": {"filters": [], "excludes": RoleListExcludes},
  "providedToServiceAccount": {"filters": [], "excludes": ServiceAccountListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRoleBindingFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RoleBindingDelete);
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
      <k8sRoleBindingMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null"
        :model="result.k8sNamespace[0].k8sRoleBinding[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentCluster!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sRoleBinding[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentPooler!=null && result.k8sNamespace[0].k8sRoleBinding[0].parentPooler.length>0">
      <cnpgPoolerMeta
        :model="result.k8sNamespace[0].k8sRoleBinding[0].parentPooler[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null && result.k8sNamespace[0].k8sRoleBinding[0].providedToServiceAccount!=null && result.k8sNamespace[0].k8sRoleBinding[0].providedToServiceAccount.length>0">
      <k8sServiceAccountMeta
        :model="result.k8sNamespace[0].k8sRoleBinding[0].providedToServiceAccount[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null && result.k8sNamespace[0].k8sRoleBinding[0].provideRole!=null && result.k8sNamespace[0].k8sRoleBinding[0].provideRole.length>0">
      <k8sRoleList
        :model="result.k8sNamespace[0].k8sRoleBinding[0].provideRole"
       />
    </div>
    <div class="col-md-12">
      <k8sRoleBindingView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRoleBinding[0]!=undefined && result.k8sNamespace[0].k8sRoleBinding[0]!=null"
        :model="result.k8sNamespace[0].k8sRoleBinding[0]"
        />
    </div>
  </div>
</template>
