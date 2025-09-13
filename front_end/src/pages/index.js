import Header from "../html/Header";
import ProductCard from "../html/ProductCard";
import Footer from "../html/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
    setUsername(localStorage.getItem("username") || "");

    const storedCart = localStorage.getItem("carrito");
    setCarrito(storedCart ? JSON.parse(storedCart) : []);

    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:5000/productos/public");
        const data = await res.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProductos([]);
      }
    };

    fetchProductos();
  }, []);

  const handleAgregarCarrito = (producto) => {
    if (!isLogged) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-6"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Header
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        username={username}
        setUsername={setUsername}
        carrito={carrito}
        setCarrito={setCarrito}
      />

      <div className="flex flex-wrap justify-center gap-6 mt-6 flex-1 w-full">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map((p) => (
            <ProductCard
              key={p._id}
              producto={p}
              isLogged={isLogged}
              onAdd={handleAgregarCarrito}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}
