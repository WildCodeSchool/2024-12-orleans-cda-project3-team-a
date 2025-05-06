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
  isParkId: boolean;
};

const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isParkId, setIsParkId] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
      });
      const data = (await res.json()) as {
        ok: boolean;
        parkId: number | undefined;
      };

      if (data.ok) {
        setIsLoggedIn(true);
      }

      //check if we have a parkId, allow after to display or not the page for create my park
      if (data.parkId != null) {
        setIsParkId(true);
      }

      setIsLoading(false);
    };
    void fetchAuth();
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      isParkId,
    }),
    [isLoggedIn, isLoading, isParkId],
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
