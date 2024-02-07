<script setup lang="ts">
import mariadbMariaDBQuery from '@/queries/mariadb/MariaDB.details.graphql'
import MariaDBDelete from '@/queries/mariadb/MariaDB.delete.graphql'
import mariadbMariaDBMeta from '@/components/mariadb/MariaDBMeta.vue';
import mariadbMariaDBView from '@/components/mariadb/MariaDBView.vue';
import mariadbMariaDBStatus from '@/components/mariadb/MariaDBStatus.vue';
import { useQuery, useMutation, useMariaDB, MariaDBReadExcludes } from '../../../libs/mariadb/MariaDB.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMariaDBFound, navigation, setNamespacedItemFromRoute } = useMariaDB();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mariadbMariaDBQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MariaDBReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotMariaDBFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MariaDBDelete);
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
      <mariadbMariaDBMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div>
    <div class="col-md-6">
      <mariadbMariaDBStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
       />
    </div>
    <div class="col-md-12">
      <mariadbMariaDBView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mariadbMariaDB[0]!=undefined && result.k8sNamespace[0].mariadbMariaDB[0]!=null"
        :model="result.k8sNamespace[0].mariadbMariaDB[0]"
        />
    </div>
  </div>
</template>
