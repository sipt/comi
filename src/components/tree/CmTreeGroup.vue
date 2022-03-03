<template>
  <div class="cm-tree-container">
    <template v-for="(node, index) of modelValue.nodes" :key="index">
      {{ node.id }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { Tree } from "@/model/types";
import { ApiTreeStore } from "./store";

const store = ApiTreeStore();

const { modelValue, depth } = withDefaults(
  defineProps<{
    modelValue?: Tree;
    depth?: number;
  }>(),
  { depth: 0 }
);
</script>

<style lang="scss" scoped>
.cm-tree-container {
  cursor: default;
  width: 100%;
  user-select: none;
}

.cm-tree-leaf .cm-tree-group .cm-tree-group-container {
  width: 100%;
}

.cm-tree-selected {
  background-color: gray;
}
</style>
