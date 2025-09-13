import jwt
from datetime import datetime, timedelta
from flask import current_app, request, jsonify
from functools import wraps
from app.services.user_service import get_user_by_id

# --- Generar JWT ---
def generate_token(user_id, role, exp_hours=1):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=exp_hours)
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token

# --- Decodificar JWT ---
def decode_token(token):
    try:
        return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None  # Token expirado
    except jwt.InvalidTokenError:
        return None  # Token inválido

# --- Decorador para rutas protegidas ---
def token_required(role=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if "Authorization" in request.headers:
                auth_header = request.headers["Authorization"]
                if auth_header.startswith("Bearer "):
                    token = auth_header.split(" ")[1]

            if not token:
                return jsonify({"msg": "Token faltante"}), 401

            data = decode_token(token)
            if not data:
                return jsonify({"msg": "Token inválido o expirado"}), 401

            # Validar rol
            if role and data.get("role") != role:
                return jsonify({"msg": "Acceso denegado"}), 403

            # Traer usuario completo desde la DB
            user = get_user_by_id(data.get("user_id"))
            if not user:
                return jsonify({"msg": "Usuario no encontrado"}), 404

            return f(user=user, *args, **kwargs)
        return decorated
    return decorator
