<script setup lang="ts">
import fluxcdImagePolicyQuery from '@/queries/fluxcd/ImagePolicy.read.graphql'
import ImagePolicyDelete from '@/queries/fluxcd/ImagePolicy.delete.graphql'
import fluxcdImagePolicyList from '@/components/fluxcd/ImagePolicyList.vue';
import { useQuery, useMutation, useImagePolicy, ImagePolicyListExcludes } from '../../../libs/fluxcd/ImagePolicy.js'
const { deleteDone, deleteError, onErrorHandler, navigation, setNamespaceFromRoute, isNamespaced } = useImagePolicy();setNamespaceFromRoute();
const { result, refetch, onError } = useQuery(fluxcdImagePolicyQuery, {
  "obj": {
    "filters": [],
    "excludes": ImagePolicyListExcludes
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
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ImagePolicyDelete);
onError(onErrorHandler);onDeleteDone(deleteDone);onDeleteError(deleteError);
</script>
<template>
  <fluxcdImagePolicyList @refresh="refetch()" :deletor="deletor" :useAction="true"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined"
    :model="result.k8sNamespace.map(x=>x.fluxcdImagePolicy).flat()"
  />
</template>