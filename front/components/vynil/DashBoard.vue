<script setup>
import vynilDashboardQuery from '@/queries/vynil/Dashboard.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import radialLineChart from '@/components/charts/radialLineChart.vue';
import InstallAllTable from './InstallAllTable.vue';
import { ref, useQuery, useDistrib, onlyUnique } from './Distrib'
const { onErrorHandler } = useDistrib()
const { onResult, onError } = useQuery(vynilDashboardQuery)
const ready = ref(false);
const InstallByTs = ref([]);
const ErrorsByTs = ref([]);
const PackagesPerCats = ref([]);
const PackagesPerDists = ref([]);
const CatsPerDists = ref([]);
const CatDistCount = ref([]);
onError(onErrorHandler);
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    InstallByTs.value.length = 0;
    InstallByTs.value.push(...res.data.namespaces.map(n => {return {name: n.metadata.name, value: n.vynilInstalls.length}}).filter(n => n.value>0))
    ErrorsByTs.value.length = 0;
    ErrorsByTs.value.push(...res.data.namespaces.map(n => {return {name: n.metadata.name, value: n.vynilInstalls.filter(i => i.status.errors.length>0).length}}).filter(n => n.value>0))
    const flat = res.data.vynilDistribs.map(d => d.packages.map(c=>{return {distrib: d.metadata.name, category: c.category.name, package: c.name}})).flat()
/*    CatsPerDists.value.length = 0;
    CatsPerDists.value.push(...flat.map(l => l.distrib).filter(onlyUnique).map(d => {return {name: d, value: flat.filter(l=>l.distrib==d).map(l=>l.category).filter(onlyUnique).length}}))
    PackagesPerCats.value.length = 0;
    PackagesPerCats.value.push(...flat.map(l => l.category).filter(onlyUnique).map(c => {return {name: c, value: flat.filter(l=>l.category==c).length}}));
    PackagesPerDists.value.length = 0;
    PackagesPerDists.value.push(...flat.map(l => l.distrib).filter(onlyUnique).map(d => {return {name: d, value: flat.filter(l=>l.distrib==d).length}}));*/
    CatDistCount.value.length = 0;
    CatDistCount.value.push( ...flat.map(l => l.distrib).filter(onlyUnique)
                                      .map(d=> flat.map(l => l.category).filter(onlyUnique)
                                        .map(c=>{return{category:c, distrib:d, value: flat.filter(i => i.category==c && i.distrib==d).length}}))
                                    .reduce((res, value) => res.concat(value), []))
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
    </div><div class="col-lg-4">
      <q-card bordered v-if="ready && InstallByTs.length>0" class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Install per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="InstallByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div><div class="col-lg-4">
      <q-card bordered v-if="ready && ErrorsByTs.length>0" class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Install with errors per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="ErrorsByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div><div class="col-lg-4">
      <q-card bordered v-if="ready && CatsPerDists.length>0" class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Categories per distributions</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="CatsPerDists"></pieChart>
        </q-card-section>
      </q-card>
    </div><div class="col-lg-4">
      <q-card bordered v-if="ready && PackagesPerCats.length>0" class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Packages per categories</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PackagesPerCats"></pieChart>
        </q-card-section>
      </q-card>
    </div><div class="col-lg-4">
      <q-card bordered v-if="ready && PackagesPerDists.length>0" class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">Packages per distributions</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="PackagesPerDists"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <InstallAllTable />
</template>
