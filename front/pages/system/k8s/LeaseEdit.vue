<script setup lang="ts">
import k8sLeaseQuery from '@/queries/k8s/Lease.read.graphql'
import LeaseEdit from '@/queries/k8s/Lease.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sLeaseMeta from '@/components/k8s/LeaseMeta.vue';
import k8sLeaseEdit from '@/components/k8s/LeaseEdit.vue';
import { useQuery, useMutation, sanitizeData, useLease, LeaseSimpleExcludes } from '../../../libs/k8s/Lease.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotLeaseFound, navigation, editor, setNamespacedItemFromRoute } = useLease();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sLeaseQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": LeaseSimpleExcludes
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
const { mutate: patchLease, onDone: onPatchLease, onError: onPatchError } = useMutation(LeaseEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchLease({
    "name": result.k8sNamespace[0].k8sLease[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sLease[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotLeaseFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sLease[0])});onPatchLease(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sLeaseMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLease[0]!=undefined && result.k8sNamespace[0].k8sLease[0]!=null"
        :model="result.k8sNamespace[0].k8sLease[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sLeaseEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sLease[0]!=undefined && result.k8sNamespace[0].k8sLease[0]!=null"
        :model="result.k8sNamespace[0].k8sLease[0]"
       />
    </div>
  </div>
</template>

