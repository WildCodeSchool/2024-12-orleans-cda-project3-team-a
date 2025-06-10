import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { User } from '@app/api';

type AuthProviderProps = PropsWithChildren<object>;
type AuthProviderState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoading: boolean;
  hasParkId: boolean;
  setHasParkId: (value: boolean) => void;
  user?: User;
  refetchUser: () => Promise<void>;
};

const authProviderContext = createContext<AuthProviderState>({
  isLoggedIn: false,
  isLoading: true,
  hasParkId: false,
  setIsLoggedIn: () => {
    //
  },
  setHasParkId: () => {
    //
  },
  refetchUser: () => Promise.resolve(),
});

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasParkId, setHasParkId] = useState(false);

  //fetch to know if we are logged in
  const fetchAuth = useCallback(async () => {
    const res = await fetch(`/api/auth/me`);
    const data = (await res.json()) as {
      ok: boolean;
      user: User;
    };

    if (data.ok) {
      setIsLoggedIn(true);
      setUser(data.user);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    //fetch to know if we have already a park id or not yet
    const fetchParkId = async () => {
      const res = await fetch(`/api/game/park`);

      const data = (await res.json()) as {
        parkId: number | undefined;
        ok: boolean;
      };

      if (!data.ok) {
        throw new Error('No park');
      }

      if (data.parkId !== undefined) {
        setHasParkId(true);
      }
    };
    void fetchAuth();
    void fetchParkId();
  }, [fetchAuth]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      hasParkId,
      setHasParkId,
      user,
      refetchUser: fetchAuth,
    }),
    [isLoggedIn, isLoading, hasParkId, user, fetchAuth],
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
