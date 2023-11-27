<script setup lang="ts">
defineProps<{
  name: string
  isDefault: boolean
}>();
</script>
<template>
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'name'" name="smart_button" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'namespace'" name="dashboard" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'enable'" name="done" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'app-group'" name="workspaces" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'domain-name'" name="link" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'issuer'" name="local_police" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'ingress-class'" name="alt_route" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'pullPolicy'" name="downloading" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'registry'" name="store" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'repository'" name="image" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'tag'" name="sell" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'dbname'" name="storage" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'engine'" name="settings" />
  <q-icon :color="isDefault?'':'secondary'" v-if="name == 'username'" name="person" />
  <q-icon :color="isDefault?'':'secondary'" v-if="['domain', 'key'].includes(name)" :name="name" />
</template>
