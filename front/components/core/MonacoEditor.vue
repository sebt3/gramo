<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { ref, onMounted, nextTick } from "vue";
const emit = defineEmits(['update:text'])
const props = withDefaults(defineProps<{
  text: string
  lang?: string
  theme?: string
  wordWrap?: "wordWrapColumn" | "off" | "on" | "bounded"
  wrappingIndent?: "indent" | "none" | "same" | "deepIndent"
  lineNumber?: boolean
  automaticLayout?: boolean,
}>(),{
  lang: "yaml",
  theme: "vs-dark",
  lineNumber: true,
  wrappingIndent: "indent",
  wordWrap: "wordWrapColumn",
  automaticLayout: true,
});
const height = window.innerHeight - 300;
const code=ref(null);
onMounted(() => {
  const editor = monaco.editor.create(code.value as unknown as HTMLElement, {
    value: props.text,
    theme: props.theme,
    language: props.lang,
    lineNumbers: props.lineNumber?"on":"off",
    wordWrap: props.wordWrap,
    wrappingIndent: props.wrappingIndent,
  });
  editor.focus();
  editor.onDidBlurEditorText(() => {console.log('blur');emit('update:text', editor.getValue())})
});
</script>
<template>
  <div ref="code" :style="`min-height: 400px;height:${height}px;width:100%;`"></div>
</template>
