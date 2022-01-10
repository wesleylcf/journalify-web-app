import { useEffect, useRef } from "react";

// Value is updated in the useEffect which runs only after returning value
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
