<script setup lang="ts">
// noGramoGenerator
import vynilInstallQuery from '@/queries/vynil/Install.details.graphql'
import InstallDelete from '@/queries/vynil/Install.delete.graphql'
import vynilInstallView from '@/components/vynil/InstallView.vue';
import { DistribListExcludes } from '../../../libs/vynil/custom.js'
import { PackageListExcludes } from '../../../libs/vynil/custom.js'
import vynilPackageMeta from '@/components/vynil/PackageMeta.vue';
import { CategoryListExcludes } from '../../../libs/vynil/custom.js'
import { InstallListExcludes } from '../../../libs/vynil/custom.js'
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import { JobListExcludes } from '../../../libs/k8s/custom.js'
import k8sJobList from '@/components/k8s/JobList.vue';
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
  "consumevynilDistrib": {"filters": [], "excludes": DistribListExcludes},
  "consumevynilPackage": {"filters": [], "excludes": PackageListExcludes},
  "consumevynilCategory": {"filters": [], "excludes": CategoryListExcludes},
  "usek8sJob": {"filters": [], "excludes": JobListExcludes},
  "parentvynilInstall": {"filters": [], "excludes": InstallListExcludes},
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
  "consumevynilPackage": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['consumevynilPackage']!=null).reduce((acc,cur)=>acc||cur,false),
  "usek8sJob": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['usek8sJob']).flat().filter(o=>o!=null).length>0,
  "parentvynilInstall": (data) => Array.isArray(data.k8sNamespace) && data.k8sNamespace.map(ns=>ns['vynilInstall']).flat().map(obj=>obj['parentvynilInstall']!=null).reduce((acc,cur)=>acc||cur,false),
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
    sectionCounts.value.uses += conditions.value["consumevynilPackage"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentvynilInstall"](res.data)?1:0;
    sectionCounts.value.uses += conditions.value["usek8sJob"](res.data)?1:0;
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
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeLeft>0">
    </div>
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div class="col-md-4" v-if="!loading && conditions['parentvynilInstall'](result)">
      <vynilInstallMeta :showStatus="false"
        :model="result.k8sNamespace[0].vynilInstall[0].parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
    </div>
  </div>
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
      <vynilPackageMeta v-if="!loading && conditions['consumevynilPackage'](result)"
        :model="result.k8sNamespace[0].vynilInstall[0].consumevynilPackage"
       />
      <k8sJobList :useRefresh="false"
        v-if="!loading && conditions['usek8sJob'](result)"
        :model="result.k8sNamespace[0].vynilInstall[0].usek8sJob"
       />
    </div>
  </div>
</template>
