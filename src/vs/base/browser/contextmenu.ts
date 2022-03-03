/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { IActionViewItem } from "vs/base/browser/ui/actionbar/actionbar";
import type {
  AnchorAlignment,
  AnchorAxisAlignment,
} from "vs/base/browser/ui/contextview/contextview";
import type { IAction, IActionRunner } from "vs/base/common/actions";
import type { ResolvedKeybinding } from "vs/base/common/keyCodes";

export interface IContextMenuEvent {
  readonly shiftKey?: boolean;
  readonly ctrlKey?: boolean;
  readonly altKey?: boolean;
  readonly metaKey?: boolean;
}

export interface IContextMenuDelegate {
  getAnchor():
    | HTMLElement
    | { x: number; y: number; width?: number; height?: number };
  getActions(): readonly IAction[];
  getCheckedActionsRepresentation?(action: IAction): "radio" | "checkbox";
  getActionViewItem?(action: IAction): IActionViewItem | undefined;
  getActionsContext?(event?: IContextMenuEvent): unknown;
  getKeyBinding?(action: IAction): ResolvedKeybinding | undefined;
  getMenuClassName?(): string;
  onHide?(didCancel: boolean): void;
  actionRunner?: IActionRunner;
  autoSelectFirstItem?: boolean;
  anchorAlignment?: AnchorAlignment;
  anchorAxisAlignment?: AnchorAxisAlignment;
  domForShadowRoot?: HTMLElement;
}

export interface IContextMenuProvider {
  showContextMenu(delegate: IContextMenuDelegate): void;
}
