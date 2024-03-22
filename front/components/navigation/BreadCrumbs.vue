<script setup lang="ts">
const { defineAsyncComponent } = await import('vue')
const { useRouter } = await import('vue-router')
const router = useRouter();
const RelatedLinks = defineAsyncComponent(() => import( './RelatedLinks.vue'));
</script>
<template>
  <div class="q-pl-md q-pt-sm row q-pb-none q-mb-none">
    <div  class="col-8">
      <q-breadcrumbs>
        <q-breadcrumbs-el v-for="item in router.currentRoute.value.matched" v-bind:key="item.name"
          :label="item.meta!=undefined && item.meta.breadcrumb!=undefined?((typeof item.meta.breadcrumb==='string')?item.meta.breadcrumb:item.meta.breadcrumb(router.currentRoute.value.params)):item.name"
          :icon="item.meta!=undefined && item.meta.icon!=undefined?item.meta.icon:''"
          :to="item.path.includes(':')?{ name: item.name, params:router.currentRoute.value.params}:item.path" />
      </q-breadcrumbs>
    </div>
    <div  class="col-4">
      <RelatedLinks class="float-right text-black" :key="router.currentRoute.value.href" v-if="router.currentRoute.value.meta != undefined && Array.isArray(router.currentRoute.value.meta['related'])" />
    </div>
</div>
</template>
