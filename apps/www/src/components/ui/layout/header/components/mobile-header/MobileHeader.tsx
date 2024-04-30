"use client";
import { Portal } from "@/components/ui/utils/portal/Portal";
import { BottomSheet } from "react-spring-bottom-sheet";
import { TabMenu } from "../tab-menu/TabMenu";
import { MegaInput } from "@/components/ui/inputs/mega-input/MegaInput";
import { Suspense, useEffect, useState } from "react";
import { MdChevronLeft, MdSearch } from "react-icons/md";
import { MegaMenu } from "@/components/ui/navigation/mega-menu/MegaMenu";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useLockBody } from "@/hooks/useLockBody";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const MobileHeader = () => {
  const [lock, unlock] = useLockBody();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return () => unlock();
  }, [unlock]);

  const pathname = usePathname();
  const isRoot = pathname === "/";
  return (
    <div className="p-4 sticky top-0 z-20 bg-white shadow-sm md:hidden">
      {!isRoot && (
        <Link href={"/"} className="flex items-center gap-2">
          <MdChevronLeft />
          <span className="font-semibold">Locations</span>
        </Link>
      )}
      {isRoot && (
        <div
          onClick={() => {
            setIsOpen(true);
            lock();
          }}
          className="rounded-full py-3 px-2 shadow-lg flex"
        >
          <div className="basis-14 grid place-content-center">
            <MdSearch size={24} />
          </div>
          <div className="inline-block leading-4">
            <div className="text-sm text-gray-900">Search</div>
            <div className="flex gap-2 text-xs items-center text-gray-400">
              <span>Locations</span>
              <span>.</span>
              <span>Sizes</span>
            </div>
          </div>
        </div>
      )}
      {isOpen && isRoot && (
        <Portal isOpen>
          <div className="h-screen w-screen bg-white fixed left-0 top-0 z-20 flex flex-col">
            <div className="animate-[fadeIn_300ms_ease-in-out]">
              <Suspense>
                <TabMenu />
              </Suspense>
            </div>

            <div className="animate-[fadeIn_300ms_ease-in-out_100ms] p-4 flex-1">
              <MegaMenu />
            </div>

            <div
              className="animate-[fadeInUp_300ms_ease-in-out] bg-primary p-4 text-white text-center uppercase"
              onClick={() => {
                unlock();
                setIsOpen(false);
              }}
            >
              Close
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};
