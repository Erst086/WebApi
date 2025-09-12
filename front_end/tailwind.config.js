import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Mi App</h1>
      <p className="mb-6 text-lg">App con login, registro y roles</p>
      <div className="space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
        <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Registro</Link>
      </div>
    </div>
  );
}
