import { ReactElement } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
import copy from 'definitions/copy/nav';

const Nav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const renderUnauthenticatedCta = () => (
    <>
      <NavbarItem>
        <Button
          as={Link}
          color="secondary"
          href="/api/auth/login"
          variant="shadow"
          size="sm"
        >
          {copy.login}
        </Button>
      </NavbarItem>
    </>
  );

  const renderAuthenticatedCta = () => (
    <>
      <NavbarItem>
        <Button
          as={Link}
          color="secondary"
          href="/api/auth/logout"
          variant="bordered"
          size="sm"
        >
          {copy.logOut}
        </Button>
      </NavbarItem>
    </>
  );

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
            {copy.navLinks.discover}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? renderAuthenticatedCta() : renderUnauthenticatedCta()}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
