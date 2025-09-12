import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert(`Bienvenido ${data.username} (${data.role})`);
      router.push("/dashboard");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <form onSubmit={handleLogin} className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <input className="input" type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="btn-primary w-full mt-4">Entrar</button>

        <p className="mt-4 text-center">
          ¿No tienes cuenta? <span className="btn-accent cursor-pointer" onClick={() => router.push("/register")}>Regístrate</span>
        </p>
      </form>
    </div>
  );
}
