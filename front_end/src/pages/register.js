import { useState } from "react";
import { useRouter as rutas } from "next/router";

export default function Register() {
  const router = rutas();
  const [nombre, newNombre] = useState("");
  const [correo, newCorreo] = useState("");
  const [telefono, newTelf] = useState("");
  const [username, newUsers] = useState("");
  const [password, nesPass] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nombre, 
        correo, 
        telefono, 
        username, 
        password, 
        role: "user" // rol fijo por defecto
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Usuario registrado con éxito");
      router.push("/login");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <form onSubmit={handleRegister} className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro de Usuario</h2>

        <input 
          className="input" 
          type="text" 
          placeholder="Nombre completo" 
          value={nombre} 
          onChange={(e) => newNombre(e.target.value)} 
        />
        <input 
          className="input" 
          type="email" 
          placeholder="Correo electrónico" 
          value={correo} 
          onChange={(e) => newCorreo(e.target.value)} 
        />
        <input 
          className="input" 
          type="text" 
          placeholder="Teléfono" 
          value={telefono} 
          onChange={(e) => newTelf(e.target.value)} 
        />
        <input 
          className="input" 
          type="text" 
          placeholder="Usuario" 
          value={username} 
          onChange={(e) => newUsers(e.target.value)} 
        />
        <input 
          className="input" 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => nesPass(e.target.value)} 
        />

        <button type="submit" className="btn-primary w-full mt-4">Registrarse</button>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="btn-accent"
            onClick={() => router.push("/login")}
          >
            Login
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
