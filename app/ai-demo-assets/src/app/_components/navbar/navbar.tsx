"use client";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, use } from "react";

import { usePathname } from "next/navigation";
import Image from "next/image";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

// properties: authenticated: boolean
type props = {
  authenticated: boolean;
};

export function Navbar( { authenticated }: props) {
  
    const links = [
        { href: '/', label: 'Home', authenticated: false },
        { href: '/search', label: 'AI-Demos', authenticated: false },
        { href: '/admin', label: 'Admin', authenticated: true },
    ]

    const pathname = usePathname();

    return (
      <Disclosure as="nav" className="border-b border-gray-200 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  {/* <Image
                    className="block lg:hidden w-auto"
                    src=""
                    alt="Your Company"
                    width={32} height={32}
                    priority={true}
                  />
                  <Image
                    className="hidden lg:block w-auto"
                    src=""
                    alt="Your Company"
                    width={32} height={32}
                    priority={true}
                  /> */}
                </div>

                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {/* 
                  if authenticated = true, then show admin link
                  show all other links regardless
                  */}
                  {links.map((item) => (
                      authenticated || !item.authenticated ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className={classNames(
                        item.href === pathname
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                      aria-current={item.href === pathname ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                    ) : null
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                
               
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {links.map((item) => (
                <Disclosure.Button
                  key={item.label}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.label}
                </Disclosure.Button>
              ))}
            </div>
            
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

  );
}
