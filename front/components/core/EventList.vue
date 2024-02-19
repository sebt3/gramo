<script setup lang="ts">
defineEmits(['refresh','on-delete']);
const props=withDefaults(defineProps<{model: object[], useAction?:boolean, useRefresh?: boolean, showNamespace?:boolean}>(),{
  useAction: false,
  useRefresh: true,
  showNamespace: false,
});
console.log('EventList',props.model)
</script>
<template>
  <q-timeline dense>
    <q-timeline-entry  v-for="(item, key) in model" v-bind:key="key"
      :title="item['reason']"
      :subtitle="item['metadata']['creationTimestamp']"
      :color="item['type']=='Warning'?'warning':'secondary'"
      :icon="item['type']=='Warning'?'warning_amber':undefined"
      :body="item['message']"
    />

    <q-timeline-entry
      title="Event Title"
      subtitle="February 21, 1986"
      icon="delete"
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </q-timeline-entry>

    <q-timeline-entry
      title="Event Title"
      subtitle="February 22, 1986"
      color="orange"
      icon="done_all"
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>
