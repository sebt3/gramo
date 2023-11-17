<script setup>
import MainMenu from './components/navigation/MainMenu.vue';
import BreadCrumbs from './components/navigation/BreadCrumbs.vue';
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <MainMenu />
    <q-page-container>
      <BreadCrumbs />
      <router-view />
    </q-page-container>
  </q-layout>
</template>
