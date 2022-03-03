import { TreeNode } from "@/model/types";
import { defineStore } from "pinia";
import type { TransformResultWithSource } from "vitest";

export const ApiTreeStore = defineStore({
  id: "api-tree",
  state: () => ({
    tree: new TreeNode(),
    selected: null as TreeNode | null,
    focused: false,
  }),
  actions: {},
});
