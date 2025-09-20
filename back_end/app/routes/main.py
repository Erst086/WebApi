from flask import Blueprint, jsonify
from app.utils.security import token

main_bp = Blueprint("main", __name__)

@main_bp.route("/dashboard")
@token()  
def dashboard(user):
    return jsonify({
        "msg": f"Bienvenido {user['username']}!",
        "role": user["role"]
    }), 200

@main_bp.route("/admin")
@token(role="admin")
def admin_panel(user):
    return jsonify({
        "msg": f"Administrador {user['username']}",
        "role": user["role"]
    }), 200
