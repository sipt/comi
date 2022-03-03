import { v4 as uuidv4 } from "uuid";

export class TreeNode {
  id: string;
  title: string = "";
  isLeaf: boolean = false;
  nodes?: TreeNode[];

  constructor(isRoot: boolean = false) {
    this.id = uuidv4();
  }

  _preNode?: TreeNode;
  _nextNode?: TreeNode;
  _parentNode?: TreeNode;

  Prepare() {
    if (!this.nodes) {
      return;
    }
    for (let i in this.nodes) {
      let node = Object.assign(new TreeNode(), this.nodes[i]);
      node._parentNode = this;
      if (i > 0) {
        node._preNode = this.nodes[i - 1];
        this.nodes[i - 1]._nextNode = node;
      }
      node.Prepare();
      this.nodes[i] = node;
    }
  }

  Next(): TreeNode | undefined {
    if (this.isLeaf && this._nextNode) {
      return this._nextNode;
    } else if (!this.isLeaf && this.nodes && this.nodes.length > 0) {
      return this.nodes[0];
    } else if (this._parentNode) {
    }
    if (this._parentNode?._nextNode) {
      return this._preNode?._nextNode;
    }
    return undefined;
  }
}

export interface TreeGroup extends TreeNode {}

export interface TreeLeaf extends TreeNode {
  desc: string;
}
