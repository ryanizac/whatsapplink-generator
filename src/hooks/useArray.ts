import { useState } from "react";

export default function useArray<T>(initial: Array<T>) {
  const [state, setState] = useState<T[]>(initial);

  function toggle(value: T) {
    const newValue = [...state];
    const index = newValue.indexOf(value);
    if (index > -1) newValue.slice(index, 1);
    else newValue.push(value);
    setState(newValue);
  }

  function addOnly(value: T) {
    if (!state.includes(value)) {
      setState((prev) => [...prev, value]);
    }
  }

  function clear() {
    setState(initial);
  }

  return { state, toggle, clear, addOnly };
}
