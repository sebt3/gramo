<script setup lang="ts">
import zalandoClusterKopfPeeringQuery from '@/queries/zalando/ClusterKopfPeering.read.graphql'
import ClusterKopfPeeringEdit from '@/queries/zalando/ClusterKopfPeering.patch.graphql'
import zalandoClusterKopfPeeringMeta from '@/components/zalando/ClusterKopfPeeringMeta.vue';
import zalandoClusterKopfPeeringEdit from '@/components/zalando/ClusterKopfPeeringEdit.vue';
import zalandoClusterKopfPeeringStatus from '@/components/zalando/ClusterKopfPeeringStatus.vue';
import { useQuery, useMutation, useClusterKopfPeering, ClusterKopfPeeringSimpleExcludes } from '../../../libs/zalando/ClusterKopfPeering.js'
const { onErrorHandler, notifySuccess, notifyError, onNotClusterKopfPeeringFound, navigation, setItemFromRoute } = useClusterKopfPeering();setItemFromRoute();
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
});onError(onErrorHandler); onResult(res => {onNotClusterKopfPeeringFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ClusterKopfPeeringDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import zalandoClusterKopfPeeringQuery from '@/queries/zalando/ClusterKopfPeering.read.graphql'
import ClusterKopfPeeringEdit from '@/queries/zalando/ClusterKopfPeering.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useClusterKopfPeering, sanitizeData, getProperties } from '../../../libs/zalando/ClusterKopfPeering.js'
const { editor, patchDone, patchError, notifyWorking, onNotClusterKopfPeeringFound, setItemFromRoute, navigation, onErrorHandler } = useClusterKopfPeering();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(zalandoClusterKopfPeeringQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchClusterKopfPeering, onDone: onPatchClusterKopfPeering, onError: onPatchError } = useMutation(ClusterKopfPeeringEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchClusterKopfPeering({ "name": result.value.zalandoClusterKopfPeering.metadata.name });
}
onError(onErrorHandler);onResult(res => {onNotClusterKopfPeeringFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.zalandoClusterKopfPeering.metadata.obj.spec})});onPatchClusterKopfPeering(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <zalandoClusterKopfPeeringMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
      <zalandoClusterKopfPeeringStatus
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div><div class="col-md-6">
      <zalandoClusterKopfPeeringView
        v-if="!loading && result!=undefined && result.zalandoClusterKopfPeering[0]!=undefined && result.zalandoClusterKopfPeering[0]!=null"
        :model="result.zalandoClusterKopfPeering[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.zalandoClusterKopfPeering!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">ClusterKopfPeering</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.zalandoClusterKopfPeering.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.zalandoClusterKopfPeering!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.zalandoClusterKopfPeering!=null && result.zalandoClusterKopfPeering.status != null">
          <DefaultStatusView :status="result.zalandoClusterKopfPeering.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.zalandoClusterKopfPeering!=null" class="q-ma-sm">
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