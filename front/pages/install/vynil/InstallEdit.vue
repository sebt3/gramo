<script setup lang="ts">
import vynilInstallQuery from '@/queries/vynil/Install.read.graphql'
import InstallEdit from '@/queries/vynil/Install.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import vynilInstallEdit from '@/components/vynil/InstallEdit.vue';
import vynilInstallStatus from '@/components/vynil/InstallStatus.vue';
import { useQuery, useMutation, sanitizeData, useInstall, InstallSimpleExcludes } from '../../../libs/vynil/Install.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotInstallFound, navigation, editor, setNamespacedItemFromRoute } = useInstall();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilInstallQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InstallSimpleExcludes
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
const { mutate: patchInstall, onDone: onPatchInstall, onError: onPatchError } = useMutation(InstallEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchInstall({
    "name": result.k8sNamespace[0].vynilInstall[0].metadata.name,
    "namespace": result.k8sNamespace[0].vynilInstall[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotInstallFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].vynilInstall[0])});onPatchInstall(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <vynilInstallMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
    <div class="col-md-6">
      <vynilInstallStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
    <div class="col-md-12">
      <vynilInstallEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
  </div>
</template>

