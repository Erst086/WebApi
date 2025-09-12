import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, telefono, username, password, role }),
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
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <form onSubmit={handleRegister} className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro de Usuario</h2>

        <input className="input" type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input className="input" type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <input className="input" type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input className="input" type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />

        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit" className="btn-primary w-full mt-4">Registrarse</button>
      </form>
    </div>
  );
}
