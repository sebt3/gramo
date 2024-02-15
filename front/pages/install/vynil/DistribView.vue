<script setup lang="ts">
// noGramoGenerator
import vynilDistribQuery from '@/queries/vynil/Distrib.details.graphql'
import DistribDelete from '@/queries/vynil/Distrib.delete.graphql'
import vynilDistribView from '@/components/vynil/DistribView.vue';
import vynilPackageList from '@/components/vynil/PackageList.vue';
import vynilCategoryList from '@/components/vynil/CategoryList.vue';
import { InstallSimpleExcludes } from '../../../libs/vynil/custom.js'
import vynilInstallList from '@/components/vynil/InstallList.vue';
import { JobListExcludes } from '../../../libs/k8s/custom.js'
import k8sJobList from '@/components/k8s/JobList.vue';
import vynilInstallMeta from '@/components/vynil/InstallMeta.vue';
import { CronJobListExcludes } from '../../../libs/k8s/custom.js'
import k8sCronJobList from '@/components/k8s/CronJobList.vue';
import { ref, useQuery, useMutation, useDistrib, DistribReadExcludes } from '../../../libs/vynil/Distrib.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDistribFound, navigation, setItemFromRoute } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, {
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DistribReadExcludes
  },
  "parentvynilInstall": {"filters": [], "excludes": InstallSimpleExcludes},
  "usek8sJob": {"filters": [], "excludes": JobListExcludes},
  "usek8sCronJob": {"filters": [], "excludes": CronJobListExcludes},
  "providevynilPackage": {"filters": [], "excludes": []},
  "providevynilCategory": {"filters": [], "excludes": []},
  "providevynilInstall": {"filters": [], "excludes": InstallSimpleExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DistribDelete);
const conditions = ref({
  "providevynilPackage": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providevynilPackage']).flat().length>0,
  "providevynilCategory": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providevynilCategory']).flat().length>0,
  "providevynilInstall": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providevynilInstall']).flat().length>0,
  "usek8sJob": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['usek8sJob']).flat().filter(o=>o!=null).length>0,
  "usek8sCronJob": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['usek8sCronJob']).flat().filter(o=>o!=null).length>0,
  "parentvynilInstall": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['parentvynilInstall']!=null).reduce((acc,cur)=>acc||cur,false),
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
  onNotDistribFound(res);
  if ( !res.loading ) {
    sectionCounts.value.bellow += conditions.value["providevynilPackage"](res.data)?1:0;
    sectionCounts.value.uses += conditions.value["providevynilCategory"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["providevynilInstall"](res.data)?1:0;
    sectionCounts.value.consumeRight += conditions.value["usek8sJob"](res.data)?1:0;
    sectionCounts.value.consumeLeft += conditions.value["usek8sCronJob"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentvynilInstall"](res.data)?1:0;
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
      <k8sCronJobList :useRefresh="false"
        v-if="!loading && conditions['usek8sCronJob'](result)"
        :model="result.vynilDistrib[0].usek8sCronJob"
       />
    </div>
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div class="col-md-4" v-if="!loading && conditions['parentvynilInstall'](result)">
      <vynilInstallMeta :showStatus="false"
        :model="result.vynilDistrib[0].parentvynilInstall"
       />
    </div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
      <k8sJobList :useRefresh="false"
        v-if="!loading && conditions['usek8sJob'](result)"
        :model="result.vynilDistrib[0].usek8sJob"
       />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3" v-if="!loading && sectionCounts.users>0">
    </div>
    <div :class="`col-md-${6+(sectionCounts.uses<1?3:0)+(sectionCounts.users<1?3:0)}`">
      <vynilDistribView :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
        />
    </div>
    <div class="col-md-3" v-if="!loading && sectionCounts.uses>0">
      <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providevynilCategory'](result)">
        <vynilCategoryList
          :model="result.vynilDistrib[0].providevynilCategory"
        />
      </div>
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providevynilPackage'](result)">
      <vynilPackageList
        :model="result.vynilDistrib[0].providevynilPackage"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providevynilInstall'](result)">
      <vynilInstallList
        :model="result.vynilDistrib[0].providevynilInstall"
       />
    </div>
  </div>
</template>
