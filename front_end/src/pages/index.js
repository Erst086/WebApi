import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <h1 className="text-5xl font-bold mb-4">Tienda Electrónica</h1>
      <p className="mb-8 text-lg">Compra los mejores componentes electrónicos</p>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="card w-64">
          <h2 className="text-xl font-semibold mb-2">Resistor 10kΩ</h2>
          <p className="mb-4">Paquete de 50 piezas</p>
          <p className="mb-4 font-bold" style={{ color: "var(--accent)" }}>$50 MXN</p>
          <button className="btn-primary w-full">Agregar al carrito</button>
        </div>

        <div className="card w-64">
          <h2 className="text-xl font-semibold mb-2">LED Rojo 5mm</h2>
          <p className="mb-4">Paquete de 20 piezas</p>
          <p className="mb-4 font-bold" style={{ color: "var(--accent)" }}>$30 MXN</p>
          <button className="btn-primary w-full">Agregar al carrito</button>
        </div>

        <div className="card w-64">
          <h2 className="text-xl font-semibold mb-2">Capacitor 100μF</h2>
          <p className="mb-4">Paquete de 10 piezas</p>
          <p className="mb-4 font-bold" style={{ color: "var(--accent)" }}>$45 MXN</p>
          <button className="btn-primary w-full">Agregar al carrito</button>
        </div>
      </div>

      <div className="mt-12 flex space-x-4">
        <Link href="/login"><button className="btn-primary">Login</button></Link>
        <Link href="/register"><button className="btn-accent">Registro</button></Link>
      </div>
    </div>
  );
}
