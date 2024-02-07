<script setup lang="ts">
import k8sCronJobQuery from '@/queries/k8s/CronJob.read.graphql'
import CronJobEdit from '@/queries/k8s/CronJob.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8sCronJobMeta from '@/components/k8s/CronJobMeta.vue';
import k8sCronJobEdit from '@/components/k8s/CronJobEdit.vue';
import k8sCronJobStatus from '@/components/k8s/CronJobStatus.vue';
import { useQuery, useMutation, sanitizeData, useCronJob, CronJobSimpleExcludes } from '../../../libs/k8s/CronJob.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotCronJobFound, navigation, editor, setNamespacedItemFromRoute } = useCronJob();setNamespacedItemFromRoute();
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
});
const { mutate: patchCronJob, onDone: onPatchCronJob, onError: onPatchError } = useMutation(CronJobEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchCronJob({
    "name": result.k8sNamespace[0].k8sCronJob[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8sCronJob[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotCronJobFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8sCronJob[0])});onPatchCronJob(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8sCronJobMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
    </div>
    <div class="col-md-6">
      <k8sCronJobStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
    </div>
    <div class="col-md-12">
      <k8sCronJobEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8sCronJob[0]!=undefined && result.k8sNamespace[0].k8sCronJob[0]!=null"
        :model="result.k8sNamespace[0].k8sCronJob[0]"
       />
    </div>
  </div>
</template>

