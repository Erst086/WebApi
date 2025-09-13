import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // token guardado después del login
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/main/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          alert(data.msg || "Acceso denegado");
          router.push("/login");
        } else {
          setMessage(data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <h1 className="text-4xl font-bold mb-6">Panel de Administración</h1>
      <p className="mb-4">{message}</p>
      <button
        className="btn-accent"
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
