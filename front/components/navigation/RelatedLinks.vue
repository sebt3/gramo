<script setup lang="ts">
const {useNavigationStore} = await import('../../stores/navigation.js')
const { useRoute } = await import('vue-router')
const { ref } = await import('vue')
const route = useRoute();
const namespace = ref(useNavigationStore().namespace)
</script>
<template>
  <q-btn-dropdown padding="none" dense flat no-caps :label="$t('core.related')" class="text-grey">
    <q-list>
      <q-item clickable v-close-popup v-for="item in route.meta.related" v-bind:key="item.target" :to="{ name: item.target, params: item.ns||false?{ namespace }:{} }">
        <q-item-section>
          <q-item-label>{{item.ns||false?item.display(namespace):item.display()}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
