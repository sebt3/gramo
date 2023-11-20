<script setup lang="ts">
import MainMenuLinks from './MainMenuLinks.vue';
import {menuLinksProps} from '../../routes/interfaces';
withDefaults(defineProps<menuLinksProps>(), {
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
          :default-opened="active">
        <template v-slot:header>
          <q-item-section v-if="icon != ''" avatar>
            <q-avatar :icon="icon" />
          </q-item-section>
          <q-item-section>
            <q-item-section>{{title}}</q-item-section>
            <q-item-label v-if="caption != ''" caption>{{caption}}</q-item-label>
          </q-item-section>
        </template>
        <MainMenuLinks
            v-for="child in children"
            :key="child.title"
            v-bind="child">
        </MainMenuLinks>
      </q-expansion-item>
    </div>
    <div v-else>
      <q-item clickable v-ripple :inset-level="level" :active="active" :href="link">
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
