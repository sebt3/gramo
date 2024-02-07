<script setup lang="ts">
import k8sCronJobQuery from '@/queries/k8s/CronJob.read.graphql'
import CronJobEdit from '@/queries/k8s/CronJob.patch.graphql'
import k8sCronJobMeta from '@/components/k8s/CronJobMeta.vue';
import k8sCronJobEdit from '@/components/k8s/CronJobEdit.vue';
import k8sCronJobStatus from '@/components/k8s/CronJobStatus.vue';
import { useQuery, useMutation, useCronJob, CronJobSimpleExcludes } from '../../../libs/k8s/CronJob.js'
const { onErrorHandler, notifySuccess, notifyError, onNotCronJobFound, navigation, setNamespacedItemFromRoute } = useCronJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCronJobQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": CronJobSimpleExcludes
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
});onError(onErrorHandler); onResult(res => {onNotCronJobFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(CronJobDelete);
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>



<script setup lang="ts">
import k8sCronJobQuery from '@/queries/k8s/CronJob.read.graphql'
import CronJobEdit from '@/queries/k8s/CronJob.patch.graphql'
import MetadataView from '@/components/core/MetadataView.vue';
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import DefaultStatusView from '@/components/core/DefaultStatusView.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import { ref, useQuery, useMutation, useCronJob, sanitizeData, getProperties } from '../../../libs/k8s/CronJob.js'
const spec  = ref({});
const { editor, patchDone, patchError, notifyWorking, onNotCronJobFound, setNamespacedItemFromRoute, navigation, onErrorHandler } = useCronJob();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8sCronJobQuery, {"namespace": navigation.currentNamespace, "name": navigation.currentItem}, { pollInterval: 500 });
const { mutate: patchCronJob, onDone: onPatchCronJob, onError: onPatchError } = useMutation(CronJobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCronJob({ "namespace": result.value.k8sCronJob.metadata.namespace, "name": result.value.k8sCronJob.metadata.name, "spec": sanitizeData(spec.value) });
}
onError(onErrorHandler);onResult(res => {onNotCronJobFound(res);editor.value.updateFromQuery(res, res.loading?{}:{spec: res.data.k8sCronJob.metadata.obj.spec})});onPatchCronJob(patchDone);onPatchError(patchError);
</script>




<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCronJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
      <k8sCronJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
      <k8sJobList
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null && result.k8sNamespace[0].k8sCronJob[0].childJob!=null && result.k8sNamespace[0].k8sCronJob[0].childJob.length>0"
        :model="result.k8sNamespace[0].k8sCronJob[0].childJob"
       />
    </div><div class="col-md-6">
      <k8sCronJobView
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
    </div>
  </div>
</template>



<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-sm-8 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sCronJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">CronJob</div>
        </q-card-section>
        <q-card-section>
          <MetadataView :metadata="result.k8sNamespace[0].k8sCronJob.metadata" />
        </q-card-section>
      </q-card>
    </div><div class="col-sm-4 col-md-6">
      <q-card bordered v-if="!loading && result.k8sNamespace[0].k8sCronJob!=null" class="q-ma-sm">
        <q-card-section>
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Status</div>
        </q-card-section>
        <q-card-section v-if="!loading && result.k8sNamespace[0].k8sCronJob!=null && result.k8sNamespace[0].k8sCronJob.status != null">
          <DefaultStatusView :status="result.k8sNamespace[0].k8sCronJob.status" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-form @submit="onSubmit" class="q-gutter-md q-pt-sm q-ml-sm">
    <q-card bordered v-if="!loading && editor.ready && result.k8sNamespace[0].k8sCronJob!=null" class="q-ma-sm">
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