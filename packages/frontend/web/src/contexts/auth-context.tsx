import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthProviderProps = PropsWithChildren<object>;
type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoading: boolean;
  hasParkId: boolean;
  setHasParkId: (value: boolean) => void;
};

const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasParkId, setHasParkId] = useState(false);

  useEffect(() => {
    //fetch to know if we are logged in
    const fetchAuth = async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
      });
      const data = (await res.json()) as {
        ok: boolean;
      };

      if (data.ok) {
        setIsLoggedIn(true);
      }

      setIsLoading(false);
    };
    void fetchAuth();

    //fetch to know if we have already a park id or not yet
    const fetchParkId = async () => {
      const res = await fetch(`${API_URL}/game/park`, {
        credentials: 'include',
      });
      const data = (await res.json()) as {
        parkId: number | undefined;
      };

      if (!Boolean(data)) {
        throw new Error('No park');
      }

      if (data.parkId !== undefined) {
        setHasParkId(true);
      }
    };
    void fetchParkId();
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      hasParkId,
      setHasParkId,
    }),
    [isLoggedIn, isLoading, hasParkId],
  );

  return (
    <authProviderContext.Provider {...props} value={value}>
      {children}
    </authProviderContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authProviderContext);
  return context;
}
