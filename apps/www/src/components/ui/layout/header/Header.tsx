import { DesktopHeader } from "./components/desktop-header/DesktopHeader";
import { MobileHeader } from "./components/mobile-header/MobileHeader";
export const Header = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};
