<script setup>
import MainMenuLinks from './MainMenuLinks.vue';
import { ref } from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '#'
  },
  icon: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: true
  },
  children: []
})
</script>
<template>
    <div v-if="children.length > 0">
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
            :key="child"
            v-bind="child">
        </MainMenuLinks>
      </q-expansion-item>
    </div>
    <div v-else>
      <q-item clickable v-ripple :inset-level="level" :active="active">
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
