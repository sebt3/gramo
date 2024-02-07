<script setup lang="ts">
import traefikTLSOptionQuery from '@/queries/traefik/TLSOption.read.graphql'
import TLSOptionEdit from '@/queries/traefik/TLSOption.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import traefikTLSOptionMeta from '@/components/traefik/TLSOptionMeta.vue';
import traefikTLSOptionEdit from '@/components/traefik/TLSOptionEdit.vue';
import { useQuery, useMutation, sanitizeData, useTLSOption, TLSOptionSimpleExcludes } from '../../../libs/traefik/TLSOption.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotTLSOptionFound, navigation, editor, setNamespacedItemFromRoute } = useTLSOption();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(traefikTLSOptionQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": TLSOptionSimpleExcludes
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
const { mutate: patchTLSOption, onDone: onPatchTLSOption, onError: onPatchError } = useMutation(TLSOptionEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchTLSOption({
    "name": result.k8sNamespace[0].traefikTLSOption[0].metadata.name,
    "namespace": result.k8sNamespace[0].traefikTLSOption[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotTLSOptionFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].traefikTLSOption[0])});onPatchTLSOption(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <traefikTLSOptionMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSOption[0]!=undefined && result.k8sNamespace[0].traefikTLSOption[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSOption[0]"
       />
    </div>
    <div class="col-md-12">
      <traefikTLSOptionEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].traefikTLSOption[0]!=undefined && result.k8sNamespace[0].traefikTLSOption[0]!=null"
        :model="result.k8sNamespace[0].traefikTLSOption[0]"
       />
    </div>
  </div>
</template>

