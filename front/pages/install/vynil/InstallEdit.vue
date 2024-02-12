<script setup lang="ts">
// noGramoGenerator
import vynilInstallQuery from '@/queries/vynil/Install.details.graphql'
import InstallEdit from '@/queries/vynil/Install.patch.graphql'
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import vynilInstallEdit from '@/components/vynil/InstallEdit.vue';
import vynilInstallStatus from '@/components/vynil/InstallStatus.vue';
import { useQuery, useMutation, useInstall, InstallSimpleExcludes } from '../../../libs/vynil/Install.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotInstallFound, navigation, setNamespacedItemFromRoute } = useInstall();setNamespacedItemFromRoute();
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
function onSubmit(obj:object) {
  notifyWorking('Update in progress');
  patchInstall({
    "name": result.value.k8sNamespace[0].vynilInstall[0].metadata.name,
    "namespace": result.value.k8sNamespace[0].vynilInstall[0].metadata.namespace,
    ...obj
  });
}
onError(onErrorHandler);onResult(onNotInstallFound);onPatchInstall(patchDone);onPatchError(patchError);
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <vynilInstallMeta :useActions="false" :showStatus="false"
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
    <div class="col-md-6">
      <vynilInstallStatus
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
       />
    </div>
    <div class="col-md-12">
      <vynilInstallEdit
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
        @on-submit="onSubmit"
       />
    </div>
  </div>
</template>

