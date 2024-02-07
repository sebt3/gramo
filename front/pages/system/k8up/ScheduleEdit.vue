<script setup lang="ts">
import k8upScheduleQuery from '@/queries/k8up/Schedule.read.graphql'
import ScheduleEdit from '@/queries/k8up/Schedule.patch.graphql'
import OpenApiEdit from '@/components/core/OpenApiEdit.vue';
import MonacoEditor from '@/components/core/MonacoEditor.vue';
import k8upScheduleMeta from '@/components/k8up/ScheduleMeta.vue';
import k8upScheduleEdit from '@/components/k8up/ScheduleEdit.vue';
import k8upScheduleStatus from '@/components/k8up/ScheduleStatus.vue';
import { useQuery, useMutation, sanitizeData, useSchedule, ScheduleSimpleExcludes } from '../../../libs/k8up/Schedule.js'
const { onErrorHandler, patchDone, patchError, notifyWorking, onNotScheduleFound, navigation, editor, setNamespacedItemFromRoute } = useSchedule();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(k8upScheduleQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": ScheduleSimpleExcludes
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
const { mutate: patchSchedule, onDone: onPatchSchedule, onError: onPatchError } = useMutation(ScheduleEdit);
function onSubmit() {
  notifyWorking('Update in progress');
  patchSchedule({
    "name": result.k8sNamespace[0].k8upSchedule[0].metadata.name,
    "namespace": result.k8sNamespace[0].k8upSchedule[0].metadata.namespace,
    "spec": sanitizeData(editor.value.obj['spec']),
  });
}
onError(onErrorHandler);onResult(res => {onNotScheduleFound(res);editor.value.updateFromQuery(res, res.loading?{}:res.data.k8sNamespace[0].k8upSchedule[0])});onPatchSchedule(patchDone);onPatchError(patchError);
</script>

<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-6">
      <k8upScheduleMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div>
    <div class="col-md-6">
      <k8upScheduleStatus
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div>
    <div class="col-md-12">
      <k8upScheduleEdit
        v-if="!loading && result!=undefined && result.k8sNamespace!=undefined  && result.k8sNamespace[0].k8upSchedule[0]!=undefined && result.k8sNamespace[0].k8upSchedule[0]!=null"
        :model="result.k8sNamespace[0].k8upSchedule[0]"
       />
    </div>
  </div>
</template>

