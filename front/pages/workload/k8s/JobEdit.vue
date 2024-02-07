<script setup lang="ts">
import k8sJobQuery from '@/queries/k8s/Job.read.graphql'
import JobEdit from '@/queries/k8s/Job.patch.graphql'
import k8sJobMeta from '@/components/k8s/JobMeta.vue';
import k8sJobEdit from '@/components/k8s/JobEdit.vue';
import k8sJobStatus from '@/components/k8s/JobStatus.vue';
import { useQuery, useMutation, useJob, JobSimpleExcludes } from '../../../libs/k8s/Job.js'
const { onErrorHandler, notifySuccess, notifyError, onNotJobFound, navigation, setNamespacedItemFromRoute } = useJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": JobSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotJobFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(JobDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sJobQuery from '@/queries/k8s/Job.read.graphql'
import JobEdit from '@/queries/k8s/Job.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useJob, sanitizeData, getProperties } from '../../../libs/k8s/Job.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotJobFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sJobQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchJob, onDone: onPatchJob, onError: onPatchError } = useMutation(JobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchJob({ "namespace": result.value.k8sJob.metadata.namespace, "name": result.value.k8sJob.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotJobFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sJob.metadata.obj.spec})});onPatchJob(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
      <k8sJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
      <k8sCronJobMeta
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].parentCronJob!=null && result.k8sNamespace[0].k8sJob[0].parentCronJob.length>0"
        :model="result.k8sNamespace[0].k8sJob[0].parentCronJob[0]"
       />
      <k8sPodList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null && result.k8sNamespace[0].k8sJob[0].childPod!=null && result.k8sNamespace[0].k8sJob[0].childPod.length>0"
        :model="result.k8sNamespace[0].k8sJob[0].childPod"
       />
    </div><div class="col-md-6">
      <k8sJobView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Job</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sJob.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sJob!=null && result.k8sNamespace[0].k8sJob.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sJob.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sJob!=null" class="q-ma-sm">
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