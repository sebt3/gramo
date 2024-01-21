<script setup lang="ts">
import MainMenuLinks from './MainMenuLinks.vue';
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavigationStoreRef } from '../../stores'
import { descriptions, links } from '../../routes'

const route = useRoute();
const router = useRouter();
const navigation = useNavigationStoreRef()
const model = navigation.currentNamespace
const leftDrawerOpen = ref(false)
const miniState = ref(true)
const isNamespaced = computed(() => {
  if (route.name != undefined && descriptions[route.name] != undefined) {
    return descriptions[route.name].ns
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
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
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
    </q-toolbar>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :mini="miniState" :width="400" :breakpoint="500" @mouseover="miniState = false" @mouseout="miniState = true" mini-to-overlay>
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list padding v-if="router.currentRoute.value.matched.length>1">
        <MainMenuLinks
          v-for="link in links"
          :key="`${link.title}-${router.currentRoute.value.matched[router.currentRoute.value.matched.length-1].path}`"
          v-bind="link">
        </MainMenuLinks>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
