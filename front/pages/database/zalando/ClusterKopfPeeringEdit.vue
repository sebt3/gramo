<script setup lang="ts">
import zalandoClusterKopfPeeringQuery from '@/queries/zalando/ClusterKopfPeering.read.graphql'
import ClusterKopfPeeringEdit from '@/queries/zalando/ClusterKopfPeering.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import zalandoClusterKopfPeeringMeta from '@/components/zalando/ClusterKopfPeeringMeta.vue';
import zalandoClusterKopfPeeringEdit from '@/components/zalando/ClusterKopfPeeringEdit.vue';
import zalandoClusterKopfPeeringStatus from '@/components/zalando/ClusterKopfPeeringStatus.vue';
import { useQuery, useMutation, sanitizeData, useClusterKopfPeering, ClusterKopfPeeringSimpleExcludes } from '../../../libs/zalando/ClusterKopfPeering.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotClusterKopfPeeringFound, navigation, editor, setItemFromRoute } = useClusterKopfPeering();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandoClusterKopfPeeringQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ClusterKopfPeeringSimpleExcludes
  },
});
const { mutate: patchClusterKopfPeering, onDone: onPatchClusterKopfPeering, onError: onPatchError } = useMutation(ClusterKopfPeeringEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterKopfPeering({
    "name": result.zalandoClusterKopfPeering[0].metadata.name,
  });
}
onError(onErrorHandler);onResult(res => {onNotClusterKopfPeeringFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.zalandoClusterKopfPeering[0])});onPatchClusterKopfPeering(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <zalandoClusterKopfPeeringMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div>
    <div class="col-md-6">
      <zalandoClusterKopfPeeringStatus
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div>
    <div class="col-md-12">
      <zalandoClusterKopfPeeringEdit
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div>
  </div>
</template>

