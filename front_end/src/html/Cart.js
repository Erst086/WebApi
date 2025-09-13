export default function Cart({ carrito }) {
  if (!carrito || carrito.length === 0) return null;

  return (
    <aside className="fixed top-24 right-4 w-64 bg-white shadow-lg rounded p-4 max-h-[70vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Tu Carrito</h2>
      {carrito.map((item, idx) => (
        <div key={idx} className="flex justify-between mb-2 border-b pb-1">
          <span>{item.nombre}</span>
          <span className="font-bold">${item.precio} MXN</span>
        </div>
      ))}
      <div className="mt-2 border-t pt-2 font-bold">
        Total: ${carrito.reduce((acc, item) => acc + item.precio, 0)}
      </div>
    </aside>
  );
}
