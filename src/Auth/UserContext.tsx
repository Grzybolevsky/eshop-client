import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { apiCall } from "../axiosConfig";

export const UserContext = createContext(false);

interface LoggedProviderProps {
  children: ReactNode | ReactNode[];
}

export default function LoggedProvider(props: LoggedProviderProps) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    apiCall("/user/logged").then((response) => {
      setLogged(response.data);
    });
  }, []);

  return <UserContext.Provider value={logged}>{props.children}</UserContext.Provider>;
}

export function useLogged() {
  return useContext(UserContext);
}
