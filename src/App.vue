<script setup lang="ts">
// import CmTree from "@/components/tree/CmTree.vue";
// import { ApiTreeStore } from "@/components/tree/store";
import { onMounted, ref } from "vue";
import { DataTree } from "./vs/base/browser/ui/tree/dataTree";
import type { IDataSource } from "./vs/base/browser/ui/tree/tree";
import type { IListVirtualDelegate } from "./vs/base/browser/ui/list/list";

class ApiTreeViewController implements IListVirtualDelegate<TreeNode>, IDataSource<TreeNode, TreeNode> {
  constructor() {}

  getHeight(element: TreeNode): number {
    return 20;
  }
  getTemplateId(element: TreeNode): string {
    return element.id;
  }
  hasDynamicHeight?(element: TreeNode): boolean {
    return false;
  }
  getDynamicHeight?(element: TreeNode): number | null {
    return null;
  }
  setDynamicHeight?(element: TreeNode, height: number): void {}

  hasChildren?(element: TreeNode | TreeNode): boolean {
    return !element.isLeaf;
  }
  getChildren(element: TreeNode | TreeNode): Iterable<TreeNode> {
    return element.children;
  }
}

// const store = ApiTreeStore();
// const data =
//   '{"id":"0", "nodes":[{"id":"1","isLeaf":false,"title":"account","nodes":[{"id":"11","isLeaf":true,"title":"GetUser"},{"id":"12","isLeaf":false,"title":"Auth","nodes":[{"id":"121","isLeaf":true,"title":"Login"},{"id":"122","isLeaf":true,"title":"Logout"}]}]}]}';
// store.tree = Object.assign(new TreeNode(), JSON.parse(data));
// store.tree.Prepare();
const vsbutton = ref<HTMLElement | null>(null);
const api = new ApiTreeViewController();

onMounted(() => {
  if (vsbutton.value) {
    let tree = new DataTree("", vsbutton.value, api, [], api);
    tree.setInput(new TreeNode("1", "account", false, [new TreeNode("1-1", "Sign Up", true), new TreeNode("1-2", "Sign In", true), new TreeNode("1-3", "Sign Out", true)]));
  }
});

class TreeNode {
  constructor(public id: string, public title: string, public isLeaf: boolean, public children: TreeNode[] = []) {}
}
</script>

<template>
  <div class="monaco-split-view2" ref="vsbutton"></div>
  <!-- <CmTree :tree="store.tree">
    <template #group="{ node }">{{ node.title }}</template>
    <template #leaf="{ node }">{{ node.title }}</template>
  </CmTree> -->
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
