import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

type OpenWindowInMenuContextState = {
  isOpenDashboard: boolean;
  setIsOpenDashboard: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

type OpenWindowInMenuContextProviderProps = PropsWithChildren;

export const openWindowInMenuContext =
  createContext<OpenWindowInMenuContextState>({
    isOpenDashboard: false,
    setIsOpenDashboard: () => {
      throw new Error('setIsOpenDashboard must be used within a provider');
    },
    isMenuOpen: false,
    setIsMenuOpen: () => {
      throw new Error('setIsMenuOpen must be used within a provider');
    },
  });
export function OpenWindowInMenuContextProvider({
  children,
}: OpenWindowInMenuContextProviderProps) {
  const [isOpenDashboard, setIsOpenDashboard] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isOpenDashboard,
      setIsOpenDashboard,
      isMenuOpen,
      setIsMenuOpen,
    }),
    [isOpenDashboard, isMenuOpen],
  );

  return (
    <openWindowInMenuContext.Provider value={value}>
      {children}
    </openWindowInMenuContext.Provider>
  );
}

export const useOpenWindowInMenuContext = () =>
  useContext(openWindowInMenuContext);
