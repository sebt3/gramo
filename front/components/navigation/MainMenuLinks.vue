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
  active: true
});
</script>
<template>
    <div v-if="children != undefined && children.length > 0">
      <q-expansion-item
          expand-separator
          :header-inset-level="level"
          :href="link"
          :default-opened="active || router.currentRoute.value.matched.map(f=>f.name).includes(props.name)">
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
            v-bind="child"
            :active="router.currentRoute.value.matched.map(f=>f.name).includes(child.name!=undefined?child.name:'----')" />
        </div>
      </q-expansion-item>
    </div>
    <div v-else>
      <q-item clickable v-ripple :inset-level="level" :active="active || router.currentRoute.value.matched.map(f=>f.name).includes(props.name)" :href="link">
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
