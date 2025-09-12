from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import mongo  # el mongo global de __init__.py

auth_bp = Blueprint("auth", __name__)

# --- Registro ---
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    nombre = data.get("nombre")
    correo = data.get("correo")
    telefono = data.get("telefono")
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "user")

    if not username or not password or not correo or not nombre:
        return jsonify({"msg": "Faltan campos obligatorios"}), 400

    if role not in ["admin", "user"]:
        return jsonify({"msg": "Rol inválido"}), 400

    if mongo.db.users.find_one({"username": username}):
        return jsonify({"msg": "Usuario ya existe"}), 400
    if mongo.db.users.find_one({"correo": correo}):
        return jsonify({"msg": "Correo ya registrado"}), 400

    hashed_password = generate_password_hash(password)
    mongo.db.users.insert_one({
        "nombre": nombre,
        "correo": correo,
        "telefono": telefono,
        "username": username,
        "password": hashed_password,
        "role": role
    })
    return jsonify({"msg": "Usuario creado correctamente"}), 201

# --- Login ---
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"msg": "Faltan campos obligatorios"}), 400

    user = mongo.db.users.find_one({"username": username})
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if not check_password_hash(user["password"], password):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    return jsonify({
        "username": user["username"],
        "role": user.get("role", "user"),
        "nombre": user.get("nombre")
    }), 200
