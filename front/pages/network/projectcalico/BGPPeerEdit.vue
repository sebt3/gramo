<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeer.read.graphql'
import BGPPeerEdit from '@/queries/projectcalico/BGPPeer.patch.graphql'
import projectcalicoBGPPeerMeta from '@/components/projectcalico/BGPPeerMeta.vue';
import projectcalicoBGPPeerEdit from '@/components/projectcalico/BGPPeerEdit.vue';
import { useQuery, useMutation, useBGPPeer, BGPPeerSimpleExcludes } from '../../../libs/projectcalico/BGPPeer.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBGPPeerFound, navigation, setItemFromRoute } = useBGPPeer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPPeerQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BGPPeerSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotBGPPeerFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BGPPeerDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import projectcalicoBGPPeerQuery from '@/queries/projectcalico/BGPPeer.read.graphql'
import BGPPeerEdit from '@/queries/projectcalico/BGPPeer.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useBGPPeer, sanitizeData, getProperties } from '../../../libs/projectcalico/BGPPeer.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotBGPPeerFound, setItemFromRoute, navigation, onErrorHandler } = useBGPPeer();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(projectcalicoBGPPeerQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBGPPeer, onDone: onPatchBGPPeer, onError: onPatchError } = useMutation(BGPPeerEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBGPPeer({ "name": result.value.projectcalicoBGPPeer.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotBGPPeerFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.projectcalicoBGPPeer.metadata.obj.spec})});onPatchBGPPeer(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <projectcalicoBGPPeerMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.projectcalicoBGPPeer[0]!=undefined && result.projectcalicoBGPPeer[0]!=null"
        :model="result.projectcalicoBGPPeer[0]"
       />
    </div><div class="col-md-6">
      <projectcalicoBGPPeerView
        v-if="!loading && result!=undefined && result.projectcalicoBGPPeer[0]!=undefined && result.projectcalicoBGPPeer[0]!=null"
        :model="result.projectcalicoBGPPeer[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">BGPPeer</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.projectcalicoBGPPeer.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.projectcalicoBGPPeer!=null && result.projectcalicoBGPPeer.status != null">
          <DefaultStatusView :status="result.projectcalicoBGPPeer.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.projectcalicoBGPPeer!=null" class="q-ma-sm">
      <q-tabs v-model="editor.tab" class="bg-primary text-white">
        <q-tab label="Editor" name="simple" />
        <q-tab label="Yaml" name="spec" />
      </q-tabs>
      <q-tab-panels v-model="editor.tab" animated>
        <q-tab-panel name="simple">
          <OpenApiEdit
          :in="Object.keys(editor.spec).includes('spec')?editor.spec['spec']:{}"
          @update:out="v=>{ spec=v;editor.setspecSpec({ spec: v})}"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
            />
        </q-tab-panel>
        <q-tab-panel name="spec">
          <MonacoEditor
          :text="editor.yamlspec" :key="editor.yamlspec"
          @update:text="v=>editor.setspecYaml(v)"
          :properties="getProperties(result.customResourceDefinition.versions.filter(v => v.served)[0].schema.openAPIV3Schema.properties.spec)"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-card-actions>
        <q-btn label="Submit" type="submit" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-form>
</template>