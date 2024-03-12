import { Container, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
const NavBar = () => {
  return (
    <nav className="mb-5 border-b px-5 py-3">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <NavLinks />
        </Flex>
        {/* <AuthStatus /> */}
      </Flex>
    </nav>
  );
};
const NavLinks = () => {
  const currentPath = useRouter();
  console.log("currentPath", currentPath);

  const links = [
    { label: "About", href: "/" },
    { label: "Writing", href: "/writing" },
    { label: "New", href: "/new" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath.pathname,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
