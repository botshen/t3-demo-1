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
  const router = useRouter();

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
              "text-gray-600 hover:text-gray-800":
                router.pathname !== link.href,
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
