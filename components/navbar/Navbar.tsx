'use client';

import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

export default function Navbar() {
  return (
    <header id="bwp-header" className="bwp-header header-v2 fixed top-0 left-0 right-0 bg-transparent z-50">
      <MobileNavbar />
      <DesktopNavbar />
    </header>
  );
}
