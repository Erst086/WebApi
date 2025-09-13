import { useState } from "react";
import { useRouter } from "next/router";

export default function Header({ isLogged, setIsLogged, username, setUsername, carrito, setCarrito }) {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLogged(false);
    setUsername("");
    setCarrito([]);
    localStorage.removeItem("carrito");
    router.push("/");
  };

  const handleClearCart = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <header className="header">
      <div className="header-left">
        {isLogged ? `Bienvenido, ${username}` : "Tienda De Electrónica Fes Aragón"}
      </div>

      <div className="header-right flex items-center gap-3">
        {!isLogged ? (
          <>
            <button className="btn-header btn-header-primary" onClick={() => router.push("/login")}>
              Login
            </button>
            <button className="btn-header btn-header-accent" onClick={() => router.push("/register")}>
              Registro
            </button>
          </>
        ) : (
          <>
            <div className="cart-container relative">
              <button
                className="btn-header btn-header-accent"
                style={{ width: "140px" }}
                onClick={() => setShowCart(!showCart)}
              >
                Carrito 🛒
                {carrito.length > 0 && <span className="cart-count">{carrito.length}</span>}
              </button>
              <div className={`cart-dropdown ${showCart ? "show" : ""}`}>
                {carrito.length === 0 ? (
                  <p>El carrito está vacío</p>
                ) : (
                  <>
                    {carrito.map((item, idx) => (
                      <div key={idx} className="cart-item">
                        <span>{item.nombre}</span>
                        <span>${item.precio}</span>
                      </div>
                    ))}
                    <button className="btn-accent w-full mt-2" onClick={handleClearCart}>
                      Limpiar carrito
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              className="btn-header btn-header-accent"
              style={{ width: "140px" }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
}
