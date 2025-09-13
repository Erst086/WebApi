import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
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
        alert(data.msg || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <form onSubmit={handleLogin} className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
