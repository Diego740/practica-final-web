import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 rounded-xl ">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-600">PROYECTO FINAL WEB</h1>
                <p className="text-lg text-gray-700 mt-4">
                    Programación Web I: Cliente
                </p>
                <p className="text-sm text-gray-500">
                    Diego Aranda Gómez
                </p>
                <p className="text-sm text-gray-500">
                    INSO3A 2024-25
                </p>
                <Link href="/components/login">
                    <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Iniciar Sesión
                    </button>
                </Link>
            </div>
        </div>
    );
}
