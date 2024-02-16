<script setup lang="ts">
import MainMenuLinks from './MainMenuLinks.vue';
import { menuLinksProps } from '../../routes/interfaces.js';
import { elude, useCore } from '../../libs/core';
import { useRouter } from 'vue-router'
import { watch,onMounted, ref } from 'vue'
import {installColor,automationColor,workloadColor,databaseColor,storageColor,configColor,networkColor,securityColor,systemColor} from '../../routes/custom'
const { isNamespaced } = useCore();
const expansionItem = ref(null);
const router = useRouter();
const maxCaptionLength= 25;
const props = withDefaults(defineProps<menuLinksProps>(), {
  caption: '',
  icon: '',
  level: 0,
});
const shouldOpen = (route) =>route.matched.map(f=>f.name).includes(props.name) || (Array.isArray(props.children) && props.children.map(f=>f.name||f.title).reduce((ret,name) => ret || (route.matched.map(c=> c.name).includes(name as string)), false))
function getLevel0Color(name){
  switch (name) {
    case 'install':     return installColor;
    case 'automation':  return automationColor;
    case 'workload':    return workloadColor;
    case 'database':    return databaseColor;
    case 'storage':     return storageColor;
    case 'config':      return configColor;
    case 'network':     return networkColor;
    case 'security':    return securityColor;
    case 'system':      return systemColor;
  }
  return ''
}
if (props.children != undefined && props.children.length > 0) onMounted(() => {
  watch(router.currentRoute,(route) => {
    if (expansionItem.value==null) return;
    if (shouldOpen(route)) expansionItem.value.show();
    else expansionItem.value.hide();
  })
});
const toNoNS = props.target!=undefined?{ name: props.target }:props.name!=undefined?{ name: props.name }:null
const toNS = props.targetNS!=undefined?{ name: props.targetNS }:props.target!=undefined?{ name: props.target }:props.name!=undefined?{ name: props.name }:null
</script>
<template>
    <div v-if="children != undefined && children.length > 0"  :class="`${getLevel0Color(props.name)==''?'':'bg-'+getLevel0Color(props.name)+'-1'}`">
      <q-expansion-item ref="expansionItem"
          expand-separator
          :header-inset-level="level"
          :key="`${isNamespaced()}-first`"
          :to="isNamespaced()?toNS:toNoNS"
          :active="router.currentRoute.value.matched.map(f=>f.name).includes(props.name)"
          :default-opened="shouldOpen(router.currentRoute.value)">
        <template v-slot:header>
          <q-item-section v-if="icon != ''" avatar>
            <q-avatar :icon="icon"  :class="`${getLevel0Color(props.name)==''?'':' text-white bg-'+getLevel0Color(props.name)}`" />
          </q-item-section>
          <q-item-section>
            <q-item-section>{{title}}</q-item-section>
            <q-item-label v-if="caption != ''" caption>{{elude(caption, maxCaptionLength)}}</q-item-label>
          </q-item-section>
        </template>
          <MainMenuLinks v-for="child in children" :key="`${child.title}`" v-bind="child" />
      </q-expansion-item>
    </div>
    <div v-else>
      <q-item clickable v-ripple :inset-level="level" :to="isNamespaced()?toNS:toNoNS"
          :key="`${isNamespaced()}-second`"
          :active="router.currentRoute.value.matched.map(f=>f.name).includes(props.name)">
        <q-item-section v-if="icon != ''" avatar>
          <q-avatar :icon="icon" />
        </q-item-section>
        <q-item-section>
          <q-item-section>{{title}}</q-item-section>
          <q-item-label v-if="caption != ''" caption>{{elude(caption, maxCaptionLength)}}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
</template>
