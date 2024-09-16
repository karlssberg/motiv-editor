const signalType = Symbol('signal');
export interface Signal<T> {
  type: Symbol;
  value: T;
  subscribe(callback: (value: T) => void): () => void;
  unsubscribeAll(): void;
}
export function signal<T>(value: T): Signal<T> {
  let currentValue = value;
  const callbacks: Array<(value: T) => void> = [];
  return {
    type: signalType,
    get value() {
      return currentValue;
    },
    set value(value: T) {
      const oldValue = currentValue;
      currentValue = value;

      if (oldValue !== value) {
        callbacks.forEach((callback) => callback(value));
      }
    },
    subscribe(callback: (value: T) => void): () => void {
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      };
    },
    unsubscribeAll() {
      callbacks.length = 0;
    },
  };
}
