<script setup lang="ts">
import fluxcdBucketQuery from '@/queries/fluxcd/Bucket.read.graphql'
import BucketEdit from '@/queries/fluxcd/Bucket.patch.graphql'
import fluxcdBucketMeta from '@/components/fluxcd/BucketMeta.vue';
import fluxcdBucketEdit from '@/components/fluxcd/BucketEdit.vue';
import fluxcdBucketStatus from '@/components/fluxcd/BucketStatus.vue';
import { useQuery, useMutation, useBucket, BucketSimpleExcludes } from '../../../libs/fluxcd/Bucket.js'
const { onErrorHandler, notifySuccess, notifyError, onNotBucketFound, navigation, setNamespacedItemFromRoute } = useBucket();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdBucketQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": BucketSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotBucketFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(BucketDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import fluxcdBucketQuery from '@/queries/fluxcd/Bucket.read.graphql'
import BucketEdit from '@/queries/fluxcd/Bucket.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useBucket, sanitizeData, getProperties } from '../../../libs/fluxcd/Bucket.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotBucketFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useBucket();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(fluxcdBucketQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchBucket, onDone: onPatchBucket, onError: onPatchError } = useMutation(BucketEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchBucket({ "namespace": result.value.fluxcdBucket.metadata.namespace, "name": result.value.fluxcdBucket.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotBucketFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.fluxcdBucket.metadata.obj.spec})});onPatchBucket(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <fluxcdBucketMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
       />
      <fluxcdBucketStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
       />
    </div><div class="col-md-6">
      <fluxcdBucketView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].fluxcdBucket[0]!=undefined && result.k8sNamespace[0].fluxcdBucket[0]!=null"
        :model="result.k8sNamespace[0].fluxcdBucket[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdBucket!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Bucket</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].fluxcdBucket.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].fluxcdBucket!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].fluxcdBucket!=null && result.k8sNamespace[0].fluxcdBucket.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].fluxcdBucket.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].fluxcdBucket!=null" class="q-ma-sm">
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