import { EditorConfig, LexicalNode, TextNode } from 'lexical';
import { TokenNode } from './TokenNode';
import { decorateTextValidation } from './node-utils';

export class UnrecognizedNode extends TextNode {
  private __valid: boolean = true;
  private __invalidReason: string | null = null;

  static override getType(): string {
    return 'unrecognized';
  }

  override mergeWithSibling(node: LexicalNode): TextNode {
    return this;
  }

  static override clone(node: TokenNode): UnrecognizedNode {
    return new UnrecognizedNode(node.__text, node.__key);
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    decorateTextValidation(element, this.__valid);
    if (!this.__valid && this.__invalidReason) {
      element.title = this.__invalidReason;
    }
    return element;
  }

  override updateDOM(
    prevNode: UnrecognizedNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    let isUpdated = super.updateDOM(prevNode, dom, config);

    if (prevNode.__valid !== this.__valid) {
      decorateTextValidation(dom, this.__valid);
      isUpdated = true;
    }

    return isUpdated;
  }

  getValid(): boolean {
    return !this.__valid;
  }

  setValid(): void {
    const writable = this.getWritable() as UnrecognizedNode;
    writable.__valid = true;
    writable.__invalidReason = null;
  }

  setInvalid(reason: string): void {
    const writable = this.getWritable() as UnrecognizedNode;
    writable.__valid = false;
    writable.__invalidReason = reason;
  }
}

export function $createUnrecognizedNode(text: string): UnrecognizedNode {
  return new UnrecognizedNode(text);
}

export function $isUnrecognizedNode(
  node: LexicalNode | null | undefined
): node is UnrecognizedNode {
  return node instanceof UnrecognizedNode;
}
