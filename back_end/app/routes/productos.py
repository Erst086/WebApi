# app/routes/productos.py
from flask import Blueprint, request, jsonify
from app.services.product_service import crear_producto, obtener_productos, actualizar_precio
from app.utils.security import token_required

productos_bp = Blueprint("productos", __name__)

# Listar productos
@productos_bp.route("/public", methods=["GET"])
def listar_productos_public():
    productos = obtener_productos()  
    return jsonify(productos)

# Listar productos (solo admin)
@productos_bp.route("/", methods=["GET"])
@token_required(role="admin")
def listar_productos_admin(user):
    productos = obtener_productos()
    return jsonify(productos)


# Crear producto (solo admin)
@productos_bp.route("/", methods=["POST"])
@token_required(role="admin")
def crear_producto_route(user):
    data = request.get_json()
    prod = crear_producto(data)
    return jsonify(prod.to_dict()), 201

# Actualizar precio (solo admin)
@productos_bp.route("/<id>", methods=["PUT"])
@token_required(role="admin")
def actualizar_precio_route(user, id):
    data = request.get_json()
    precio = data.get("precio")
    if precio is None:
        return jsonify({"msg": "Precio requerido"}), 400
    actualizar_precio(id, precio)
    return jsonify({"msg": "Precio actualizado"})
