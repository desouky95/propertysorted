"use client";
import clsx from "clsx";
import styles from "../../Header.module.css";
import Logo from "@/assets/logo";
import { TabMenu } from "../tab-menu/TabMenu";
import { MegaMenu } from "@/components/ui/navigation/mega-menu/MegaMenu";
import { Button } from "@/components/ui/inputs/button/Button";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
export const DesktopHeader = () => {
  const headerClassName = clsx(["h-20 relative"], styles.header);

  const pathname = usePathname();
  const showFilters = pathname === "/";

  const filtersClassName = clsx(styles.filtersBar, {
    [styles.inActive]: !showFilters,
  });
  const wrapperClassName = clsx(styles.headerWrapper, {
    [styles.inActive]: !showFilters,
  });
  return (
    <div className={wrapperClassName}>
      <header className={headerClassName}>
        <div className="flex justify-between px-10 h-full items-center">
          <div className="flex-1 basis-36">
            <Link
              href="/"
              className="h-20 z-20 relative inline-flex items-center"
              aria-label="Property sorted"
            >
              <Logo />
            </Link>
          </div>
          <div className="flex-1">
            <div className={filtersClassName}>
              <div>
                <Suspense fallback={null}>
                  <TabMenu />
                </Suspense>
              </div>
              <MegaMenu />
            </div>
          </div>
          <div className="flex-1">
            <nav className="flex items-center h-20 justify-end">
              <Button>Sign in</Button>
              <Button isIcon prefixIcon={<TbWorld size={24} />} aria-label="Language" />
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};
