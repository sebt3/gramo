<script setup lang="ts">
import traefikMiddlewareQuery from '@/queries/traefik/Middleware.read.graphql'
import MiddlewareDelete from '@/queries/traefik/Middleware.delete.graphql'
import traefikMiddlewareList from '@/components/traefik/MiddlewareList.vue';
import { useQuery, useMutation, useMiddleware, MiddlewareListExcludes } from '../../../libs/traefik/Middleware.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useMiddleware();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(traefikMiddlewareQuery, {
  "obj": {
    "filters": [],
    "excludes": MiddlewareListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(MiddlewareDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <traefikMiddlewareList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.traefikMiddleware).flat()"
  />
</template>