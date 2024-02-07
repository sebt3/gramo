<script setup lang="ts">
import zalandoKopfPeeringQuery from '@/queries/zalando/KopfPeering.read.graphql'
import KopfPeeringEdit from '@/queries/zalando/KopfPeering.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import zalandoKopfPeeringMeta from '@/components/zalando/KopfPeeringMeta.vue';
import zalandoKopfPeeringEdit from '@/components/zalando/KopfPeeringEdit.vue';
import zalandoKopfPeeringStatus from '@/components/zalando/KopfPeeringStatus.vue';
import { useQuery, useMutation, sanitizeData, useKopfPeering, KopfPeeringSimpleExcludes } from '../../../libs/zalando/KopfPeering.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotKopfPeeringFound, navigation, editor, setNamespacedItemFromRoute } = useKopfPeering();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandoKopfPeeringQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": KopfPeeringSimpleExcludes
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
const { mutate: patchKopfPeering, onDone: onPatchKopfPeering, onError: onPatchError } = useMutation(KopfPeeringEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchKopfPeering({
    "name": result.k8sNamespace[0].zalandoKopfPeering[0].metadata.name,
    "namespace": result.k8sNamespace[0].zalandoKopfPeering[0].metadata.namespace,
  });
}
onError(onErrorHandler);onResult(res => {onNotKopfPeeringFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].zalandoKopfPeering[0])});onPatchKopfPeering(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <zalandoKopfPeeringMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div>
    <div class="col-md-6">
      <zalandoKopfPeeringStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div>
    <div class="col-md-12">
      <zalandoKopfPeeringEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div>
  </div>
</template>

