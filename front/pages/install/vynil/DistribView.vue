<script setup lang="ts">
// noGramoGenerator
import vynilDistribQuery from '@/queries/vynil/Distrib.details.graphql'
import DistribDelete from '@/queries/vynil/Distrib.delete.graphql'
import vynilDistribMeta from '@/components/vynil/DistribMeta.vue';
import vynilDistribView from '@/components/vynil/DistribView.vue';
import vynilDistribStatus from '@/components/vynil/DistribStatus.vue';
import vynilPackageList from '@/components/vynil/PackageList.vue';
import vynilCategoryList from '@/components/vynil/CategoryList.vue';
import vynilInstallList from '@/components/vynil/InstallList.vue';
import { InstallSimpleExcludes } from '../../../libs/vynil/custom.js'
import { useQuery, useMutation, useDistrib, DistribReadExcludes } from '../../../libs/vynil/Distrib.js'
const { onErrorHandler, notifySuccess, notifyError, onNotDistribFound, navigation, setItemFromRoute } = useDistrib();setItemFromRoute();
const { result, loading, onResult, onError } = useQuery(vynilDistribQuery, {
  "providePackage": {"filters": [], "excludes": []},
  "provideCategory": {"filters": [], "excludes": []},
  "usedByInstall": {"filters": [], "excludes": InstallSimpleExcludes},
  "obj": {
    "filters": [
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentItem
      }
    ], "excludes": DistribReadExcludes
  },
}, { pollInterval: 2000 });onError(onErrorHandler); onResult(res => {onNotDistribFound(res)});
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DistribDelete);
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
    <div class="col-md-4">
      <vynilDistribMeta :deletor="deletor" :useActions="true"
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div>
    <div class="col-md-4">
      <vynilDistribStatus
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
       />
    </div>
    <div class="col-md-4" v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null && result.vynilDistrib[0].provideCategory!=null && result.vynilDistrib[0].provideCategory.length>0">
      <vynilCategoryList
        :model="result.vynilDistrib[0].provideCategory"
       />
    </div>
    <div class="col-md-12">
      <vynilDistribView class="q-ma-sm"
        v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null"
        :model="result.vynilDistrib[0]"
        />
    </div>
    <div class="col-md-6" v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null && result.vynilDistrib[0].providePackage!=null && result.vynilDistrib[0].providePackage.length>0">
      <vynilPackageList
        :model="result.vynilDistrib[0].providePackage"
       />
    </div>
    <div class="col-md-6" v-if="!loading && result!=undefined && result.vynilDistrib[0]!=undefined && result.vynilDistrib[0]!=null && result.vynilDistrib[0].usedByInstall!=null && result.vynilDistrib[0].usedByInstall.length>0">
      <vynilInstallList
        :model="result.vynilDistrib[0].usedByInstall"
       />
    </div>
  </div>
</template>
