<script setup lang="ts">
import secretgeneratorSSHKeyPairQuery from '@/queries/secretgenerator/SSHKeyPair.read.graphql'
import SSHKeyPairEdit from '@/queries/secretgenerator/SSHKeyPair.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import secretgeneratorSSHKeyPairMeta from '@/components/secretgenerator/SSHKeyPairMeta.vue';
import secretgeneratorSSHKeyPairEdit from '@/components/secretgenerator/SSHKeyPairEdit.vue';
import secretgeneratorSSHKeyPairStatus from '@/components/secretgenerator/SSHKeyPairStatus.vue';
import { useQuery, useMutation, sanitizeData, useSSHKeyPair, SSHKeyPairSimpleExcludes } from '../../../libs/secretgenerator/SSHKeyPair.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotSSHKeyPairFound, navigation, editor, setNamespacedItemFromRoute } = useSSHKeyPair();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(secretgeneratorSSHKeyPairQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": SSHKeyPairSimpleExcludes
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
const { mutate: patchSSHKeyPair, onDone: onPatchSSHKeyPair, onError: onPatchError } = useMutation(SSHKeyPairEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSSHKeyPair({
    "name": result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].metadata.name,
    "namespace": result.k8sNamespace[0].secretgeneratorSSHKeyPair[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotSSHKeyPairFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].secretgeneratorSSHKeyPair[0])});onPatchSSHKeyPair(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <secretgeneratorSSHKeyPairMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
    </div>
    <div class="col-md-6">
      <secretgeneratorSSHKeyPairStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
    </div>
    <div class="col-md-12">
      <secretgeneratorSSHKeyPairEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=undefined && result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]!=null"
        :model="result.k8sNamespace[0].secretgeneratorSSHKeyPair[0]"
       />
    </div>
  </div>
</template>

