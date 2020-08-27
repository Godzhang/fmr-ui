import { useState, useRef, useEffect } from "react";
import axios from "axios";

// this hook should done with axios
// no test

const getRandomId = () => {
  return Math.random().toString();
};

interface requestsProps {
  [key: string]: any;
}

const useRequest = () => {
  const requests = useRef<requestsProps>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      for (let key in requests.current) {
        requests.current.hasOwnProperty(key) && requests.current[key]("cancel");
      }
    };
  }, []);

  return [
    async (config: object, showLoading: boolean = true) => {
      if (showLoading) {
        !loading && setLoading(true);
      }
      const _id = getRandomId();
      const promise = axios(
        Object.assign({}, config, {
          cancelToken: new axios.CancelToken((cancel) => {
            Object.assign(requests.current, {
              [_id]: cancel,
            });
          }),
        })
      );

      try {
        await promise;
      } catch (err) {
        console.error(err);
      }

      delete requests.current[_id];
      if (Object.keys(requests.current).length === 0) {
        // 全部请求结束时，设loading为false
        setLoading(false);
      }

      return promise;
    },
    loading,
  ];
};

export default useRequest;
