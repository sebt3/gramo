<script setup lang="ts">
import MainMenuLinks from './MainMenuLinks.vue';
import RefreshRateSelector from './RefreshRateSelector.vue';
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavigationStoreRef } from '../../stores'
import { links } from '../../routes'

const route = useRoute();
const router = useRouter();
const navigation = useNavigationStoreRef()
const model = navigation.currentNamespace
const leftDrawerOpen = ref(true)
const miniState = ref(true)
const isNamespaced = computed(() => {
  if (route.meta != undefined) {
    return route.meta.ns
  }
  return false
})
function onChangeNamespace() {
  if (router.currentRoute.value.name != undefined ) {
    router.push({
      name: router.currentRoute.value.name,
      params: {
        ...route.params,
        namespace: model.value
      },
      replace: true
    })
  }
}
function handleMini(evt) {
  if (miniState.value) {
    miniState.value = false
    evt.preventDefault();
    evt.stopPropagation();
    return true
  }
}
function toggleLeftDrawer() {
  miniState.value = !miniState.value
}
</script>
<template>
  <q-header reveal bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title>
        <img src="/icon.svg" loading="lazy" class="q-mt-sm" />
        Gramo
      </q-toolbar-title>
      <q-select v-if="isNamespaced" v-model="model" @update:model-value="onChangeNamespace()" :options="navigation.namespaces.value" label="Namespace" standout style="width: 250px" options-dense>
        <template v-slot:prepend>
          <q-icon name="dashboard" />
        </template>
      </q-select>
      <RefreshRateSelector />
    </q-toolbar>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :mini="miniState" :width="400" :breakpoint="300" :mini-to-overlay="false" @click.capture="handleMini">
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list padding v-if="router.currentRoute.value.matched.length>1">
        <MainMenuLinks class="q-mr-sm"
          v-for="link in links"
          :key="`${link.title}`"
          v-bind="link">
        </MainMenuLinks>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
