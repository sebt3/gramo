<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();
const matched = router.currentRoute.value.matched;
</script>
<template>
  <q-breadcrumbs class="q-pl-md q-pt-md">
    <q-breadcrumbs-el v-for="item in matched" v-bind:key="item.name" :label="item.name" :to="item.path" />
  </q-breadcrumbs>
</template>
