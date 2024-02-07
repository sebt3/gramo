<script setup lang="ts">
import fluxcdReceiverQuery from '@/queries/fluxcd/Receiver.read.graphql'
import ReceiverEdit from '@/queries/fluxcd/Receiver.patch.graphql'
import fluxcdReceiverMeta from '@/components/fluxcd/ReceiverMeta.vue';
import fluxcdReceiverEdit from '@/components/fluxcd/ReceiverEdit.vue';
import fluxcdReceiverStatus from '@/components/fluxcd/ReceiverStatus.vue';
import { useQuery, useMutation, useReceiver, ReceiverSimpleExcludes } from '../../../libs/fluxcd/Receiver.js'
const { onErrorHandler, notifySuccess, notifyError, onNotReceiverFound, navigation, setNamespacedItemFromRoute } = useReceiver();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdReceiverQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ReceiverSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotReceiverFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(ReceiverDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdReceiverQuery from '@/queries/fluxcd/Receiver.read.graphql'
import ReceiverEdit from '@/queries/fluxcd/Receiver.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useReceiver, sanitizeData, getProperties } from '../../../libs/fluxcd/Receiver.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotReceiverFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useReceiver();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdReceiverQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchReceiver, onDone: onPatchReceiver, onError: onPatchError } = useMutation(ReceiverEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchReceiver({ "namespace": result.value.fluxcdReceiver.metadata.namespace, "name": result.value.fluxcdReceiver.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotReceiverFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdReceiver.metadata.obj.spec})});onPatchReceiver(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdReceiverMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
      <fluxcdReceiverStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div><div class="col-md-6">
      <fluxcdReceiverView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdReceiver[0]!=undefined && result.k8sNamespace[0].fluxcdReceiver[0]!=null"
        :model="result.k8sNamespace[0].fluxcdReceiver[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdReceiver!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Receiver</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdReceiver.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdReceiver!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdReceiver!=null && result.k8sNamespace[0].fluxcdReceiver.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdReceiver.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdReceiver!=null" class="q-ma-sm">
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