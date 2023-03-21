import axios from "axios";
import {
  createContext,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useState,
} from "react";

export const AxiosContext = createContext(null);

export const AxiosInstanceProvider = ({
  config = {},
  requestInterceptors = [],
  responseInterceptors = [],
  children,
}) => {
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    // enlist interceptors for requests
    requestInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.request.use(interceptor);
    });
    // enlist interceptors for response
    responseInterceptors.forEach((interceptor) => {
      instanceRef.current.interceptors.response.use(interceptor);
    });
    // one-time only
  });

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
};

export function useAxiosAtLoad({ url, method, payload }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  useEffect(() => {
    (async () => {
      try {
        console.log("useAxiosAtLoad loading");
        setLoading(true);
        const response = await instance.request({
          signal: controllerRef.current.signal,
          data: payload,
          method,
          url,
        });
        setData(response.data);
      } catch (err) {
        setError(error.message);
      } finally {
        setLoaded(true);
        setLoading(false);
      }
    })();
    // one-time only
  });

  return { cancel, data, error, loaded, loading };
}

export function useAxiosAtEvent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fire = async ({ url, method, payload }) => {
    try {
      console.log("useAxiosAtFire loading");
      console.log(method, payload);
      setLoading(true);
      const response = await instance.request({
        signal: controllerRef.current.signal,
        data: payload,
        method,
        url,
      });
      setData(response.data);
      console.log("setData", response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoaded(true);
      console.log("setLoaded");
    }
  };

  return { cancel, data, error, loaded, loading, fire };
}

export function useAxios() {
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  return instance;
}
