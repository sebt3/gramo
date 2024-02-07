<script setup lang="ts">
import k8sDeploymentQuery from '@/queries/k8s/Deployment.read.graphql'
import DeploymentDelete from '@/queries/k8s/Deployment.delete.graphql'
import k8sDeploymentList from '@/components/k8s/DeploymentList.vue';
import { useQuery, useMutation, useDeployment, DeploymentListExcludes } from '../../../libs/k8s/Deployment.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useDeployment();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(k8sDeploymentQuery, {
  "obj": {
    "filters": [],
    "excludes": DeploymentListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DeploymentDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <k8sDeploymentList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.k8sDeployment).flat()"
  />
</template>