import { useEffect, useRef, EffectCallback, DependencyList } from "react";

const useDidUpdate = (callback: EffectCallback, inputs?: DependencyList) => {
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    callback();
  }, inputs);
};

export default useDidUpdate;
