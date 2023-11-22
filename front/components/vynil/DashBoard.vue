<script setup>
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import vynilDashboardQuery from '@/queries/vynil/Dashboard.graphql'
import pieChart from '@/components/charts/pieChart.vue';
const { onResult, onError } = useQuery(vynilDashboardQuery)
const ready = ref(false);
const InstallByTs = ref([]);
const ErrorsByTs = ref([]);
onError(({ graphQLErrors, networkError }) => {
  if (networkError) console.log('[Network error]:', networkError);
  if (graphQLErrors)console.log('[graphQL error]:', graphQLErrors);
});
onResult((res) => {
  if ( !res.loading ) {
    ready.value = false;
    InstallByTs.value.length = 0;
    InstallByTs.value.push(...res.data.namespaces.map(n => {return {name: n.metadata.name, value: n.vynilInstalls.length}}).filter(n => n.value>0))
    ErrorsByTs.value.length = 0;
    ErrorsByTs.value.push(...res.data.namespaces.map(n => {return {name: n.metadata.name, value: n.vynilInstalls.filter(i => i.status.errors.length>0).length}}).filter(n => n.value>0))
    ready.value = true;
  }
})
</script>
<template>
  <pieChart v-model:datum="InstallByTs" v-if="ready && InstallByTs.length>0"></pieChart>
  <pieChart v-model:datum="ErrorsByTs" v-if="ready && ErrorsByTs.length>0"></pieChart>
</template>
