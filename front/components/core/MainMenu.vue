<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { useNavigationStore } from '../../stores/navigation'
import { links } from '../../routes/index'

import namespacesQuery from '../../queries/core/namespaceNames.graphql'
import MainMenuLinks from './MainMenuLinks.vue';
const navigation = storeToRefs(useNavigationStore())
const model = navigation.currentNamespace
const { onResult } = useQuery(namespacesQuery);
const leftDrawerOpen = ref(false)
const miniState = ref(true)
const options = ref([])
onResult(res => {
  if (res.loading) return;
  options.value = res.data.namespaces.map(ns => ns.metadata.name)
})
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<template>
  <q-header reveal bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title>
        <q-avatar>
          <q-icon name="album" />
        </q-avatar>
        Gramo
      </q-toolbar-title>
      <q-select v-model="model" :options="options" label="Namespace" standout style="width: 250px" options-dense>
        <template v-slot:prepend>
          <q-icon name="dashboard" />
        </template>
      </q-select>
    </q-toolbar>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :mini="miniState" :width="400" :breakpoint="500" @mouseover="miniState = false" @mouseout="miniState = true" mini-to-overlay>
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
      <q-list padding>
        <MainMenuLinks
          v-for="link in links"
          :key="link.title"
          v-bind="link">
        </MainMenuLinks>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
