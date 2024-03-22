<script setup lang="ts">
const { defineAsyncComponent } = await import('vue')
const MainMenuLinks = defineAsyncComponent(() => import( './MainMenuLinks.vue'));
const RefreshRateSelector = defineAsyncComponent(() => import( './RefreshRateSelector.vue'));
const { ref, computed } = await import('vue')
const { useRouter, useRoute } = await import('vue-router')
const { useNavigationStoreRef } = await import('../../stores/navigation.js')
const { useConfigStore } = await import('../../stores/config.js')
const { links } = await import('../../routes')
const { useQuasar } = await import("quasar")
const config = useConfigStore()
const $q = useQuasar()
const route = useRoute();
const router = useRouter();
const navigation = useNavigationStoreRef()
const model = navigation.currentNamespace
const leftDrawerOpen = ref(true)
const miniState = ref(true)
const isNamespaced = computed(() => {
  if (route.meta != undefined) {
    return route.meta.ns||false
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
        <router-link :to="{ name: 'root'}" style="text-decoration: none; color: inherit;">
          <q-circular-progress
            show-value
            :indeterminate="navigation.isLoading.value"
            rounded
            size="30px"
            class=""
            :thickness="0.5"
            color="orange"
            track-color="primary"
          >
            <img src="/icon.svg" loading="lazy" />
          </q-circular-progress>
          {{ config.gramoAppName }}
          <q-tooltip>version: {{ config.gramoVersion }}</q-tooltip>
        </router-link>
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
    <q-scroll-area :class="`fit ${$q.dark.isActive?'bg-grey-9':'bg-grey-1'}`" :horizontal-thumb-style="{ opacity: '0' }">
      <q-list v-if="router.currentRoute.value.matched.length>1">
        <MainMenuLinks class="q-pr-sm"
          v-for="link in links"
          :key="`${link.title}`"
          v-bind="link">
        </MainMenuLinks>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
