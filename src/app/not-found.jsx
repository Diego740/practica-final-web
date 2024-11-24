import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl ">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="text-lg text-gray-700 mt-4">¡Ups! La página que buscas no existe.</p>
                <p className="text-sm text-gray-500">Es posible que la URL esté mal escrita o que la página haya sido movida.</p>
                <Link href="/">
                    <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Volver al Inicio
                    </button>
                </Link>
            </div>
        </div>
    );
}
