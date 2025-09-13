from flask import Blueprint, request, jsonify
from app.services.user_service import create_user, get_user_by_username
from app.utils.security import generate_token
import bcrypt

auth_bp = Blueprint("auth", __name__)

# --- Registro ---
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # Validar campos obligatorios
    required_fields = ["nombre", "correo", "telefono", "username", "password"]
    for field in required_fields:
        if not data.get(field):
            return jsonify({"msg": f"Falta el campo {field}"}), 400

    # Validar rol
    role = data.get("role", "user")
    if role not in ["admin", "user"]:
        return jsonify({"msg": "Rol inválido"}), 400

    # Crear usuario mediante el servicio
    user, error = create_user(data)
    if error:
        return jsonify({"msg": error}), 400

    return jsonify({"msg": "Usuario creado correctamente"}), 201

# --- Login ---
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"msg": "Faltan campos obligatorios"}), 400

    user = get_user_by_username(username)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    # Verificar contraseña
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    token = generate_token(user_id=str(user["_id"]), role=user.get("role", "user"))

    return jsonify({
        "token": token,
        "username": user["username"],
        "role": user.get("role", "user"),
        "nombre": user.get("nombre")
    }), 200
