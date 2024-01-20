<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { ref, onMounted } from "vue";

withDefaults(defineProps<{
  text: string
  lang?: string
}>(),{
  lang: "application/x-yaml"
});
const code=ref(null);
onMounted(() => {
    monaco.editor.colorizeElement(code.value as unknown as HTMLElement, {
        theme: "vs-dark"
    })
})

</script>
<template>
  <pre ref="code" :data-lang="lang" style="background-color: black">{{ text }}</pre>
</template>
