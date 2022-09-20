import { FC, useState, createContext, ReactNode, useMemo } from 'react';

type Context = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<Context>({} as Context);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const closeSidebar = () => {
    setSidebarToggle(false);
  };

  const value = useMemo(
    () => ({
      sidebarToggle,
      toggleSidebar: () => setSidebarToggle(!sidebarToggle),
      closeSidebar,
    }),
    [sidebarToggle],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
