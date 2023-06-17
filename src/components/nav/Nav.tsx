import { ReactElement } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { HiOutlineLightBulb } from 'react-icons/hi';
import { HiChevronDown, HiMagnifyingGlass } from 'react-icons/hi2';

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { tw } from 'typewind';

import smallLogo from 'public/assets/logo/Wavez Logo.png';
import copy from 'definitions/copy/nav';

const Nav = (): ReactElement => {
  const router = useRouter();
  const { user } = useUser();

  const renderUnauthenticatedCta = (): ReactElement => (
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

      <NavbarItem>
        <Avatar
          isBordered
          color="secondary"
          size="sm"
          src={user?.picture || ''}
        />
      </NavbarItem>
    </>
  );

  const renderAuthNavLinks = (): ReactElement => (
    <NavbarContent>
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button endIcon={icons.chevron} radius="full" variant="light">
              {copy.navLinks.devices.label}
            </Button>
          </DropdownTrigger>
        </NavbarItem>

        <DropdownMenu
          aria-label={copy.navLinks.devices.aria}
          className="w-[340px]"
          itemStyles={{
            base: 'gap-4',
            wrapper: 'py-3',
          }}
        >
          <DropdownItem
            key={copy.navLinks.discover.label}
            description={copy.navLinks.discover.description}
            startContent={icons.discover}
            onPress={() => router.push('/discover')}
          >
            {copy.navLinks.discover.label}
          </DropdownItem>

          <DropdownItem
            key={copy.navLinks.lights.label}
            description={copy.navLinks.lights.description}
            startContent={icons.lights}
            onPress={() => router.push('/lights')}
          >
            {copy.navLinks.lights.label}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );

  const icons = {
    chevron: <HiChevronDown fill="white" size={20} />,
    discover: <HiMagnifyingGlass fill="#9353D3" size={20} />,
    lights: <HiOutlineLightBulb fill="#f56c70" size={20} />,
  };

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

      {user && renderAuthNavLinks()}

      <NavbarContent justify="end">
        {user ? renderAuthenticatedCta() : renderUnauthenticatedCta()}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;