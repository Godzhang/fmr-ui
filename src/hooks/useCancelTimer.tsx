import { useEffect, useRef, useCallback } from "react";

const useCancelTimer = () => {
  const requests = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      // 组件卸载时清除
      requests.current.forEach(clearTimeout);
    };
  });

  return useCallback((timer) => {
    requests.current.push(timer);
  }, []);
};

export default useCancelTimer;
