<script setup lang="ts">
import k8sServiceAccountQuery from '@/queries/k8s/ServiceAccount.details.graphql'
import ServiceAccountDelete from '@/queries/k8s/ServiceAccount.delete.graphql'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import k8sServiceAccountView from '@/components/k8s/ServiceAccountView.vue';
import { PoolerListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { RoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleBindingList from '@/components/k8s/RoleBindingList.vue';
import { ClusterRoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import k8sClusterRoleBindingList from '@/components/k8s/ClusterRoleBindingList.vue';
import { PodListExcludes } from '../../../libs/k8s/custom.js'
import k8sPodList from '@/components/k8s/PodList.vue';
import { useQuery, useMutation, useServiceAccount, ServiceAccountReadExcludes } from '../../../libs/k8s/ServiceAccount.js'
const { onErrorHandler, notifySuccess, notifyError, onNotServiceAccountFound, navigation, setNamespacedItemFromRoute } = useServiceAccount();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sServiceAccountQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ServiceAccountReadExcludes
  },
  "parentPooler": {"filters": [], "excludes": PoolerListExcludes},
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "provideRoleBinding": {"filters": [], "excludes": RoleBindingListExcludes},
  "provideClusterRoleBinding": {"filters": [], "excludes": ClusterRoleBindingListExcludes},
  "usedByPod": {"filters": [], "excludes": PodListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotServiceAccountFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ServiceAccountDelete);
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
      <k8sServiceAccountMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null"
        :model="result.k8sNamespace[0].k8sServiceAccount[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentPooler!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentPooler.length>0">
      <cnpgPoolerMeta
        :model="result.k8sNamespace[0].k8sServiceAccount[0].parentPooler[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentCluster!=null && result.k8sNamespace[0].k8sServiceAccount[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sServiceAccount[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].provideRoleBinding!=null && result.k8sNamespace[0].k8sServiceAccount[0].provideRoleBinding.length>0">
      <k8sRoleBindingList
        :model="result.k8sNamespace[0].k8sServiceAccount[0].provideRoleBinding"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].provideClusterRoleBinding!=null && result.k8sNamespace[0].k8sServiceAccount[0].provideClusterRoleBinding.length>0">
      <k8sClusterRoleBindingList
        :model="result.k8sNamespace[0].k8sServiceAccount[0].provideClusterRoleBinding"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null && result.k8sNamespace[0].k8sServiceAccount[0].usedByPod!=null && result.k8sNamespace[0].k8sServiceAccount[0].usedByPod.length>0">
      <k8sPodList
        :model="result.k8sNamespace[0].k8sServiceAccount[0].usedByPod"
       />
    </div>
    <div class="col-md-12">
      <k8sServiceAccountView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sServiceAccount[0]!=undefined && result.k8sNamespace[0].k8sServiceAccount[0]!=null"
        :model="result.k8sNamespace[0].k8sServiceAccount[0]"
        />
    </div>
  </div>
</template>
