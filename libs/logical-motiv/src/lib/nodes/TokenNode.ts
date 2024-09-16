import { EditorConfig, LexicalNode, NodeKey, TextNode } from 'lexical';
import { TokenType } from '../parser';
import { decorateTextValidation } from './node-utils';

const variableColor = 'indigo';
const operatorColor = 'chocolate';
const defaultColor = 'black';

const colorLookup = {
  proposition: variableColor,
  and: operatorColor,
  andalso: operatorColor,
  or: operatorColor,
  orelse: operatorColor,
  not: operatorColor,
  xor: operatorColor,
  openParenthesis: defaultColor,
  closeParenthesis: defaultColor,
  whitespace: defaultColor,
  newline: defaultColor,
  eof: defaultColor,
};

export class TokenNode extends TextNode {
  private readonly __color: string;
  private readonly __tokenType: TokenType;
  private __valid: boolean = true;
  private __invalidReason: string | null = null;

  static override getType(): string {
    return 'token';
  }

  static override clone(node: TokenNode): TokenNode {
    return new TokenNode(node.__text, node.__tokenType, node.__key);
  }

  constructor(text: string, tokenType: TokenType, key?: NodeKey) {
    super(text, key);
    this.__tokenType = tokenType;
    this.__color = colorLookup[tokenType];
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    decorateTextValidation(element, this.__valid);
    element.style.color = this.__color;
    if (!this.__valid && this.__invalidReason) {
      element.title = this.__invalidReason;
    }
    return element;
  }

  override updateDOM(
    prevNode: TokenNode,
    dom: HTMLElement,
    config: EditorConfig
  ): boolean {
    let isUpdated = super.updateDOM(prevNode, dom, config);
    if (prevNode.__color !== this.__color) {
      dom.style.color = this.__color;
      isUpdated = true;
    }

    if (prevNode.__valid !== this.__valid) {
      decorateTextValidation(dom, this.__valid);
      isUpdated = true;
    }

    return isUpdated;
  }

  static canMerge(): boolean {
    return false;
  }

  getValid(): boolean {
    return !this.__valid;
  }

  setValid(): void {
    const writable = this.getWritable() as TokenNode;
    writable.__valid = true;
    writable.__invalidReason = null;
  }

  setInvalid(reason: string): void {
    const writable = this.getWritable() as TokenNode;
    writable.__valid = false;
    writable.__invalidReason = reason;
  }

  override canInsertTextAfter(): boolean {
    return false;
  }
  override canInsertTextBefore(): boolean {
    return false;
  }

  getTokenType(): TokenType {
    return this.__tokenType;
  }
}

export function $createTokenNode(
  text: string,
  tokenType: TokenType
): TokenNode {
  return new TokenNode(text, tokenType);
}

export function $isTokenNode(
  node: LexicalNode | null | undefined
): node is TokenNode {
  return node instanceof TokenNode;
}
