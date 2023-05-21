'use client'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@/components/chain/ConnectButton'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Fetch Nfts', href: '/fetch-nfts' },
    { name: 'Profile', href: '/profile' }
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const pathname = usePathname()
    return (
        <header className="bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">LightLink</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                pathname === item.href
                                    ? 'border-slate-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                            )}
                            aria-current={pathname === item.href ? 'page' : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a> */}
                    <span className="text-sm font-semibold leading-6 text-gray-900">
                        <ConnectButton />
                    </span>

                </div>
            </nav>
        </header>
    )
}