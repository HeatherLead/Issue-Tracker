"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Navbar = () => {
  return (
    <nav className=" px-5 border-b mb-5 py-4 ">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug className=" w-6 h-6" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link className="nav-links" href="/api/auth/signin">
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className=" cursor-pointer"
            radius="full"
            src={session!.user!.image!}
            fallback="?"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues/list" },
  ];
  return (
    <ul className=" flex space-x-6">
      {links.map((link) => (
        <li key={link.herf}>
          <Link
            className={classNames({
              "nav-links": true,
              "!text-white": link.herf === currentPath,
            })}
            href={link.herf}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
