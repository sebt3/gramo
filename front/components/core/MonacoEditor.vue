<script setup lang="ts">
const emit = defineEmits(['update:text'])
import { OpenAPIV3 } from "openapi-types";
const props = withDefaults(defineProps<{
  showDoc: boolean,
  properties: Map<string, OpenAPIV3.SchemaObject>
  text: string
  lang?: string
  theme?: string
  wordWrap?: "wordWrapColumn" | "off" | "on" | "bounded"
  wrappingIndent?: "indent" | "none" | "same" | "deepIndent"
  lineNumber?: boolean
  automaticLayout?: boolean,
  required?: string[]
}>(),{
  lang: "yaml",
  theme: "vs-dark",
  lineNumber: true,
  wrappingIndent: "indent",
  wordWrap: "wordWrapColumn",
  automaticLayout: true,
});
import * as monaco from 'monaco-editor'
import { ref, onMounted, defineAsyncComponent } from "vue";
const code=ref(null);
onMounted(() => {
  const editor = monaco.editor.create(code.value as unknown as HTMLElement, {
    value: props.text,
    theme: props.theme,
    language: props.lang,
    lineNumbers: props.lineNumber?"on":"off",
    scrollBeyondLastLine: false,
    wordWrap: props.wordWrap,
    wrappingIndent: props.wrappingIndent,
    automaticLayout: true
  });
  editor.focus();
  editor.onDidBlurEditorText(() => {emit('update:text', editor.getValue())})
});
const OpenAPIDocumentation = defineAsyncComponent(() => import( '@/components/core/OpenAPIDocumentation.vue'));
</script>
<template>
  <div class="row">
    <div :class="`col-${showDoc?8:12}`" ref="code" :style="`min-height: 400px;`"></div>
    <div class="col-4" v-if="showDoc"><OpenAPIDocumentation :required="required" :properties="properties" :type="'root'" /></div>
  </div>
</template>
