<script setup lang="ts">
import jaegertracingJaegerQuery from '@/queries/jaegertracing/Jaeger.read.graphql'
import JaegerDelete from '@/queries/jaegertracing/Jaeger.delete.graphql'
import jaegertracingJaegerList from '@/components/jaegertracing/JaegerList.vue';
import { useQuery, useMutation, useJaeger, JaegerListExcludes } from '../../../libs/jaegertracing/Jaeger.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useJaeger();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(jaegertracingJaegerQuery, {
  "obj": {
    "filters": [],
    "excludes": JaegerListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(JaegerDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <jaegertracingJaegerList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.jaegertracingJaeger).flat()"
  />
</template>