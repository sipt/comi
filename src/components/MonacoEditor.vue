<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as monaco from "monaco-editor";

let props = defineProps<{ modelValue: string }>();
let emit = defineEmits(["update:modelValue"]);

const container = ref<HTMLElement | null>(null);
let editor: monaco.editor.IStandaloneCodeEditor;

onMounted(() => {
  editor = monaco.editor.create(container.value!, {
    value: props.modelValue,
    language: "javascript",
    theme: "vs-dark",
  });

  editor.onDidChangeModelContent(() => {
    emit("update:modelValue", editor.getValue());
  });
});
</script>

<template>
  <div class="editor" ref="container"></div>
</template>

<style scoped>
.editor {
  height: 100%;
  width: 100%;
}
</style>
