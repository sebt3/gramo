<script setup lang="ts">
import traefikTLSStoreQuery from '@/queries/traefik/TLSStore.read.graphql'
import TLSStoreEdit from '@/queries/traefik/TLSStore.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikTLSStoreMeta from '@/components/traefik/TLSStoreMeta.vue';
import traefikTLSStoreEdit from '@/components/traefik/TLSStoreEdit.vue';
import { useQuery, useMutation, sanitizeData, useTLSStore, TLSStoreSimpleExcludes } from '../../../libs/traefik/TLSStore.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotTLSStoreFound, navigation, editor, setNamespacedItemFromRoute } = useTLSStore();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSStoreQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TLSStoreSimpleExcludes
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
const { mutate: patchTLSStore, onDone: onPatchTLSStore, onError: onPatchError } = useMutation(TLSStoreEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchTLSStore({
    "name": result.k8sNamespace[0].traefikTLSStore[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikTLSStore[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotTLSStoreFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikTLSStore[0])});onPatchTLSStore(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikTLSStoreMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSStore[0]!=undefined && result.k8sNamespace[0].traefikTLSStore[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSStore[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikTLSStoreEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSStore[0]!=undefined && result.k8sNamespace[0].traefikTLSStore[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSStore[0]"
       />
    </div>
  </div>
</template>

