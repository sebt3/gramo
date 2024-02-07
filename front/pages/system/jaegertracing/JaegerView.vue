<script setup lang="ts">
import jaegertracingJaegerQuery from '@/queries/jaegertracing/Jaeger.details.graphql'
import JaegerDelete from '@/queries/jaegertracing/Jaeger.delete.graphql'
import jaegertracingJaegerMeta from '@/components/jaegertracing/JaegerMeta.vue';
import jaegertracingJaegerView from '@/components/jaegertracing/JaegerView.vue';
import jaegertracingJaegerStatus from '@/components/jaegertracing/JaegerStatus.vue';
import { useQuery, useMutation, useJaeger, JaegerReadExcludes } from '../../../libs/jaegertracing/Jaeger.js'
const { onErrorHandler, notifySuccess, notifyError, onNotJaegerFound, navigation, setNamespacedItemFromRoute } = useJaeger();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(jaegertracingJaegerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": JaegerReadExcludes
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
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotJaegerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(JaegerDelete);
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
      <jaegertracingJaegerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div>
    <div class="col-md-6">
      <jaegertracingJaegerStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
       />
    </div>
    <div class="col-md-12">
      <jaegertracingJaegerView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].jaegertracingJaeger[0]!=undefined && result.k8sNamespace[0].jaegertracingJaeger[0]!=null"
        :model="result.k8sNamespace[0].jaegertracingJaeger[0]"
        />
    </div>
  </div>
</template>
