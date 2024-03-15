<script setup lang="ts">
// noGramoGenerator
import { defineAsyncComponent } from 'vue'
import { i18n } from "../../../libs/i18n"
import vynilDistribQuery from '@/queries/vynil/Distrib.details.graphql'
import DistribDelete from '@/queries/vynil/Distrib.delete.graphql'
const  vynilDistribView   = defineAsyncComponent(() => import( '@/components/vynil/DistribView.vue'));
const  vynilPackageList   = defineAsyncComponent(() => import( '@/components/vynil/PackageList.vue'));
const  vynilCategoryList   = defineAsyncComponent(() => import( '@/components/vynil/CategoryList.vue'));
const  vynilInstallList   = defineAsyncComponent(() => import( '@/components/vynil/InstallList.vue'));
const  k8sJobList   = defineAsyncComponent(() => import( '@/components/k8s/JobList.vue'));
const  k8sCronJobList   = defineAsyncComponent(() => import( '@/components/k8s/CronJobList.vue'));
const  coreEventList   = defineAsyncComponent(() => import( '@/components/core/EventList.vue'));
const  vynilInstallMeta   = defineAsyncComponent(() => import( '@/components/vynil/InstallMeta.vue'));
const  fluxcdKustomizationMeta   = defineAsyncComponent(() => import( '@/components/fluxcd/KustomizationMeta.vue'));
import { PackageListExcludes as vynilPackageListExcludes } from '../../../libs/vynil/custom.js'
import { CategoryListExcludes as vynilCategoryListExcludes } from '../../../libs/vynil/custom.js'
import { InstallListExcludes as vynilInstallListExcludes } from '../../../libs/vynil/custom.js'
import { JobListExcludes as k8sJobListExcludes } from '../../../libs/k8s/custom.js'
import { CronJobListExcludes as k8sCronJobListExcludes } from '../../../libs/k8s/custom.js'
import { EventListExcludes as coreEventListExcludes } from '../../../libs/core/custom.js'
import { KustomizationListExcludes as fluxcdKustomizationListExcludes } from '../../../libs/fluxcd/custom.js'
import { ref, sanitizeData, useQuery, useMutation, useDistrib, DistribReadExcludes } from '../../../libs/vynil/Distrib.js'
const { actionDelete, onErrorHandler, notifySuccess, notifyError, onNotDistribFound, navigation, setItemFromRoute } = useDistrib();setItemFromRoute();
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
  "providevynilPackage": {"filters": [], "excludes": vynilPackageListExcludes},
  "providevynilCategory": {"filters": [], "excludes": vynilCategoryListExcludes},
  "providevynilInstall": {"filters": [], "excludes": vynilInstallListExcludes},
  "usek8sJob": {"filters": [], "excludes": k8sJobListExcludes},
  "usek8sCronJob": {"filters": [], "excludes": k8sCronJobListExcludes},
  "getcoreEvent": {"filters": [], "excludes": coreEventListExcludes},
  "parentvynilInstall": {"filters": [], "excludes": vynilInstallListExcludes},
  "parentfluxcdKustomization": {"filters": [], "excludes": fluxcdKustomizationListExcludes},
}, navigation.refreshOption);onError(onErrorHandler);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DistribDelete);
const conditions = ref({
  "providevynilPackage": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providevynilPackage']).flat().filter(o=>o!=null).length>0,
  "providevynilCategory": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providevynilCategory']).flat().filter(o=>o!=null).length>0,
  "providevynilInstall": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providevynilInstall']).flat().filter(o=>o!=null).length>0,
  "usek8sJob": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['usek8sJob']).flat().filter(o=>o!=null).length>0,
  "usek8sCronJob": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['usek8sCronJob']).flat().filter(o=>o!=null).length>0,
  "getcoreEvent": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['getcoreEvent']).flat().filter(o=>o!=null).length>0,
  "parentvynilInstall": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['parentvynilInstall']!=null).reduce((acc,cur)=>acc||cur,false),
  "parentfluxcdKustomization": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['parentfluxcdKustomization']!=null).reduce((acc,cur)=>acc||cur,false),
});
const sectionCounts = ref({
  consumeLeft: 0,
  parent: 0,
  consumeRight: 0,
  gets: 0,
  users: 0,
  uses: 0,
  bellow: 0
});
const model = ref({});
onResult(res => {
  onNotDistribFound(res);
  if ( !res.loading ) {
    if (res.data!=undefined && res.data.vynilDistrib[0]!=undefined && res.data.vynilDistrib[0]!=null) {
      model.value = res.data.vynilDistrib[0]
    }
    sectionCounts.value.bellow += conditions.value["providevynilPackage"](res.data)?1:0;
    sectionCounts.value.uses += conditions.value["providevynilCategory"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["providevynilInstall"](res.data)?1:0;
    sectionCounts.value.consumeRight += conditions.value["usek8sJob"](res.data)?1:0;
    sectionCounts.value.consumeLeft += conditions.value["usek8sCronJob"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentvynilInstall"](res.data)?1:0;
    sectionCounts.value.parent += conditions.value["parentfluxcdKustomization"](res.data)?1:0;
  }
});
onDeleteDone(() => {
  notifySuccess(i18n.global.t('delete.notifyDone'));
})
onDeleteError((err) => {
  notifyError(i18n.global.t('delete.notifyError'));
  console.log('deletion error',err);
})
</script>
<template><div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeLeft>0">
      <k8sCronJobList :useRefresh="false"
        v-if="!loading && conditions['usek8sCronJob'](result)"
        :model="result.vynilDistrib[0].usek8sCronJob"
        origin="usersvynilDistrib"
       />
    </div>
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div class="col-md-4" v-if="!loading && sectionCounts.parent>0">
    <div v-if="!loading && conditions['parentvynilInstall'](result)&&sectionCounts.parent==1">
      <vynilInstallMeta :showStatus="false"
        :model="result.vynilDistrib[0].parentvynilInstall"
        origin="childvynilDistrib"
       />
    </div>
    <div v-if="!loading && conditions['parentfluxcdKustomization'](result)">
      <fluxcdKustomizationMeta :showStatus="false"
        :model="result.vynilDistrib[0].parentfluxcdKustomization"
        origin="childvynilDistrib"
       />
    </div>
    </div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
      <k8sJobList :useRefresh="false"
        v-if="!loading && conditions['usek8sJob'](result)"
        :model="result.vynilDistrib[0].usek8sJob"
        origin="usersvynilDistrib"
       />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-md-1" v-if="!loading && sectionCounts.users==0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.users>0">
    </div>
    <div :class="`col-md-${6+(sectionCounts.uses<1?2:0)+(sectionCounts.users<1?2:0)}`">
      <div><vynilDistribView :useActions="true"
        v-if="!loading && model['metadata'] != undefined"
        :model="sanitizeData(model)"
        @on-delete="(meta)=>{actionDelete(deletor, meta)}"
        /></div>
    </div>
    <div class="col-md-1" v-if="!loading && sectionCounts.uses==0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.uses>0">
      <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providevynilCategory'](result)">
      <vynilCategoryList :useRefresh="false"
        :model="result.vynilDistrib[0].providevynilCategory"
        origin="consumevynilDistrib"
       />
    </div>
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providevynilPackage'](result)">
      <vynilPackageList :useRefresh="false"
        :model="result.vynilDistrib[0].providevynilPackage"
        origin="consumevynilDistrib"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providevynilInstall'](result)">
      <vynilInstallList :useRefresh="false"
        :model="result.vynilDistrib[0].providevynilInstall"
        origin="consumevynilDistrib"
       />
    </div>
  </div>
</div></template>
