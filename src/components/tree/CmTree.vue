<template>
  <div class="cm-tree-container" @keydown="controlAction" tabindex="1">
    <template v-for="(node, index) of tree?.nodes" :key="index">
      <div
        class="cm-tree-leaf"
        :style="{ 'padding-left': depth * depthPadding + 'px' }"
        :class="store.selected?.id === node.id ? 'cm-tree-selected' : ''"
        v-if="node.isLeaf"
        @click="select(node)"
      >
        <slot name="leaf" :node="node" />
      </div>
      <div class="cm-tree-group-container" v-else>
        <div
          class="cm-tree-group"
          :style="{ 'padding-left': depth * depthPadding + 'px' }"
          :class="store.selected?.id === node.id ? 'cm-tree-selected' : ''"
          @click="select(node)"
        >
          <slot name="group" :node="node" />
        </div>
        <cm-tree
          :tree="node"
          :depth="depth + 1"
          @update:nodes="(newValue) => emits('update:nodes', newValue)"
          @update:selected="(newValue) => emits('update:selected', newValue)"
        >
          <template #group="{ node }">
            <slot name="group" :node="node" />
          </template>
          <template #leaf="{ node }">
            <slot name="leaf" :node="node" />
          </template>
        </cm-tree>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { TreeNode } from "@/model/types";
import { ref } from "vue";
import { ApiTreeStore } from "./store";

const depthPadding = 10;
const store = ApiTreeStore();

const { tree, depth } = withDefaults(
  defineProps<{
    tree?: TreeNode;
    depth?: number;
  }>(),
  { depth: 0 }
);

const emits = defineEmits(["update:nodes", "update:selected"]);

function select(node: TreeNode) {
  store.selected = node;
}

function controlAction(event: KeyboardEvent) {
  console.log(event.key);
  switch(event.key)  {
    case "ArrowLeft":
      break;
    case "ArrowRight":
      break;
    case "ArrowDown":
      break;
    case "ArrowUp":
      break;
    default:
      break;
  }
  event.preventDefault();
}
</script>

<style lang="scss" scoped>
.cm-tree-container {
  cursor: default;
  width: 100%;
  user-select: none;
  outline: none;
  box-shadow: none;
}

.cm-tree-leaf .cm-tree-group .cm-tree-group-container {
  width: 100%;
}

.cm-tree-selected {
  background-color: gray;
}
</style>
