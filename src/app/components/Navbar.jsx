import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="flex flex-col h-screen w-64 bg-gray-800 text-white fixed">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Gestión App</h1>
            </div>
            <nav className="flex flex-col mt-4 space-y-2">
                <Link href="/" className="hover:bg-gray-700 px-4 py-2 rounded">Inicio</Link>
                <Link href="/clients" className="hover:bg-gray-700 px-4 py-2 rounded">Clientes</Link>
                <Link href="/projects" className="hover:bg-gray-700 px-4 py-2 rounded">Proyectos</Link>
                <Link href="/deliverynotes" className="hover:bg-gray-700 px-4 py-2 rounded">Albaranes</Link>
                <Link href="/settings" className="hover:bg-gray-700 px-4 py-2 rounded">Ajustes</Link>
                <Link href="/components/login" className="hover:bg-gray-700 px-4 py-2 rounded">LogIn</Link>
            </nav>
        </div>
    );
}
