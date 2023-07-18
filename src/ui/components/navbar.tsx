"use client";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@/ui/components/chain/ConnectButton";
import Link from "next/link";
import { size } from "lodash";
import Image from "next/image";
import { useAccount } from "wagmi";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Browse collections", href: "/collections" },
  // { name: "Fetch Nfts", href: "/fetch-nfts" },
  { name: "Profile", href: "/profile/", auth: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const pathComponent = pathname!.split("/");
  const lighterHeader =
    (size(pathComponent) === 3 && pathComponent[1] === "collections") ||
      pathname === "/profile"
      ? true
      : false;
  return (
    <header className={`${lighterHeader ? "bg-[#141414]" : ""} shadow-sm`}>
      <nav
        className="mx-auto flex max-w-7xl"
        aria-label="Global"
      >
        <div className="z-10 w-full flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              {/* <span className="sr-only">LightLink</span> */}
              <img className="h-6 w-auto" src="/images/logo.png" alt="" />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => {
              if (item?.auth && !isConnected) return <></>
              return (
                <Link
                  key={item.name}
                  href={!item.auth ? item.href : item.href + address}
                  className={classNames(
                    pathname === item.href
                      ? "text-white"
                      : "border-transparent text-grey-80 hover:text-white hover:border-gray-300",
                    "inline-flex items-center px-1 pt-1 text-base font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a> */}
            <span className="text-sm font-semibold leading-6 text-gray-900">
              <ConnectButton />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
