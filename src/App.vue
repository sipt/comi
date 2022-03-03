<script setup lang="ts">
import CmTree from "@/components/tree/CmTree.vue";
import { ApiTreeStore } from "@/components/tree/store";
import { onMounted, ref } from "vue";
import { TreeNode } from "./model/types";
import { Button } from "./vs/base/browser/ui/button/button";

const store = ApiTreeStore();
const data =
  '{"id":0, "nodes":[{"id":"1","isLeaf":false,"title":"account","nodes":[{"id":"11","isLeaf":true,"title":"GetUser"},{"id":"12","isLeaf":false,"title":"Auth","nodes":[{"id":"121","isLeaf":true,"title":"Login"},{"id":"122","isLeaf":true,"title":"Logout"}]}]}]}';
store.tree = Object.assign(new TreeNode(), JSON.parse(data));
store.tree.Prepare();
const vsbutton = ref<HTMLElement | null>(null);

onMounted(() => {
  if (vsbutton.value) {
    const btn = new Button(vsbutton.value);
    btn.label = "Run Test";
    btn.onDidClick((e: Event) => {
      console.log(e);
    });
  }
});

function runCode() {
  store.tree.nodes.push({
    id: "2",
    isLeaf: true,
    title: "Send SMS",
  } as TreeNode);
}
</script>

<template>
  <div class="monaco-split-view2" ref="vsbutton"></div>
  <button @click="runCode">Run</button>
  <CmTree :tree="store.tree">
    <template #group="{ node }">{{ node.title }}</template>
    <template #leaf="{ node }">{{ node.title }}</template>
  </CmTree>
</template>

<style lang="scss">
@import "vs/base/browser/ui/splitview/splitview.css";

#app {
  width: 100%;
  height: 100vh;
}
body {
  margin: 0px;
}
</style>
