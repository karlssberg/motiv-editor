import { EditorConfig, LexicalNode, TextNode } from 'lexical';
import { TokenNode } from './TokenNode';
import { decorateTextValidation } from './node-utils';

export class WhitespaceNode extends TextNode {
  private __valid: boolean = true;
  private __invalidReason: string | null = null;

  static override getType(): string {
    return 'whitespace';
  }

  static override clone(node: TokenNode): WhitespaceNode {
    return new WhitespaceNode(node.__text, node.__key);
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
    prevNode: WhitespaceNode,
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

  setValid(): void {
    const writable = this.getWritable() as WhitespaceNode;
    writable.__valid = true;
    writable.__invalidReason = null;
  }

  setInvalid(reason: string): void {
    const writable = this.getWritable() as WhitespaceNode;
    writable.__valid = false;
    writable.__invalidReason = reason;
  }
}

export function $createWhitespaceNode(text: string): WhitespaceNode {
  return new WhitespaceNode(text);
}

export function $isWhitespaceNode(
  node: LexicalNode | null | undefined
): node is WhitespaceNode {
  return node instanceof WhitespaceNode;
}
