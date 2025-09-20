import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminUsr() {
  const router = useRouter();
  const [isClient, ifclient] = useState(false);
  const [message, mensaje] = useState("");
  const [loading, cargar] = useState(true);
  const [usuarios, newUser] = useState([]);
  const [rolesEdit, editRol] = useState({});

  useEffect(() => ifclient(true), []);

  useEffect(() => {
    if (!isClient) return;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.replace("/login");
      return;
    }

    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:5000/users", {
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

        mensaje("Usuarios cargados correctamente");
        newUser(Array.isArray(data) ? data : []);

        const initialRoles = {};
        (Array.isArray(data) ? data : []).forEach((u) => {
          initialRoles[u._id] = u.role;
        });
        editRol(initialRoles);
      } catch (err) {
        console.error(err);
        router.replace("/login");
      } finally {
        cargar(false);
      }
    };

    fetchUsuarios();
  }, [isClient, router]);

  const handleGuardarRol = async (id) => {
    const token = localStorage.getItem("token");
    const role = rolesEdit[id];

    try {
      const res = await fetch(`http://localhost:5000/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        newUser((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role } : u))
        );
        alert("Se actualizó el rol");
      } else {
        const data = await res.json();
        alert(data.msg || "Error al actualizar el rol");
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el rol");
    }
  };

  const handleEliminarUsuario = async (id) => {
    const token = localStorage.getItem("token");

    if (!confirm("¿Deseas eliminar el usuario?")) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        newUser((prev) => prev.filter((u) => u._id !== id));
        alert("Usuario eliminado");
      } else {
        const data = await res.json();
        alert(data.msg || "Error al eliminar");
      }
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };

  if (!isClient || loading) {
    return <p className="text-center mt-10">Cargando usuarios...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Administrar Usuarios</h1>
        <button
          className="btn-accent"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            router.replace("/");
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <p className="mb-6">{message}</p>

      <div className="w-full max-w-6xl flex flex-col gap-4">
        {usuarios.map((u) => (
          <div
            key={u._id}
            className="flex justify-between items-center border rounded p-4 bg-white dark:bg-gray-800"
          >
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {u.nombre} | {u.correo}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                className="border rounded px-2 py-1"
                value={rolesEdit[u._id]}
                onChange={(e) =>
                  editRol({ ...rolesEdit, [u._id]: e.target.value })
                }
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <button
                className="btn-accent"
                onClick={() => handleGuardarRol(u._id)}
              >
                Guardar
              </button>
              <button
                className="btn-error"
                onClick={() => handleEliminarUsuario(u._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
