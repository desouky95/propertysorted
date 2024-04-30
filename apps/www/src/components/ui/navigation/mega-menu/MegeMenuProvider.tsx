import { PropsWithChildren, createContext, useContext } from "react";

type MegaMenuContextArgs = {
  active: string | null;
  setActive: (name: string | null) => void;
  hasActive?: boolean;
};

const MegaMenuContext = createContext<MegaMenuContextArgs | null>(null);

type MegaMenuProviderArgs = Omit<MegaMenuContextArgs, "hasActive">;
export const MegaMenuProvider = ({
  active,
  setActive,
  children,
}: PropsWithChildren<MegaMenuProviderArgs>) => {
  const hasActive = active !== null && active !== "";
  return (
    <MegaMenuContext.Provider value={{ active, setActive, hasActive }}>
      {children}
    </MegaMenuContext.Provider>
  );
};

export const useMegaMenu = () => {
  const ctx = useContext(MegaMenuContext);
  if (!ctx) throw new Error("MegaMenuProvider not found");
  return ctx;
};

MegaMenuContext.displayName = "Mega Menu Context";
