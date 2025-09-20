import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VistaAdmin() {
  const router = useRouter();
  const [isClient, ifCLiente] = useState(false);
  const [message, mensaje] = useState("");
  const [loading, cargar] = useState(true);
  const [productos, newProducto] = useState([]);
  const [preciosEdit, editPrecio] = useState({});

  useEffect(() => {
    ifCLiente(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if (!token || role !== "admin") {
      router.replace("/login");
      return;
    }

    const fetchAdminData = async () => {
      try {
        const res = await fetch("http://localhost:5000/main/admin", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.msg || "Acceso denegado");
          router.replace("/login");
          return;
        }
        mensaje(data.msg);

        const prodRes = await fetch("http://localhost:5000/productos/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const prodData = await prodRes.json();
        newProducto(Array.isArray(prodData) ? prodData : []);

        const initialPrices = {};
        (Array.isArray(prodData) ? prodData : []).forEach((p) => {
          initialPrices[p._id] = p.precio;
        });
        editPrecio(initialPrices);
      } catch (err) {
        console.error(err);
        router.replace("/login");
      } finally {
        cargar(false);
      }
    };

    fetchAdminData();
  }, [isClient, router]);

  const handleGuardarPrecio = async (id) => {
    const token = localStorage.getItem("token");
    const precio = preciosEdit[id];

    try {
      const res = await fetch(`http://localhost:5000/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ precio }),
      });

      if (res.ok) {
        newProducto((prev) =>
          prev.map((p) => (p._id === id ? { ...p, precio } : p))
        );
        alert("Precio actualizado");
      } else {
        const data = await res.json();
        alert(data.msg || "Error al actualizar el precio");
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el precio");
    }
  };

  if (!isClient || loading) {
    return <p className="text-center mt-10">Cargando vista Admin...</p>;
  }

  // Dividir productos en filas de 4
  const filas = [];
  for (let i = 0; i < productos.length; i += 4) {
    filas.push(productos.slice(i, i + 4));
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Panel de Admin</h1>
        <button
          className="btn-accent"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            router.replace("/");
          }}
        >
          Cerrar Sesion
        </button>
        {/*
        <button
          className="btn-accent"
          onClick={() => router.push("/adminUsr")}
        >
          Administrar Usuarios
        </button>*/}
      </div>

      <p className="mb-6">{message}</p>

      <div className="w-full max-w-6xl flex flex-col gap-6">
        {filas.map((fila, idx) => (
          <div key={idx} className="flex gap-6">
            {fila.map((p) => (
              <div
                key={p._id}
                className="flex flex-col justify-between border rounded p-4 bg-white dark:bg-gray-800 flex-1"
              >
                <div>
                  <h3 className="font-semibold mb-1">{p.nombre}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{p.descripcion}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={preciosEdit[p._id]}
                    onChange={(e) =>
                      editPrecio({ ...preciosEdit, [p._id]: parseFloat(e.target.value) })
                    }
                  />
                  <button
                    className="btn-accent"
                    onClick={() => handleGuardarPrecio(p._id)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
