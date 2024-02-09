<script setup lang="ts">
// noGramoGenerator
import vynilInstallQuery from '@/queries/vynil/Install.details.graphql'
import InstallDelete from '@/queries/vynil/Install.delete.graphql'
import vynilInstallView from '@/components/vynil/InstallView.vue';
import { DistribListExcludes } from '../../../libs/vynil/custom.js'
import vynilDistribMeta from '@/components/vynil/DistribMeta.vue';
import vynilPackageMeta from '@/components/vynil/PackageList.vue';
import vynilCategoryMeta from '@/components/vynil/CategoryList.vue';
import { ref, useQuery, useMutation, useInstall, InstallReadExcludes } from '../../../libs/vynil/Install.js'
const { onErrorHandler, notifySuccess, notifyError, onNotInstallFound, navigation, setNamespacedItemFromRoute } = useInstall();setNamespacedItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilInstallQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": InstallReadExcludes
  },
  "consumeDistrib": {"filters": [], "excludes": DistribListExcludes},
  "consumePackage": {"filters": [], "excludes": []},
  "consumeCategory": {"filters": [], "excludes": []},
  "namespace": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]
  }
}, { pollInterval: 2000 });onError(onErrorHandler);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(InstallDelete);
const conditions = ref({
  "consumePackage": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['consumePackage']!=null).reduce((acc,cur)=>acc||cur,false),
});
const sectionCounts = ref({
  consumeLeft: 0,
  parent: 0,
  consumeRight: 0,
  users: 0,
  uses: 0,
  bellow: 0
});
onResult(res => {
  onNotInstallFound(res);
  if ( !res.loading ) {
    sectionCounts.value.uses += conditions.value["consumePackage"](res.data)?1:0;
    console.log(sectionCounts.value)
  }
});
onDeleteDone(() => {
  notifySuccess('Deletion proceded');
})
onDeleteError((err) => {
  notifyError('Deletion failed');
  console.log('deletion error',err);
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3" v-if="!loading && sectionCounts.users>0">
    </div>
    <div :class="`col-md-${6+(sectionCounts.uses<1?3:0)+(sectionCounts.users<1?3:0)}`">
      <vynilInstallView :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && Array.isArray(result.k8sNamespace)  && result.k8sNamespace[0].vynilInstall[0]!=undefined && result.k8sNamespace[0].vynilInstall[0]!=null"
        :model="result.k8sNamespace[0].vynilInstall[0]"
        />
    </div>
    <div class="col-md-3" v-if="!loading && sectionCounts.uses>0">
      <vynilPackageMeta v-if="!loading && conditions['consumePackage'](result)"
        :model="result.k8sNamespace[0].vynilInstall[0].consumePackage"
       />
    </div>
  </div>
</template>
