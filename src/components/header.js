import Link from 'next/link';

export default function Header() {
    return (
        <header className="py-6">
            <nav className="bg-slate-600 p-4 strick top-0 flex space-x-4">
                <Link href="/" className="text-white/90 no-underline hover:text-white">Home</Link>
                <Link href="/collections" className="text-white/90 no-underline hover:text-white">Collections</Link>
            </nav>
        </header>
    )
}