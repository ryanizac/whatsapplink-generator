import { useState } from "react";

export default function useObject<T extends object>(initial: T) {
  const [state, setState] = useState<T>(initial);

  function update(value: Partial<T>) {
    const newValue = { ...state, ...value };
    setState(newValue);
  }

  function clear() {
    setState(initial);
  }

  return { state, update, clear };
}
