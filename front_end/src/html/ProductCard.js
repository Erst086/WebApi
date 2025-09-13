import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductCard({ producto, isLogged, onAdd }) {
  const router = useRouter();

  return (
    <div className="cards-container grid grid-cols-auto-fit gap-6 justify-center">
      <div className="card w-64 min-h-[400px] p-4 border rounded shadow flex flex-col items-center justify-between">
        {/* Imagen */}
        <div className="card-image w-full h-32 mb-4 flex items-center justify-center bg-gray-200 rounded overflow-hidden">
          <Image
            src={producto.img || "/images/componente.png"}
            alt={producto.nombre}
            width={128}
            height={128}
            className="object-contain"
          />
        </div>

        {/* Texto */}
        <div className="flex flex-col items-center text-center flex-1">
          <h2 className="text-xl font-semibold mb-2">{producto.nombre}</h2>
          <p className="mb-4">{producto.descripcion}</p>
        </div>

        {/* Precio y botón */}
        <div className="w-full mt-2">
          <p className="mb-4 font-bold" style={{ color: "var(--accent)" }}>
            ${producto.precio} MXN
          </p>
          <button
            className="btn-primary w-full"
            onClick={() => {
              if (isLogged) {
                onAdd(producto);
              } else {
                router.push("/login"); // redirige al login
              }
            }}
          >
            {isLogged ? "Agregar al carrito" : "Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}
