<script setup lang="ts">
import k8sJobQuery from '@/queries/k8s/Job.read.graphql'
import JobEdit from '@/queries/k8s/Job.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sJobMeta from '@/components/k8s/JobMeta.vue';
import k8sJobEdit from '@/components/k8s/JobEdit.vue';
import k8sJobStatus from '@/components/k8s/JobStatus.vue';
import { useQuery, useMutation, sanitizeData, useJob, JobSimpleExcludes } from '../../../libs/k8s/Job.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotJobFound, navigation, editor, setNamespacedItemFromRoute } = useJob();setNamespacedItemFromRoute();
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
});
const { mutate: patchJob, onDone: onPatchJob, onError: onPatchError } = useMutation(JobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchJob({
    "name": result.k8sNamespace[0].k8sJob[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sJob[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotJobFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sJob[0])});onPatchJob(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sJobEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sJob[0]!=undefined && result.k8sNamespace[0].k8sJob[0]!=null"
        :model="result.k8sNamespace[0].k8sJob[0]"
       />
    </div>
  </div>
</template>

