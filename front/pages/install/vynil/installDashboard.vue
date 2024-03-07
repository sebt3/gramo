<script setup lang="ts">
// noGramoGenerator
import { defineAsyncComponent } from 'vue'
import installQuery from '@/queries/vynil/install.read.graphql'
const  pieChart   = defineAsyncComponent(() => import( '@/components/charts/pieChart.vue'));
const  radialLineChart   = defineAsyncComponent(() => import( '@/components/charts/radialLineChart.vue'));
const  vynilDistribList   = defineAsyncComponent(() => import( '@/components/vynil/DistribList.vue'));
import { DistribSimpleExcludes } from '../../../libs/vynil/Distrib.js'
const  vynilInstallList   = defineAsyncComponent(() => import( '@/components/vynil/InstallList.vue'));
import { InstallSimpleExcludes, useInstall } from '../../../libs/vynil/Install.js'
import { colorDistrib, colorInstall } from '@/libs/vynil/custom.js'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const {toList: toInstallList}  = useInstall();
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const InstallByTs = ref([]);
const DistribProblems = ref([]);
const InstallProblems = ref([]);
const CatDistCount = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(installQuery, {
  "Distrib": {
    "filters": [],
    "excludes": DistribSimpleExcludes
  },
  "Install": {
    "filters": [],
    "excludes": InstallSimpleExcludes
  },
  "namespace": {
    "filters": isNamespaced()?[
      {
        "op": "eq",
        "path": "metadata/name",
        "value": navigation.currentNamespace
      }
    ]:[]
  }
});
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    DistribProblems.value.length = 0;
    DistribProblems.value.push(...Object.entries(Object.groupBy(res.data.vynilDistrib.filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0).map(o=>o['getcoreProblem']).flat(),p=>p['source'])).map(([name,v])=>{ return {name, value: v.length } }))
    InstallProblems.value.length = 0;
    InstallProblems.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.vynilInstall.filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0).length} }).filter(n => n.value>0))
    InstallByTs.value.length = 0;
    InstallByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.vynilInstall.length}}).filter(n => n.value>0))
    const flat = res.data.vynilDistrib.map(d => Object.entries(d.status.components).map(([category,pkgs])=>Object.entries(pkgs as object).map(([name, spec])=> {return {distrib: d.metadata.name, category, package: name}})).flat()).flat()
    CatDistCount.value.length = 0;
    CatDistCount.value.push( ...flat.map(l => l.distrib).filter((v,i,a)=>a.indexOf(v) === i)
                                      .map(d=> flat.map(l => l.category).filter((v,i,a)=>a.indexOf(v) === i)
                                        .map(c=>{return{category:c, distrib:d, value: flat.filter(i => i.category==c && i.distrib==d).length}}))
                                    .reduce((res, value) => res.concat(value), []))
    ready.value = true;
  }
})
</script>
<template><div>
  <div class="row q-mb-sm q-ml-sm" v-if="loading && !isNamespaced()">
    <div class="col-lg-4">
      <OverviewSkeleton />
    </div>
    <div class="col-lg-8">
      <TableSkeleton :showNamespace="false" />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm" v-if="!loading && !isNamespaced() && result.vynilDistrib.filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0).length>0">
    <div class="col-lg-4">
      <ProblemOverview short="Distrib" :to="toDistribList"
        :model="result.vynilDistrib.filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0)" />
    </div>
    <div class="col-lg-8">
      <vynilDistribList @refresh="refetch()" :useAction="false"
        v-if="result !== undefined && Array.isArray(result['vynilDistrib']) && result['vynilDistrib'].length>0"
        :model="result.vynilDistrib.filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0)" />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm" v-if="loading">
    <div class="col-lg-4">
      <OverviewSkeleton />
    </div>
    <div class="col-lg-8">
      <TableSkeleton :showNamespace="true" />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm" v-if="ready && DistribProblems.length>0">
    <div class="col-lg-4">
      <q-card bordered :class="`q-ma-sm bg-${ colorInstall }-${$q.dark.isActive?'10':'1'}`">
        <q-card-section class="text-center">
          <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none">Distrib problems per source</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart
            :datum="DistribProblems"
            />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-8">
      <vynilDistribList @refresh="refetch()" :useAction="false"
        v-if="result !== undefined && Array.isArray(result['vynilDistrib']) && result['vynilDistrib'].length>0"
        :model="result.vynilDistrib.filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0)"
      />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm" v-if="ready && InstallProblems.length>0">
    <div class="col-lg-4">
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center text-white bg-negative">
          <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none">Install problems per namespace</div>
        </q-card-section>
        <q-card-section class="text-center bg-red-2">
          <pieChart
            :datum="InstallProblems"
            @on-click="(name)=>{toInstallList(name)}"
            />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-8">
      <vynilInstallList @refresh="refetch()" :useAction="false"
        v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['vynilInstall']).flat().length>0"
        :model="result.k8sNamespace.map(x=>x.vynilInstall).flat().filter(o=>Array.isArray(o['getcoreProblem'])&&o['getcoreProblem'].length>0)"
      />
    </div>
  </div>
  <div class="row q-mb-sm q-ml-sm" v-if="!isNamespaced()">
    <div class="col-lg-4">
      <q-card bordered v-if="ready" :class="`q-ma-sm bg-${ colorDistrib }-${$q.dark.isActive?'10':'1'}`">
        <q-card-section :class="`text-center bg-${ colorDistrib }`">
          <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none"><a class="text-grey-8" href="#vynilDistrib">Distributions packages per categories</a></div>
        </q-card-section>
        <q-card-section class="text-center">
          <radialLineChart v-model:datum="CatDistCount" :axisX="function (d){return d!=undefined?d['category']:this.id}" :axisColor="function (d){return d!=undefined?d['distrib']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" ></radialLineChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && InstallByTs.length>1" >
      <q-card bordered :class="`q-ma-sm bg-${ colorInstall }-${$q.dark.isActive?'10':'1'}`">
        <q-card-section :class="`text-center bg-${ colorInstall }`">
          <div class="text-subtitle q-mt-none q-mb-none q-pt-none q-pb-none"><a class="text-grey-8" href="#vynilInstall">Install per namespace</a></div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart
            :datum="InstallByTs"
            @on-click="(name)=>{toInstallList(name)}"
            />
        </q-card-section>
      </q-card>
    </div>
  </div>
<div class="column">
<div  >
<a name="vynilDistrib" />
  <vynilDistribList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['vynilDistrib']) && result['vynilDistrib'].length>0"
    :model="result.vynilDistrib"
  />
</div>
<div  >
<a name="vynilInstall" />
  <vynilInstallList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['vynilInstall']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.vynilInstall).flat()"
  />
</div>
</div>
</div></template>