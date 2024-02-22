<script setup>
import MainMenu from './components/navigation/MainMenu.vue';
import BreadCrumbs from './components/navigation/BreadCrumbs.vue';
import { useNavigationStore } from './stores';
const { getTransition } = useNavigationStore();
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <MainMenu />
    <q-page-container>
      <BreadCrumbs />
      <router-view v-slot="{ Component, route }">
        <Transition     name="custom-classes"
            :enter-active-class="getTransition(route,'enter')"
            :leave-active-class="getTransition(route,'leave')"
        >
          <component :is="Component" :key="`${route.name}-${route.params.name}`" />
        </Transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
