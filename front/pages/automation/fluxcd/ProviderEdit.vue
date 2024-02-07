<script setup lang="ts">
import fluxcdProviderQuery from '@/queries/fluxcd/Provider.read.graphql'
import ProviderEdit from '@/queries/fluxcd/Provider.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import fluxcdProviderMeta from '@/components/fluxcd/ProviderMeta.vue';
import fluxcdProviderEdit from '@/components/fluxcd/ProviderEdit.vue';
import fluxcdProviderStatus from '@/components/fluxcd/ProviderStatus.vue';
import { useQuery, useMutation, sanitizeData, useProvider, ProviderSimpleExcludes } from '../../../libs/fluxcd/Provider.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotProviderFound, navigation, editor, setNamespacedItemFromRoute } = useProvider();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdProviderQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ProviderSimpleExcludes
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
const { mutate: patchProvider, onDone: onPatchProvider, onError: onPatchError } = useMutation(ProviderEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchProvider({
    "name": result.k8sNamespace[0].fluxcdProvider[0].metadata.name,
    "namespace": result.k8sNamespace[0].fluxcdProvider[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotProviderFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].fluxcdProvider[0])});onPatchProvider(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdProviderMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div>
    <div class="col-md-6">
      <fluxcdProviderStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div>
    <div class="col-md-12">
      <fluxcdProviderEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdProvider[0]!=undefined && result.k8sNamespace[0].fluxcdProvider[0]!=null"
        :model="result.k8sNamespace[0].fluxcdProvider[0]"
       />
    </div>
  </div>
</template>

