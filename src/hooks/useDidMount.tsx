import { useEffect, EffectCallback } from "react";

const useDidMount = (callback: EffectCallback) => {
  useEffect(callback, []);
};

export default useDidMount;
