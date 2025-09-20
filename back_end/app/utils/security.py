import jwt
from datetime import datetime, timedelta
from flask import current_app, request, jsonify
from functools import wraps
from app.services.user_service import get_user_by_id


def new_token(user_id, role, exp_hours=1):
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=exp_hours)
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token

def token_dcf(token):
    try:
        return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None 


def token(role=None):
    def enmascara(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            if "Authorization" in request.headers:
                auth_header = request.headers["Authorization"]
                if auth_header.startswith("Bearer "):
                    token = auth_header.split(" ")[1]

            if not token:
                return jsonify({"msg": "Te faltu tu token"}), 401
            data = token_dcf(token)
            if not data:
                return jsonify({"msg": "Te falta o expiro token"}), 401
            if role and data.get("role") != role:
                return jsonify({"msg": "Pa atras no tiens permiso"}), 403
            user = get_user_by_id(data.get("user_id"))
            if not user:
                return jsonify({"msg": "Usuarion sin encontrar"}), 404

            return f(user=user, *args, **kwargs)
        return decorated
    return enmascara
