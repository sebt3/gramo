<script setup lang="ts">
import cnpgPoolerQuery from '@/queries/cnpg/Pooler.details.graphql'
import PoolerDelete from '@/queries/cnpg/Pooler.delete.graphql'
import cnpgPoolerMeta from '@/components/cnpg/PoolerMeta.vue';
import cnpgPoolerView from '@/components/cnpg/PoolerView.vue';
import cnpgPoolerStatus from '@/components/cnpg/PoolerStatus.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { ServiceAccountListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceAccountMeta from '@/components/k8s/ServiceAccountMeta.vue';
import { DeploymentListExcludes } from '../../../libs/k8s/custom.js'
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import { RoleListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleList from '@/components/k8s/RoleList.vue';
import { RoleBindingListExcludes } from '../../../libs/k8s/custom.js'
import k8sRoleBindingList from '@/components/k8s/RoleBindingList.vue';
import { useQuery, useMutation, usePooler, PoolerReadExcludes } from '../../../libs/cnpg/Pooler.js'
const { onErrorHandler, notifySuccess, notifyError, onNotPoolerFound, navigation, setNamespacedItemFromRoute } = usePooler();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(cnpgPoolerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": PoolerReadExcludes
  },
  "childService": {"filters": [], "excludes": ServiceListExcludes},
  "childServiceAccount": {"filters": [], "excludes": ServiceAccountListExcludes},
  "childDeployment": {"filters": [], "excludes": DeploymentListExcludes},
  "childRole": {"filters": [], "excludes": RoleListExcludes},
  "childRoleBinding": {"filters": [], "excludes": RoleBindingListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotPoolerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(PoolerDelete);
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
      <cnpgPoolerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
    </div>
    <div class="col-md-6">
      <cnpgPoolerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childServiceAccount!=null && result.k8sNamespace[0].cnpgPooler[0].childServiceAccount.length>0">
      <k8sServiceAccountMeta
        :model="result.k8sNamespace[0].cnpgPooler[0].childServiceAccount[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childService!=null && result.k8sNamespace[0].cnpgPooler[0].childService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].cnpgPooler[0].childService"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childDeployment!=null && result.k8sNamespace[0].cnpgPooler[0].childDeployment.length>0">
      <k8sDeploymentList
        :model="result.k8sNamespace[0].cnpgPooler[0].childDeployment"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childRole!=null && result.k8sNamespace[0].cnpgPooler[0].childRole.length>0">
      <k8sRoleList
        :model="result.k8sNamespace[0].cnpgPooler[0].childRole"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null && result.k8sNamespace[0].cnpgPooler[0].childRoleBinding!=null && result.k8sNamespace[0].cnpgPooler[0].childRoleBinding.length>0">
      <k8sRoleBindingList
        :model="result.k8sNamespace[0].cnpgPooler[0].childRoleBinding"
       />
    </div>
    <div class="col-md-12">
      <cnpgPoolerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].cnpgPooler[0]!=undefined && result.k8sNamespace[0].cnpgPooler[0]!=null"
        :model="result.k8sNamespace[0].cnpgPooler[0]"
        />
    </div>
  </div>
</template>
