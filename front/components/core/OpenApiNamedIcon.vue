<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  isDefault?: boolean
}>(),{
  isDefault: true
});
</script>
<template>
  <q-icon :color="isDefault?'':'secondary'" v-if="['name'].includes(name)" name="smart_button" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['namespace'].includes(name)" name="dashboard" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['enable'].includes(name)" name="done" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['app-group'].includes(name)" name="workspaces" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['domain-name'].includes(name)" name="link" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['issuer'].includes(name)" name="local_police" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['ingress-class'].includes(name)" name="alt_route" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['pullPolicy'].includes(name)" name="downloading" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['registry'].includes(name)" name="store" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['repository'].includes(name)" name="image" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['tag'].includes(name)" name="sell" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['dbname'].includes(name)" name="storage" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['engine'].includes(name)" name="settings" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['username'].includes(name)" name="person" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['type'].includes(name)" name="style" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['Age','last_updated'].includes(name)" name="access_time" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['Ready'].includes(name)" name="check_circle" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['Status'].includes(name)" name="report" />
  <q-icon :color="isDefault?'':'secondary'" v-else-if="['domain', 'key'].includes(name)" :name="name" />
  <q-icon :color="isDefault?'':'secondary'" v-else name="question_mark" />
</template>
