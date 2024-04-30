"use client";
import { Suspense, useEffect, useState } from "react";
import { MegaInput } from "../../inputs/mega-input/MegaInput";
import { MegaMenuProvider } from "./MegeMenuProvider";
import clsx from "clsx";
import styles from "./MegaMenu.module.css";
import { useClickAway, useDebounce, usePrevious } from "@uidotdev/usehooks";
import { useSearchLocations } from "@/services/actions/locations";
import { usePreviousSearch } from "@/hooks/usePreviousSearch";
import { SearchLocations } from "../../layout/header/components/search-locations/SearchLocations";
import { SelectSizes } from "../../layout/header/components/select-sizes/SelectSizes";
import { ClientOnly } from "@/components/utils/client-only/ClientOnly";
export const MegaMenu = () => {
  const [active, setActive] = useState<string | null>(null);

  const className = clsx(styles.megaMenu, {
    [styles.hasActive]: active !== null,
  });

  const ref = useClickAway(() => {
    setActive(null);
  });

  return (
    <>
      <div ref={ref as any} className={className}>
        <div className="flex-col sm:flex-row p-3 sm:p-0 gap-4 flex w-full">
          <MegaMenuProvider active={active} setActive={setActive}>
            <ClientOnly>
              <SearchLocations />
            </ClientOnly>
            <ClientOnly>
              <SelectSizes />
            </ClientOnly>
          </MegaMenuProvider>
        </div>
      </div>
    </>
  );
};
