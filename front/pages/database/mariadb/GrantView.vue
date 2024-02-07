<script setup lang="ts">
import mariadbGrantQuery from '@/queries/mariadb/Grant.details.graphql'
import GrantDelete from '@/queries/mariadb/Grant.delete.graphql'
import mariadbGrantMeta from '@/components/mariadb/GrantMeta.vue';
import mariadbGrantView from '@/components/mariadb/GrantView.vue';
import mariadbGrantStatus from '@/components/mariadb/GrantStatus.vue';
import { useQuery, useMutation, useGrant, GrantReadExcludes } from '../../../libs/mariadb/Grant.js'
const { onErrorHandler, notifySuccess, notifyError, onNotGrantFound, navigation, setNamespacedItemFromRoute } = useGrant();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbGrantQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": GrantReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotGrantFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(GrantDelete);
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
      <mariadbGrantMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbGrant[0]!=undefined && result.k8sNamespace[0].mariadbGrant[0]!=null"
        :model="result.k8sNamespace[0].mariadbGrant[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbGrantStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbGrant[0]!=undefined && result.k8sNamespace[0].mariadbGrant[0]!=null"
        :model="result.k8sNamespace[0].mariadbGrant[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbGrantView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbGrant[0]!=undefined && result.k8sNamespace[0].mariadbGrant[0]!=null"
        :model="result.k8sNamespace[0].mariadbGrant[0]"
        />
    </div>
  </div>
</template>
