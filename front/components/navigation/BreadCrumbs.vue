<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter();
</script>
<template>
  <q-breadcrumbs class="q-pl-md q-pt-md q-pb-md">
    <q-breadcrumbs-el v-for="item in router.currentRoute.value.matched" v-bind:key="item.name"
     :label="item.meta!=undefined && item.meta.breadcrumb!=undefined?item.meta.breadcrumb:item.name"
     :icon="item.meta!=undefined && item.meta.icon!=undefined?item.meta.icon:''"
     :to="item.path" />
  </q-breadcrumbs>
</template>
