<script setup lang="ts">
import mongodbMongoDBCommunityQuery from '@/queries/mongodb/MongoDBCommunity.read.graphql'
import MongoDBCommunityDelete from '@/queries/mongodb/MongoDBCommunity.delete.graphql'
import mongodbMongoDBCommunityList from '@/components/mongodb/MongoDBCommunityList.vue';
import { useQuery, useMutation, useMongoDBCommunity, MongoDBCommunityListExcludes } from '../../../libs/mongodb/MongoDBCommunity.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useMongoDBCommunity();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(mongodbMongoDBCommunityQuery, {
  "obj": {
    "filters": [],
    "excludes": MongoDBCommunityListExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
}, { pollInterval: 2000 });
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MongoDBCommunityDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <mongodbMongoDBCommunityList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.mongodbMongoDBCommunity).flat()"
  />
</template>