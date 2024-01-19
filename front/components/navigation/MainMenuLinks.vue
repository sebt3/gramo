<script setup lang="ts">
import MainMenuLinks from './MainMenuLinks.vue';
import { menuLinksProps } from '../../routes';
import { useRouter } from 'vue-router'
const router = useRouter();

const props = withDefaults(defineProps<menuLinksProps>(), {
  caption: '',
  link: '#',
  icon: '',
  level: 0,
});
</script>
<template>
    <div v-if="children != undefined && children.length > 0">
      <q-expansion-item
          expand-separator
          :header-inset-level="level"
          :href="link"
          :active="router.currentRoute.value.matched.map(f=>f.name).includes(props.name)"
          :default-opened="router.currentRoute.value.matched.map(f=>f.name).includes(props.name) || children.map(f=>f.name||f.title).reduce((ret,name) => ret || (router.currentRoute.value.matched.map(c=> c.name).includes(name as string)), false)">
        <template v-slot:header>
          <q-item-section v-if="icon != ''" avatar>
            <q-avatar :icon="icon" />
          </q-item-section>
          <q-item-section>
            <q-item-section>{{title}}</q-item-section>
            <q-item-label v-if="caption != ''" caption>{{caption}}</q-item-label>
          </q-item-section>
        </template>
        <div v-if="router.currentRoute.value.matched.length>1">
          <MainMenuLinks
            v-for="child in children"
            :key="`${child.title}-${router.currentRoute.value.matched[router.currentRoute.value.matched.length-1].path}`"
            v-bind="child" />
        </div>
      </q-expansion-item>
    </div>
    <div v-else>
      <q-item clickable v-ripple :inset-level="level" :active="router.currentRoute.value.matched.map(f=>f.name).includes(props.name)" :href="link">
        <q-item-section v-if="icon != ''" avatar>
            <q-avatar :icon="icon" />
          </q-item-section>
          <q-item-section>
            <q-item-section>{{title}}</q-item-section>
            <q-item-label v-if="caption != ''" caption>{{caption}}</q-item-label>
          </q-item-section>
      </q-item>
    </div>
</template>
