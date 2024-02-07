<script setup lang="ts">
import mongodbMongoDBCommunityQuery from '@/queries/mongodb/MongoDBCommunity.details.graphql'
import MongoDBCommunityDelete from '@/queries/mongodb/MongoDBCommunity.delete.graphql'
import mongodbMongoDBCommunityMeta from '@/components/mongodb/MongoDBCommunityMeta.vue';
import mongodbMongoDBCommunityView from '@/components/mongodb/MongoDBCommunityView.vue';
import mongodbMongoDBCommunityStatus from '@/components/mongodb/MongoDBCommunityStatus.vue';
import { SecretListExcludes } from '../../../libs/k8s/custom.js'
import k8sSecretList from '@/components/k8s/SecretList.vue';
import { ServiceListExcludes } from '../../../libs/k8s/custom.js'
import k8sServiceList from '@/components/k8s/ServiceList.vue';
import { StatefulSetListExcludes } from '../../../libs/k8s/custom.js'
import k8sStatefulSetList from '@/components/k8s/StatefulSetList.vue';
import { useQuery, useMutation, useMongoDBCommunity, MongoDBCommunityReadExcludes } from '../../../libs/mongodb/MongoDBCommunity.js'
const { onErrorHandler, notifySuccess, notifyError, onNotMongoDBCommunityFound, navigation, setNamespacedItemFromRoute } = useMongoDBCommunity();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(mongodbMongoDBCommunityQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": MongoDBCommunityReadExcludes
  },
  "childSecret": {"filters": [], "excludes": SecretListExcludes},
  "childService": {"filters": [], "excludes": ServiceListExcludes},
  "childStatefulSet": {"filters": [], "excludes": StatefulSetListExcludes},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotMongoDBCommunityFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MongoDBCommunityDelete);
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
      <mongodbMongoDBCommunityMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-6">
      <mongodbMongoDBCommunityStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childSecret!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childSecret.length>0">
      <k8sSecretList
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0].childSecret"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childService!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childService.length>0">
      <k8sServiceList
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0].childService"
       />
    </div>
    <div class="col-md-3" v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childStatefulSet!=null && result.k8sNamespace[0].mongodbMongoDBCommunity[0].childStatefulSet.length>0">
      <k8sStatefulSetList
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0].childStatefulSet"
       />
    </div>
    <div class="col-md-12">
      <mongodbMongoDBCommunityView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=undefined && result.k8sNamespace[0].mongodbMongoDBCommunity[0]!=null"
        :model="result.k8sNamespace[0].mongodbMongoDBCommunity[0]"
        />
    </div>
  </div>
</template>
