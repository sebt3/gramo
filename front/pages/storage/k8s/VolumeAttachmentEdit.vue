<script setup lang="ts">
import k8sVolumeAttachmentQuery from '@/queries/k8s/VolumeAttachment.read.graphql'
import VolumeAttachmentEdit from '@/queries/k8s/VolumeAttachment.patch.graphql'
import k8sVolumeAttachmentMeta from '@/components/k8s/VolumeAttachmentMeta.vue';
import k8sVolumeAttachmentEdit from '@/components/k8s/VolumeAttachmentEdit.vue';
import k8sVolumeAttachmentStatus from '@/components/k8s/VolumeAttachmentStatus.vue';
import { useQuery, useMutation, useVolumeAttachment, VolumeAttachmentSimpleExcludes } from '../../../libs/k8s/VolumeAttachment.js'
const { onErrorHandler, notifySuccess, notifyError, onNotVolumeAttachmentFound, navigation, setItemFromRoute } = useVolumeAttachment();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sVolumeAttachmentQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": VolumeAttachmentSimpleExcludes
  },
});onError(onErrorHandler); onResult(res => {onNotVolumeAttachmentFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(VolumeAttachmentDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sVolumeAttachmentQuery from '@/queries/k8s/VolumeAttachment.read.graphql'
import VolumeAttachmentEdit from '@/queries/k8s/VolumeAttachment.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useVolumeAttachment, sanitizeData, getProperties } from '../../../libs/k8s/VolumeAttachment.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotVolumeAttachmentFound, setItemFromRoute, navigation, onErrorHandler } = useVolumeAttachment();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sVolumeAttachmentQuery, {"name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchVolumeAttachment, onDone: onPatchVolumeAttachment, onError: onPatchError } = useMutation(VolumeAttachmentEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchVolumeAttachment({ "name": result.value.k8sVolumeAttachment.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotVolumeAttachmentFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sVolumeAttachment.metadata.obj.spec})});onPatchVolumeAttachment(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sVolumeAttachmentMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
       />
      <k8sVolumeAttachmentStatus
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
       />
    </div><div class="col-md-6">
      <k8sVolumeAttachmentView
        v-if="!loading && result!=undefined && result.k8sVolumeAttachment[0]!=undefined && result.k8sVolumeAttachment[0]!=null"
        :model="result.k8sVolumeAttachment[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sVolumeAttachment!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">VolumeAttachment</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sVolumeAttachment.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sVolumeAttachment!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sVolumeAttachment!=null && result.k8sVolumeAttachment.status != null">
          <DefaultStatusView :status="result.k8sVolumeAttachment.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sVolumeAttachment!=null" class="q-ma-sm">
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