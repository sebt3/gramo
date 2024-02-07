<script setup lang="ts">
import databaseQuery from '@/queries/zalando/database.read.graphql'
import pieChart from '@/components/charts/pieChart.vue';
import zalandopostgresqlList from '@/components/zalando/postgresqlList.vue';
import { postgresqlListExcludes } from '../../../libs/zalando/postgresql.js'
import zalandoClusterKopfPeeringList from '@/components/zalando/ClusterKopfPeeringList.vue';
import { ClusterKopfPeeringListExcludes } from '../../../libs/zalando/ClusterKopfPeering.js'
import zalandoKopfPeeringList from '@/components/zalando/KopfPeeringList.vue';
import { KopfPeeringListExcludes } from '../../../libs/zalando/KopfPeering.js'
import { ref, useCore, useNavigationStoreRef, useQuery } from '../../../libs/core';
const { onErrorHandler, setNamespaceFromRoute, isNamespaced } = useCore();
const ready = ref(false);
const postgresqlByTs = ref([]);
const KopfPeeringByTs = ref([]);
if (isNamespaced()) setNamespaceFromRoute();
const navigation = useNavigationStoreRef();
const { result, refetch, onResult, onError } = useQuery(databaseQuery, {
  "postgresql": {
    "filters": [],
    "excludes": postgresqlListExcludes
  },
  "ClusterKopfPeering": {
    "filters": [],
    "excludes": ClusterKopfPeeringListExcludes
  },
  "KopfPeering": {
    "filters": [],
    "excludes": KopfPeeringListExcludes
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
    postgresqlByTs.value.length = 0;
    postgresqlByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.zalandopostgresql.length}}).filter(n => n.value>0))
    KopfPeeringByTs.value.length = 0;
    KopfPeeringByTs.value.push(...res.data.k8sNamespace.map(n => {return {name: n.metadata.name, value: n.zalandoKopfPeering.length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <div class="row q-mb-sm q-ml-sm">
    <div class="col-lg-4" v-if="ready && postgresqlByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">postgresql per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="postgresqlByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4" v-if="ready && KopfPeeringByTs.length>1" >
      <q-card bordered class="q-ma-sm">
        <q-card-section class="text-center">
          <div class="text-h6 text-grey-8 q-mt-none q-mb-none q-pt-none q-pb-none">KopfPeering per namespace</div>
        </q-card-section>
        <q-card-section class="text-center">
          <pieChart v-model:datum="KopfPeeringByTs"></pieChart>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <zalandopostgresqlList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['zalandopostgresql']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.zalandopostgresql).flat()"
  />
  <zalandoClusterKopfPeeringList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && Array.isArray(result['zalandoClusterKopfPeering']) && result['zalandoClusterKopfPeering'].length>0"
    :model="result.zalandoClusterKopfPeering"
  />
  <zalandoKopfPeeringList @refresh="refetch()" :useAction="false"
    v-if="result !== undefined && result['k8sNamespace'] !== undefined && Array.isArray(result['k8sNamespace']) && result['k8sNamespace'].map(n=>n['zalandoKopfPeering']).flat().length>0"
    :model="result.k8sNamespace.map(x=>x.zalandoKopfPeering).flat()"
  />
</template>