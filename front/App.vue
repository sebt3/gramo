<script setup>
import { defineAsyncComponent } from 'vue'
const MainMenu = defineAsyncComponent(() => import('./components/navigation/MainMenu.vue'));
const BreadCrumbs = defineAsyncComponent(() => import('./components/navigation/BreadCrumbs.vue'));
import { useNavigationStore } from './stores/navigation';
const { getTransition } = useNavigationStore();
</script>
<template>
 <Suspense>
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
 </Suspense>
</template>
