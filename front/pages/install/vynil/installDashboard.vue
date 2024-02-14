<script setup lang="ts">
// noGramoGenerator
import installQuery from '@/queries/vynil/install.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import radialLineChart from '@/components/charts/radialLineChart.vue';
import vynilDistribList from '@/components/vynil/DistribList.vue';
import { DistribSimpleExcludes } from '../../../libs/vynil/Distrib.js'
import vynilInstallList from '@/components/vynil/InstallList.vue';
import { InstallSimpleExcludes, useInstall } from '../../../libs/vynil/Install.js'
const {toList: toInstallList}  = useInstall();
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const InstallByTs = ref([]);
const ErrorsByTs = ref([]);
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
}, { pollInterval: 2000 });
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    InstallByTs.value.length = 0;
    InstallByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.vynilInstall.length}}).filter(n => n.value>0))
    ErrorsByTs.value.length = 0;
    ErrorsByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.vynilInstall.filter(i => !Array.isArray(i.status.errors) || i.status.errors.length>0).length}}).filter(n => n.value>0))
    const flat = res.data.vynilDistrib.map(d => Object.entries(d.status.components).map(([category,pkgs])=>Object.entries(pkgs as object).map(([name, spec])=> {return {distrib: d.metadata.name, category, package: name}})).flat()).flat()
    CatDistCount.value.length = 0;
    CatDistCount.value.push( ...flat.map(l => l.distrib).filter((v,i,a)=>a.indexOf(v) === i)
                                      .map(d=> flat.map(l => l.category).filter((v,i,a)=>a.indexOf(v) === i)
                                        .map(c=>{return{category:c, distrib:d, value: flat.filter(i => i.category==c && i.distrib==d).length}}))
                                    .reduce((res, value) => res.concat(value), []))
    console.log(CatDistCount.value)
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4">
      <q-card bordered v-if="ready" class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Distributions packages per categories</div>
        </q-card-section>
        <q-card-section class="text-center">
          <radialLineChart v-model:datum="CatDistCount" :axisX="function (d){return d!=undefined?d['category']:this.id}" :axisColor="function (d){return d!=undefined?d['distrib']:this.id}" :getVal="function (d){return d!=undefined?d['value']:this.id}" ></radialLineChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && InstallByTs.length>0" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Install per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="InstallByTs" @on-click="(name)=>{toInstallList(name)}" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && ErrorsByTs.length>0" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Install with errors per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ErrorsByTs" @on-click="(name)=>{toInstallList(name)}" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <vynilDistribList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['vynilDistrib']) && result['vynilDistrib'].length>0"
    :model="result.vynilDistrib"
  />
  <vynilInstallList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['vynilInstall']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.vynilInstall).flat()"
  />
</template>