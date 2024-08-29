export function decorateTextAsInvalid(element: HTMLElement) {
  element.style.textDecoration = 'underline';
  element.style.textDecorationColor = 'red';
  element.style.textDecorationStyle = 'wavy';
}

export function decorateTextAsValid(element: HTMLElement) {
  element.style.textDecoration = '';
  element.style.textDecorationColor = '';
  element.style.textDecorationStyle = '';
}

export function decorateTextValidation(element: HTMLElement, valid: boolean) {
  if (valid) {
    decorateTextAsValid(element);
  } else {
    decorateTextAsInvalid(element);
  }
}
