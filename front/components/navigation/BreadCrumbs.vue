<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
const  RelatedLinks   = defineAsyncComponent(() => import( './RelatedLinks.vue'));
const router = useRouter();
</script>
<template>
  <div class="q-pl-md q-pt-sm row q-pb-none q-mb-none">
    <div  class="col">
      <q-breadcrumbs>
        <q-breadcrumbs-el v-for="item in router.currentRoute.value.matched" v-bind:key="item.name"
          :label="item.meta!=undefined && item.meta.breadcrumb!=undefined?item.meta.breadcrumb:item.name"
          :icon="item.meta!=undefined && item.meta.icon!=undefined?item.meta.icon:''"
          :to="item.path" />
      </q-breadcrumbs>
    </div>
    <div  class="col">
      <RelatedLinks class="float-right text-black" :key="router.currentRoute.value.href" v-if="router.currentRoute.value.meta != undefined && Array.isArray(router.currentRoute.value.meta['related'])" />
    </div>
</div>
</template>
