<script setup lang="ts">
import { useRouter } from 'vue-router'
import { descriptions } from '../../routes'
const router = useRouter();
</script>
<template>
  <q-breadcrumbs class="q-pl-md q-pt-md q-pb-md">
    <q-breadcrumbs-el v-for="item in router.currentRoute.value.matched" v-bind:key="item.name"
     :label="item.name!=undefined && descriptions[item.name]!=undefined?descriptions[item.name].breadcrumb:item.name"
     :icon="item.name!=undefined && descriptions[item.name]!=undefined?descriptions[item.name].icon:''"
     :to="item.path" />
  </q-breadcrumbs>
</template>
