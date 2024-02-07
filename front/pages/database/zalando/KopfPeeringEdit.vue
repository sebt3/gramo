<script setup lang="ts">
import zalandoKopfPeeringQuery from '@/queries/zalando/KopfPeering.read.graphql'
import KopfPeeringEdit from '@/queries/zalando/KopfPeering.patch.graphql'
import zalandoKopfPeeringMeta from '@/components/zalando/KopfPeeringMeta.vue';
import zalandoKopfPeeringEdit from '@/components/zalando/KopfPeeringEdit.vue';
import zalandoKopfPeeringStatus from '@/components/zalando/KopfPeeringStatus.vue';
import { useQuery, useMutation, useKopfPeering, KopfPeeringSimpleExcludes } from '../../../libs/zalando/KopfPeering.js'
const { onErrorHandler, notifySuccess, notifyError, onNotKopfPeeringFound, navigation, setNamespacedItemFromRoute } = useKopfPeering();setNamespacedItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotKopfPeeringFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(KopfPeeringDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import zalandoKopfPeeringQuery from '@/queries/zalando/KopfPeering.read.graphql'
import KopfPeeringEdit from '@/queries/zalando/KopfPeering.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useKopfPeering, sanitizeData, getProperties } from '../../../libs/zalando/KopfPeering.js'
const { editor, patchDone, patchError, notifyWorking, onNotKopfPeeringFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useKopfPeering();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandoKopfPeeringQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchKopfPeering, onDone: onPatchKopfPeering, onError: onPatchError } = useMutation(KopfPeeringEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchKopfPeering({ "namespace": result.value.zalandoKopfPeering.metadata.namespace, "name": result.value.zalandoKopfPeering.metadata.name });
}
onError(onErrorHandler);onResult(res => {onNotKopfPeeringFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.zalandoKopfPeering.metadata.obj.spec})});onPatchKopfPeering(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <zalandoKopfPeeringMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
      <zalandoKopfPeeringStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div><div class="col-md-6">
      <zalandoKopfPeeringView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].zalandoKopfPeering[0]!=undefined && result.k8sNamespace[0].zalandoKopfPeering[0]!=null"
        :model="result.k8sNamespace[0].zalandoKopfPeering[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].zalandoKopfPeering!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">KopfPeering</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].zalandoKopfPeering.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].zalandoKopfPeering!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].zalandoKopfPeering!=null && result.k8sNamespace[0].zalandoKopfPeering.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].zalandoKopfPeering.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].zalandoKopfPeering!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
        </q-tab-panel>
        <q-tab-panel name="spec">
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>