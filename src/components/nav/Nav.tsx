import { ReactElement } from 'react';
import Image from 'next/image';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { tw } from 'typewind';

import smallLogo from 'public/assets/logo/Wavez Logo.png';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarBrand>
        <NavbarItem as={Link} href="/">
          <Image
            src={smallLogo}
            alt="Wavez: All the vibes"
            className={tw.w_12}
          />
        </NavbarItem>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex">
        <NavbarItem isActive={pathname === '/discover'}>
          <Link
            href="/discover"
            color={pathname === '/discover' ? 'secondary' : 'foreground'}
          >
            Discover
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem as={Link} href="#">
          <Button
            as={Link}
            color="secondary"
            href="#"
            variant="bordered"
            size="sm"
          >
            Login
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            as={Link}
            color="secondary"
            href="#"
            variant="shadow"
            size="sm"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
