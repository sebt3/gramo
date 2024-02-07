<script setup lang="ts">
import traefikTraefikServiceQuery from '@/queries/traefik/TraefikService.read.graphql'
import TraefikServiceEdit from '@/queries/traefik/TraefikService.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikTraefikServiceMeta from '@/components/traefik/TraefikServiceMeta.vue';
import traefikTraefikServiceEdit from '@/components/traefik/TraefikServiceEdit.vue';
import { useQuery, useMutation, sanitizeData, useTraefikService, TraefikServiceSimpleExcludes } from '../../../libs/traefik/TraefikService.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotTraefikServiceFound, navigation, editor, setNamespacedItemFromRoute } = useTraefikService();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTraefikServiceQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TraefikServiceSimpleExcludes
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
});
const { mutate: patchTraefikService, onDone: onPatchTraefikService, onError: onPatchError } = useMutation(TraefikServiceEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchTraefikService({
    "name": result.k8sNamespace[0].traefikTraefikService[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikTraefikService[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotTraefikServiceFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikTraefikService[0])});onPatchTraefikService(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikTraefikServiceMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTraefikService[0]!=undefined && result.k8sNamespace[0].traefikTraefikService[0]!=null"
        :model="result.k8sNamespace[0].traefikTraefikService[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikTraefikServiceEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTraefikService[0]!=undefined && result.k8sNamespace[0].traefikTraefikService[0]!=null"
        :model="result.k8sNamespace[0].traefikTraefikService[0]"
       />
    </div>
  </div>
</template>

