<script setup lang="ts">
// noGramoGenerator
import vynilDistribQuery from '@/queries/vynil/Distrib.details.graphql'
import DistribDelete from '@/queries/vynil/Distrib.delete.graphql'
import vynilDistribView from '@/components/vynil/DistribView.vue';
import vynilPackageList from '@/components/vynil/PackageList.vue';
import vynilCategoryList from '@/components/vynil/CategoryList.vue';
import { InstallSimpleExcludes } from '../../../libs/vynil/custom.js'
import vynilInstallList from '@/components/vynil/InstallList.vue';
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
  "providePackage": {"filters": [], "excludes": []},
  "provideCategory": {"filters": [], "excludes": []},
  "provideInstall": {"filters": [], "excludes": InstallSimpleExcludes},
}, { pollInterval: 2000 });onError(onErrorHandler);
const { mutate: deletor, onDone: onDeleteDone, onError: onDeleteError } = useMutation(DistribDelete);
const conditions = ref({
  "providePackage": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['providePackage']).flat().length>0,
  "provideCategory": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['provideCategory']).flat().length>0,
  "provideInstall": (data) => Array.isArray(data['vynilDistrib']) && data['vynilDistrib'].map(obj=>obj['provideInstall']).flat().length>0,
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
    sectionCounts.value.bellow += conditions.value["providePackage"](res.data)?1:0;
    sectionCounts.value.uses += conditions.value["provideCategory"](res.data)?1:0;
    sectionCounts.value.bellow += conditions.value["provideInstall"](res.data)?1:0;
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
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeLeft>0">
    </div>
    <div :class="`col-md-${4-(sectionCounts.consumeLeft>0?3:0)}`" v-if="!loading && sectionCounts.parent+sectionCounts.consumeRight>0"></div>
    <div :class="`col-md-${5-(sectionCounts.parent>0?4:0)}`" v-if="!loading && sectionCounts.consumeRight>0"></div>
    <div class="col-md-3" v-if="!loading && sectionCounts.consumeRight>0">
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
      <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['provideCategory'](result)">
        <vynilCategoryList
          :model="result.vynilDistrib[0].provideCategory"
        />
      </div>
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['providePackage'](result)">
      <vynilPackageList
        :model="result.vynilDistrib[0].providePackage"
       />
    </div>
    <div :class="`col-md-${sectionCounts.bellow<1?12:sectionCounts.bellow>4?3:12/sectionCounts.bellow}`" v-if="!loading && conditions['provideInstall'](result)">
      <vynilInstallList
        :model="result.vynilDistrib[0].provideInstall"
       />
    </div>
  </div>
</template>
