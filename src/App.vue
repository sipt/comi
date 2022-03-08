<script setup lang="ts">
// import CmTree from "@/components/tree/CmTree.vue";
// import { ApiTreeStore } from "@/components/tree/store";
import { onMounted, ref } from "vue";
import { DataTree } from "./vs/base/browser/ui/tree/dataTree";
import { IDataTreeOptions } from "./vs/base/browser/ui/tree/dataTree";
import { IDataSource, ITreeNode, ITreeRenderer } from "./vs/base/browser/ui/tree/tree";
import { IListVirtualDelegate } from "./vs/base/browser/ui/list/list";
import { Event } from "./vs/base/common/event";
import { DefaultStyleController } from "./vs/base/browser/ui/list/listWidget";
import type { IStyleController } from "./vs/base/browser/ui/list/listWidget";
import { createStyleSheet } from "./vs/base/browser/dom";
import { getIconsStyleSheet } from "./vs/platform/theme/browser/iconsStyleSheet";
import { RunOnceScheduler } from "./vs/base/common/async";

class ApiTreeViewController implements IListVirtualDelegate<TreeNode>, IDataSource<TreeNode, TreeNode>, IDataTreeOptions<TreeNode, void> {
  constructor() {}

  getHeight(element: TreeNode): number {
    return 20;
  }
  getTemplateId(element: TreeNode): string {
    console.log(element);

    return element.isLeaf ? "leaf" : "group";
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

  styleController = (suffix: string) => {
    const styleSheet = createStyleSheet();
    return new DefaultStyleController(styleSheet, suffix);
  };
}

class GroupRenderer implements ITreeRenderer<TreeNode, void, HTMLElement> {
  onDidChangeTwistieState?: Event<TreeNode> | undefined;
  templateId: string = "group";
  renderTemplate(container: HTMLElement): HTMLElement {
    return container;
  }
  renderElement(element: ITreeNode<TreeNode, void>, index: number, templateData: HTMLElement, height: number | undefined): void {
    templateData.textContent = element.element.title;
  }
  disposeTemplate(templateData: HTMLElement): void {}
}

class LeafRenderer implements ITreeRenderer<TreeNode, void, HTMLElement> {
  onDidChangeTwistieState?: Event<TreeNode> | undefined;
  templateId: string = "leaf";
  renderTemplate(container: HTMLElement): HTMLElement {
    return container;
  }
  renderElement(element: ITreeNode<TreeNode, void>, index: number, templateData: HTMLElement, height: number | undefined): void {
    templateData.textContent = element.element.title;
  }
  disposeTemplate(templateData: HTMLElement): void {}
}
// const store = ApiTreeStore();
// const data =
//   '{"id":"0", "nodes":[{"id":"1","isLeaf":false,"title":"account","nodes":[{"id":"11","isLeaf":true,"title":"GetUser"},{"id":"12","isLeaf":false,"title":"Auth","nodes":[{"id":"121","isLeaf":true,"title":"Login"},{"id":"122","isLeaf":true,"title":"Logout"}]}]}]}';
// store.tree = Object.assign(new TreeNode(), JSON.parse(data));
// store.tree.Prepare();
const vsbutton = ref<HTMLElement | null>(null);
const api = new ApiTreeViewController();

function createCodiconStyleSheet() {
  const codiconStyleSheet = createStyleSheet();
  codiconStyleSheet.id = "codiconStyles";

  const iconsStyleSheet = getIconsStyleSheet(undefined);
  function updateAll() {
    codiconStyleSheet.textContent = iconsStyleSheet.getCSS();
  }

  const delayer = new RunOnceScheduler(updateAll, 0);
  iconsStyleSheet.onDidChange(() => delayer.schedule());
  delayer.schedule();
}

onMounted(() => {
  createCodiconStyleSheet();
  if (vsbutton.value) {
    let tree = new DataTree("", vsbutton.value, api, [new GroupRenderer(), new LeafRenderer()], api, api);
    tree.setInput(
      new TreeNode("0", "root", false, [new TreeNode("1", "account", false, [new TreeNode("1-1", "Sign Up", true), new TreeNode("1-2", "Sign In", true), new TreeNode("1-3", "Sign Out", true)])])
    );
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
@import "vs/base/browser/ui/codicons/codicon/codicon.css";
@import "vs/base/browser/ui/codicons/codicon/codicon-modifiers.css";

// @font-face {
//   font-family: "codicon";
//   src: local("codicon"), url(@/assets/codicon.ttf) format("truetype");
// }

// .codicon[class*="codicon-"] {
//   font: normal normal normal 16px/1 codicon;
//   font-style: normal;
//   font-variant-ligatures: normal;
//   font-variant-caps: normal;
//   font-variant-numeric: normal;
//   font-variant-east-asian: normal;
//   font-weight: normal;
//   font-stretch: normal;
//   font-size: 16px;
//   line-height: 1;
//   font-family: codicon;
//   display: inline-block;
//   text-decoration: none;
//   text-rendering: auto;
//   text-align: center;
//   text-transform: none;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   user-select: none;
//   -webkit-user-select: none;
//   -ms-user-select: none;
// }
#app {
  width: 100%;
  height: 100vh;
}
body {
  margin: 0px;
}
// .monaco-tl-twistie.collapsed:before {
//   transform: rotate(-90deg);
// }
// .codicon-tree-item-expanded:before {
//   content: "\eab4";
// }
// .monaco-tl-twistie:before {
//   border-radius: 20px;
// }
</style>
