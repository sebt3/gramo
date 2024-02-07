<script setup lang="ts">
import zalandoKopfPeeringQuery from '@/queries/zalando/KopfPeering.read.graphql'
import KopfPeeringDelete from '@/queries/zalando/KopfPeering.delete.graphql'
import zalandoKopfPeeringList from '@/components/zalando/KopfPeeringList.vue';
import { useQuery, useMutation, useKopfPeering, KopfPeeringListExcludes } from '../../../libs/zalando/KopfPeering.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useKopfPeering();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(zalandoKopfPeeringQuery, {
  "obj": {
    "filters": [],
    "excludes": KopfPeeringListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KopfPeeringDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <zalandoKopfPeeringList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.zalandoKopfPeering).flat()"
  />
</template>