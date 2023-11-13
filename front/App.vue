<script setup>
import MainMenu from './components/core/MainMenu.vue';
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <MainMenu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
