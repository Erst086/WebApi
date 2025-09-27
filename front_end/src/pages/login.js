import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, newUsuario] = useState("");
  const [password, passNew] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", data.role);

        router.push(data.role === "admin" ? "/admin" : "/");
      } else {
        alert(data.msg || "Error inicio de sesion");
      }
    } catch (err) {
      console.error(err);
      alert("Error inicio de sesion");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <form onSubmit={handleLogin} className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesion</h2>

        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => newUsuario(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => passNew(e.target.value)}
        />

        <button type="submit" className="btn-primary w-full mt-4">
          Entrar
        </button>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="btn-accent"
            onClick={() => router.push("/register")}
          >
            Registrarse
          </button>

          <button
            type="button"
            className="btn-accent"
            onClick={() => router.push("/")}
          >
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
}
