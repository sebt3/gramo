<script setup lang="ts">
import k8sRoleQuery from '@/queries/k8s/Role.details.graphql'
import RoleDelete from '@/queries/k8s/Role.delete.graphql'
import k8sRoleMeta from '@/components/k8s/RoleMeta.vue';
import k8sRoleView from '@/components/k8s/RoleView.vue';
import { ClusterListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgClusterMeta from '@/components/cnpg/ClusterMeta.vue';
import { PoolerListExcludes } from '../../../libs/cnpg/custom.js'
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import { RoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleBindingList from '@/components/k8s/RoleBindingList.vue';
import { useQuery, useMutation, useRole, RoleReadExcludes } from '../../../libs/k8s/Role.js'
const { onErrorHandler, notifySuccess, notifyError, onNotRoleFound, navigation, setNamespacedItemFromRoute } = useRole();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sRoleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": RoleReadExcludes
  },
  "parentCluster": {"filters": [], "excludes": ClusterListExcludes},
  "parentPooler": {"filters": [], "excludes": PoolerListExcludes},
  "providedToRoleBinding": {"filters": [], "excludes": RoleBindingListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotRoleFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(RoleDelete);
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
      <k8sRoleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null"
        :model="result.k8sNamespace[0].k8sRole[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null && result.k8sNamespace[0].k8sRole[0].parentCluster!=null && result.k8sNamespace[0].k8sRole[0].parentCluster.length>0">
      <cnpgClusterMeta
        :model="result.k8sNamespace[0].k8sRole[0].parentCluster[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null && result.k8sNamespace[0].k8sRole[0].parentPooler!=null && result.k8sNamespace[0].k8sRole[0].parentPooler.length>0">
      <cnpgPoolerMeta
        :model="result.k8sNamespace[0].k8sRole[0].parentPooler[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null && result.k8sNamespace[0].k8sRole[0].providedToRoleBinding!=null && result.k8sNamespace[0].k8sRole[0].providedToRoleBinding.length>0">
      <k8sRoleBindingList
        :model="result.k8sNamespace[0].k8sRole[0].providedToRoleBinding"
       />
    </div>
    <div class="col-md-12">
      <k8sRoleView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sRole[0]!=undefined && result.k8sNamespace[0].k8sRole[0]!=null"
        :model="result.k8sNamespace[0].k8sRole[0]"
        />
    </div>
  </div>
</template>
