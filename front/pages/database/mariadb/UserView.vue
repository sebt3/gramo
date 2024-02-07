<script setup lang="ts">
import mariadbUserQuery from '@/queries/mariadb/User.details.graphql'
import UserDelete from '@/queries/mariadb/User.delete.graphql'
import mariadbUserMeta from '@/components/mariadb/UserMeta.vue';
import mariadbUserView from '@/components/mariadb/UserView.vue';
import mariadbUserStatus from '@/components/mariadb/UserStatus.vue';
import { useQuery, useMutation, useUser, UserReadExcludes } from '../../../libs/mariadb/User.js'
const { onErrorHandler, notifySuccess, notifyError, onNotUserFound, navigation, setNamespacedItemFromRoute } = useUser();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbUserQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": UserReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotUserFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(UserDelete);
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
      <mariadbUserMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbUserStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbUserView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbUser[0]!=undefined && result.k8sNamespace[0].mariadbUser[0]!=null"
        :model="result.k8sNamespace[0].mariadbUser[0]"
        />
    </div>
  </div>
</template>
