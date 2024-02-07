<script setup lang="ts">
import certmanagerOrderQuery from '@/queries/certmanager/Order.read.graphql'
import OrderEdit from '@/queries/certmanager/Order.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import certmanagerOrderMeta from '@/components/certmanager/OrderMeta.vue';
import certmanagerOrderEdit from '@/components/certmanager/OrderEdit.vue';
import certmanagerOrderStatus from '@/components/certmanager/OrderStatus.vue';
import { useQuery, useMutation, sanitizeData, useOrder, OrderSimpleExcludes } from '../../../libs/certmanager/Order.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotOrderFound, navigation, editor, setNamespacedItemFromRoute } = useOrder();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(certmanagerOrderQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": OrderSimpleExcludes
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
const { mutate: patchOrder, onDone: onPatchOrder, onError: onPatchError } = useMutation(OrderEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchOrder({
    "name": result.k8sNamespace[0].certmanagerOrder[0].metadata.name,
    "namespace": result.k8sNamespace[0].certmanagerOrder[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotOrderFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].certmanagerOrder[0])});onPatchOrder(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <certmanagerOrderMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerOrder[0]!=undefined && result.k8sNamespace[0].certmanagerOrder[0]!=null"
        :model="result.k8sNamespace[0].certmanagerOrder[0]"
       />
    </div>
    <div class="col-md-6">
      <certmanagerOrderStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerOrder[0]!=undefined && result.k8sNamespace[0].certmanagerOrder[0]!=null"
        :model="result.k8sNamespace[0].certmanagerOrder[0]"
       />
    </div>
    <div class="col-md-12">
      <certmanagerOrderEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].certmanagerOrder[0]!=undefined && result.k8sNamespace[0].certmanagerOrder[0]!=null"
        :model="result.k8sNamespace[0].certmanagerOrder[0]"
       />
    </div>
  </div>
</template>

